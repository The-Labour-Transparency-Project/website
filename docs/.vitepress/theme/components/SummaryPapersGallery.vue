<script lang="ts" setup>
import { computed, nextTick, onBeforeUnmount, onMounted, ref } from 'vue'
import { useData } from 'vitepress'

type Article = {
  number: string
  title: string
  summary: string
  image: string
  article: string
  alt: string
}

const { frontmatter } = useData()
const articles = (frontmatter.value.articles ?? []) as Article[]

const selected = ref<number | null>(null)
const selectedArticle = computed(() => selected.value === null ? null : articles[selected.value] ?? null)

function open(index: number) {
  selected.value = index
  document.documentElement.classList.add('summary-papers-gallery-open')
  nextTick(() => document.querySelector<HTMLButtonElement>('.summary-papers-gallery__close')?.focus())
}

function close() {
  selected.value = null
  document.documentElement.classList.remove('summary-papers-gallery-open')
}

function move(amount: number) {
  if (selected.value === null) return
  selected.value = (selected.value + amount + articles.length) % articles.length
}

function handleKeydown(event: KeyboardEvent) {
  if (selected.value === null) return
  if (event.key === 'Escape') close()
  if (event.key === 'ArrowRight') move(1)
  if (event.key === 'ArrowLeft') move(-1)
}

onMounted(() => window.addEventListener('keydown', handleKeydown))
onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleKeydown)
  document.documentElement.classList.remove('summary-papers-gallery-open')
})
</script>

<template>
  <section aria-labelledby="infographic-gallery-title" class="summary-papers-gallery">
    <div class="summary-papers-gallery__intro">
      <p class="summary-papers-gallery__hint">Select a summary to enlarge it. Use the arrows or your keyboard to move between
        papers.</p>
    </div>

    <div class="summary-papers-gallery__grid">
      <article v-for="(item, index) in articles" :key="item.number" class="summary-papers-gallery__card">
        <button :aria-label="`Enlarge ${item.alt}`" class="summary-papers-gallery__preview" type="button" @click="open(index)">
          <span class="summary-papers-gallery__number">{{ item.number }}</span>
          <img :alt="item.alt" :src="item.image" loading="lazy" />
          <span class="summary-papers-gallery__expand">View Summary<span aria-hidden="true">↗</span></span>
        </button>
        <div class="summary-papers-gallery__copy">
          <h3>{{ item.title }}</h3>
          <p>{{ item.summary }}</p>
          <a :href="item.article">Read the paper <span aria-hidden="true">→</span></a>
        </div>
      </article>
    </div>

    <Teleport to="body">
      <div v-if="selectedArticle" :aria-label="selectedArticle.alt" aria-modal="true" class="summary-papers-gallery__modal"
           role="dialog" @click.self="close">
        <div class="summary-papers-gallery__modal-content">
          <button aria-label="Close infographic" class="summary-papers-gallery__close" type="button" @click="close">×</button>
          <div class="summary-papers-gallery__modal-topline">
            <span>{{ selectedArticle.number }} / {{ articles.length }}</span>
            <span>Preview</span>
          </div>
          <img :alt="selectedArticle.alt" :src="selectedArticle.image" class="summary-papers-gallery__modal-image" />
          <div class="summary-papers-gallery__modal-footer">
            <button aria-label="Previous infographic" type="button" @click="move(-1)">← <span>Previous</span></button>
            <a :href="selectedArticle.article">Read the paper <span aria-hidden="true">→</span></a>
            <button aria-label="Next infographic" type="button" @click="move(1)"><span>Next</span> →</button>
          </div>
        </div>
      </div>
    </Teleport>
  </section>
</template>

<style scoped>
.summary-papers-gallery {
  margin: 52px 0 68px;
}

.summary-papers-gallery__intro {
  display: flex;
  align-items: end;
  justify-content: space-between;
  gap: 28px;
  margin-bottom: 26px;
  padding-top: 30px;
  border-top: 1px solid var(--vp-c-divider);
}

.summary-papers-gallery h2 {
  margin: 0;
  border: 0;
  padding: 0;
  font-size: clamp(1.8rem, 4vw, 2.5rem);
}

.summary-papers-gallery__hint {
  max-width: 360px;
  margin: 0 0 4px;
  color: var(--vp-c-text-2);
  font-size: .92rem;
  line-height: 1.55;
}

.summary-papers-gallery__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 18px;
}

.summary-papers-gallery__card {
  display: flex;
  flex-direction: column;
  min-width: 0;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-elv);
}

