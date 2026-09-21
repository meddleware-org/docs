// Docs theme = VitePress default theme + Meddleware brand overrides.
// The design-token CSS is imported so the palette stays in lockstep with the apps; custom.css
// maps VitePress's --vp-c-brand-* onto the Oxblood/Indigo/Gold ramps.
import { h } from 'vue'
import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'
import '@meddleware/design-tokens/tokens.css'
import '@meddleware/design-tokens/seasons.css'
import './custom.css'

const theme: Theme = {
  extends: DefaultTheme,
  Layout: () =>
    h(DefaultTheme.Layout, null, {
      'home-hero-actions-after': () =>
        h('p', { class: 'home-explore-prompt' }, 'Select a blockchain below to explore the available tools.'),
    }),
  enhanceApp({ app: _app, router: _router, siteData: _siteData }) {
    if (typeof document !== 'undefined') {
      const m = new Date().getMonth();
      document.documentElement.dataset.season =
        m >= 2 && m <= 4 ? 'spring' :
        m >= 5 && m <= 7 ? 'summer' :
        m >= 8 && m <= 10 ? 'autumn' : 'winter';
    }
  },
}

export default theme
