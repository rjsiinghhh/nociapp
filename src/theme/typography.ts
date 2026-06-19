export const FONT_DISPLAY = 'SKGlypher-Bold';
export const FONT_DISPLAY_HEAVY = 'SKGlypher-Heavy';
export const FONT_DISPLAY_REGULAR = 'SKGlypher-Regular';

export const TYPOGRAPHY = {
  // SK Glypher Heavy — wordmark, hero headlines (matches noci.farm biggest text)
  displayLg: { fontSize: 48, fontFamily: 'SKGlypher-Heavy', lineHeight: 54 },
  displayMd: { fontSize: 38, fontFamily: 'SKGlypher-Heavy', lineHeight: 44 },
  displaySm: { fontSize: 28, fontFamily: 'SKGlypher-Bold',  lineHeight: 34 },

  // System font headings — labels, section titles, card titles
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