.summary-papers-gallery__preview {
  position: relative;
  display: block;
  padding: 18px 18px 0;
  border: 0;
  background: var(--site-image-frame);
  text-align: left;
  cursor: pointer;
}

.summary-papers-gallery__preview img {
  display: block;
  width: 100%;
  aspect-ratio: 4 / 3;
  object-fit: cover;
  object-position: top center;
  transition: transform .25s ease;
}

.summary-papers-gallery__preview:hover img, .summary-papers-gallery__preview:focus-visible img {
  transform: scale(1.025);
}

.summary-papers-gallery__preview:focus-visible {
  outline: 3px solid var(--vp-c-brand-3);
  outline-offset: -3px;
}

.summary-papers-gallery__number {
  position: absolute;
  z-index: 1;
  top: 0;
  left: 0;
  padding: 7px 10px;
  background: var(--vp-c-brand-1);
  color: #fff;
  font-size: .72rem;
  font-weight: 700;
  letter-spacing: .08em;
}

.summary-papers-gallery__expand {
  display: block;
  padding: 11px 0 13px;
  color: var(--vp-c-brand-1);
  font-size: .76rem;
  font-weight: 700;
  letter-spacing: .05em;
  text-transform: uppercase;
}

.summary-papers-gallery__copy {
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 18px 20px 20px;
}

.summary-papers-gallery__copy h3 {
  margin: 0 0 9px;
  color: var(--vp-c-text-1);
  font-family: Georgia, 'Times New Roman', serif;
  font-size: 1.18rem;
  line-height: 1.16;
}

.summary-papers-gallery__copy p {
  margin: 0 0 16px;
  color: var(--vp-c-text-2);
  font-size: .9rem;
  line-height: 1.5;
}

.summary-papers-gallery__copy a, .summary-papers-gallery__modal-footer a {
  margin-top: auto;
  color: var(--vp-c-brand-1);
  font-size: .8rem;
  font-weight: 700;
  text-decoration: none;
}

.summary-papers-gallery__copy a:hover, .summary-papers-gallery__modal-footer a:hover {
  text-decoration: underline;
}

.summary-papers-gallery__modal {
  position: fixed;
  z-index: 100;
  inset: 0;
  display: grid;
  place-items: center;
  padding: 24px;
  background: var(--site-overlay);
}

.summary-papers-gallery__modal-content {
  position: relative;
  display: flex;
  flex-direction: column;
  width: min(100%, 1080px);
  max-height: calc(100vh - 48px);
  padding: 20px;
  background: var(--vp-c-bg);
  box-shadow: 0 20px 60px var(--site-shadow);
}

.summary-papers-gallery__close {
  position: absolute;
  z-index: 1;
  top: 8px;
  right: 10px;
  width: 38px;
  height: 38px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 50%;
  background: var(--vp-c-bg-elv);
  color: var(--vp-c-text-1);
  font-size: 1.5rem;
  line-height: 1;
  cursor: pointer;
}

.summary-papers-gallery__modal-topline {
  display: flex;
  justify-content: space-between;
  margin: 0 50px 14px 2px;
  color: var(--vp-c-text-2);
  font-size: .72rem;
  font-weight: 700;
  letter-spacing: .08em;
  text-transform: uppercase;
}

.summary-papers-gallery__modal-image {
  display: block;
  width: 100%;
  max-height: calc(100vh - 152px);
  object-fit: contain;
}

.summary-papers-gallery__modal-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 18px;
  padding: 16px 2px 0;
}

.summary-papers-gallery__modal-footer button {
  border: 0;
  background: transparent;
  color: var(--vp-c-text-2);
  font: inherit;
  font-size: .8rem;
  cursor: pointer;
}

.summary-papers-gallery__modal-footer button:hover, .summary-papers-gallery__close:hover {
  color: var(--vp-c-brand-1);
}

@media (max-width: 900px) {
  .summary-papers-gallery__grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 640px) {
  .summary-papers-gallery__intro {
    display: block;
  }

  .summary-papers-gallery__hint {
    margin-top: 12px;
  }

  .summary-papers-gallery__grid {
    grid-template-columns: 1fr;
  }

  .summary-papers-gallery__modal {
    padding: 12px;
  }

  .summary-papers-gallery__modal-content {
    max-height: calc(100vh - 24px);
    padding: 12px;
  }

  .summary-papers-gallery__modal-footer span {
    display: none;
  }
}
</style>

