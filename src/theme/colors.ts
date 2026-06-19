// ─── CHANGE THIS ONE VALUE to retheme the whole app ───────────────────────────
// noci's display color (used on SK Glypher text, option selectors, active states).
// White and black are the only true constants.
export const ACCENT = '#E04040';
// ──────────────────────────────────────────────────────────────────────────────

export const COLORS = {
  // The two absolute constants
  white: '#FFFFFF',
  black: '#1A1A1A',

  // Accent — always equals ACCENT above; referenced throughout the app
  accent: ACCENT,
  accentLight: '#FFF0F0', // very pale tint of accent for backgrounds/banners

  // Neutral grays (no green, no earth tones)
  darkGray: '#3D3D3D',
  midGray: '#888888',
  lightGray: '#C8C8C8',
  xLightGray: '#EBEBEB',
  offWhite: '#F8F8F8',

  // Semantic aliases kept for backwards compatibility with existing components
  green900: '#1A1A1A',
  green700: ACCENT,       // accent color → headings, active states
  green500: ACCENT,
  green200: '#F5D5D5',    // pale accent tint
  green100: '#FFF0F0',
  green50: '#FFFFFF',

  earth700: '#1A1A1A',    // black → CTA buttons ("Add to Cart", "Place Order")
  earth500: '#3D3D3D',
  earth400: '#888888',
  earth100: '#F5F5F5',

  cream: '#F8F8F8',
  gray600: '#3D3D3D',
  gray400: '#888888',
  gray200: '#EBEBEB',
  gray100: '#F5F5F5',

  warning: ACCENT,
  error: '#CC2200',
  success: '#1A1A1A',
} as const;
