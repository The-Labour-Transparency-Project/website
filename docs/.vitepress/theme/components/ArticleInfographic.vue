<script lang="ts" setup>
import { nextTick, onBeforeUnmount, onMounted, ref } from 'vue'

defineProps<{
  src: string
  alt: string
}>()

const isOpen = ref(false)

function openModal() {
  isOpen.value = true
  document.documentElement.classList.add('infographic-modal-open')
  nextTick(() => document.querySelector<HTMLButtonElement>('.article-infographic-modal__close')?.focus())
}

function closeModal() {
  isOpen.value = false
  document.documentElement.classList.remove('infographic-modal-open')
}

function handleKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape' && isOpen.value) closeModal()
}

function printInfographic() {
  window.print()
}

onMounted(() => window.addEventListener('keydown', handleKeydown))
onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleKeydown)
  document.documentElement.classList.remove('infographic-modal-open')
})
</script>

<template>
  <button class="article-infographic" type="button" @click="openModal">
    <img :alt="alt" :src="src" loading="lazy" />
  </button>

  <Teleport to="body">
    <div v-if="isOpen" :aria-label="alt" aria-modal="true" class="article-infographic-modal" role="dialog"
         @click.self="closeModal">
      <div class="article-infographic-modal__content">
        <button aria-label="Close" class="article-infographic-modal__close" type="button"
                @click="closeModal">×
        </button>
        <img :alt="alt" :src="src" class="article-infographic-modal__image" />
        <div class="article-infographic-modal__actions">
          <a :href="src" download>Download</a>
          <button type="button" @click="printInfographic">Print</button>
          <a :href="src" rel="noopener" target="_blank">Open in tab</a>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
.article-infographic {
  appearance: none;
  display: block;
  float: right;
  width: min(31%, 220px);
  margin: 0 0 28px 36px;
  padding: 8px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-elv);
  color: var(--vp-c-text-2);
  font: inherit;
  text-decoration: none;
  transition: border-color .2s ease, box-shadow .2s ease, transform .2s ease;
  cursor: pointer;
}

.article-infographic:hover,
.article-infographic:focus-visible {
  border-color: var(--vp-c-brand-2);
  box-shadow: 0 10px 24px var(--site-shadow);
  transform: translateY(-2px);
}

.article-infographic img {
  display: block;
  width: 100%;
  height: auto;
  margin: 0;
}

.article-infographic span {
  display: block;
  padding: 9px 4px 3px;
  font-size: .76rem;
  font-weight: 700;
  letter-spacing: .04em;
  text-align: center;
}

.article-infographic::after {
  content: ' ↗';
}

.article-infographic-modal {
  position: fixed;
  z-index: 100;
  inset: 0;
  display: grid;
  place-items: center;
  padding: 24px;
  background: var(--site-overlay);
}

.article-infographic-modal__content {
  position: relative;
  display: flex;
  flex-direction: column;
  width: min(100%, 1100px);
  max-height: calc(100vh - 48px);
  padding: 18px;
  background: var(--vp-c-bg);
  box-shadow: 0 20px 60px var(--site-shadow);
}

.article-infographic-modal__image {
  display: block;
  width: 100%;
  max-height: calc(100vh - 150px);
  object-fit: contain;
}

.article-infographic-modal__close {
  position: absolute;
  z-index: 1;
  top: 6px;
  right: 8px;
  width: 36px;
  height: 36px;
  border: 0;
  border-radius: 50%;
  background: var(--vp-c-bg-elv);
  color: var(--vp-c-text-1);
  font-size: 1.6rem;
  line-height: 1;
  cursor: pointer;
}

.article-infographic-modal__actions {
  display: flex;
  justify-content: center;
  gap: 10px;
  padding-top: 16px;
}

.article-infographic-modal__actions a,
.article-infographic-modal__actions button {
  padding: 8px 14px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-elv);
  color: var(--vp-c-text-1);
  font: inherit;
  font-size: .85rem;
  text-decoration: none;
  cursor: pointer;
}

.article-infographic-modal__actions a:hover,
.article-infographic-modal__actions button:hover,
.article-infographic-modal__close:hover {
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-brand-1);
}

@media print {
  :global(html.infographic-modal-open body > *:not(.article-infographic-modal)) {
    display: none !important;
  }

  :global(html.infographic-modal-open .article-infographic-modal) {
    position: static;
    display: block;
    padding: 0;
    background: white;
  }

  :global(html.infographic-modal-open .article-infographic-modal__content) {
    width: 100%;
    max-height: none;
    padding: 0;
    box-shadow: none;
  }

  .article-infographic-modal__close,
  .article-infographic-modal__actions {
    display: none;
  }

  .article-infographic-modal__image {
    max-height: none;
  }
}

@media (max-width: 640px) {
  .article-infographic {
    float: none;
    width: min(100%, 260px);
    margin: 0 auto 28px;
  }

  .article-infographic-modal {
    padding: 12px;
  }

  .article-infographic-modal__content {
    max-height: calc(100vh - 24px);
    padding: 10px;
  }

  .article-infographic-modal__actions {
    flex-wrap: wrap;
  }
}
</style>
