import DefaultTheme from 'vitepress/theme'
import './style.css'
import ArticleInfographic from './components/ArticleInfographic.vue'
import LibraryInfographicGallery from './components/LibraryInfographicGallery.vue'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('ArticleInfographic', ArticleInfographic)
    app.component('LibraryInfographicGallery', LibraryInfographicGallery)
  }
}
