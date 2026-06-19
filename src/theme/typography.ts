// Caveat Bold is the hand-drawn display font matching noci.farm's visual identity.
// Used only for hero headings and the brand name — body text stays on system fonts.
export const FONT_DISPLAY = 'SKGlypher';

export const TYPOGRAPHY = {
  // Display: Caveat hand-drawn font — mirrors noci.farm headline style
  displayLg: { fontSize: 48, fontFamily: FONT_DISPLAY, lineHeight: 54 },
  displayMd: { fontSize: 38, fontFamily: FONT_DISPLAY, lineHeight: 44 },
  displaySm: { fontSize: 28, fontFamily: FONT_DISPLAY, lineHeight: 34 },

  // Headings: system bold, clean
  headingLg: { fontSize: 22, fontWeight: '700' as const, lineHeight: 28 },
  headingMd: { fontSize: 18, fontWeight: '600' as const, lineHeight: 24 },
  headingSm: { fontSize: 16, fontWeight: '600' as const, lineHeight: 22 },

  // Body
  bodyLg: { fontSize: 16, fontWeight: '400' as const, lineHeight: 24 },
  bodyMd: { fontSize: 14, fontWeight: '400' as const, lineHeight: 20 },
  bodySm: { fontSize: 12, fontWeight: '400' as const, lineHeight: 18 },

  // Labels
  labelLg: { fontSize: 14, fontWeight: '600' as const, lineHeight: 20 },
  labelSm: { fontSize: 12, fontWeight: '600' as const, lineHeight: 16 },

  // Price
  price: { fontSize: 18, fontWeight: '700' as const, lineHeight: 24 },
} as const;
