// Docs theme = VitePress default theme + Meddleware brand overrides.
// The design-token CSS is imported so the palette stays in lockstep with the apps; custom.css
// maps VitePress's --vp-c-brand-* onto the Oxblood/Indigo/Gold ramps.
import DefaultTheme from 'vitepress/theme'
import '@meddleware/design-tokens/tokens.css'
import './custom.css'

export default DefaultTheme
