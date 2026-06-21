// SK Glypher — display/headlines, matches noci.farm hero text
// Now        — all body, UI labels, prices, captions
export const TYPOGRAPHY = {
  // SK Glypher Heavy/Bold — wordmark, hero, landing screen
  displayLg: { fontSize: 48, fontFamily: 'SKGlypher-Heavy', lineHeight: 54 },
  displayMd: { fontSize: 38, fontFamily: 'SKGlypher-Heavy', lineHeight: 44 },
  displaySm: { fontSize: 28, fontFamily: 'SKGlypher-Bold',  lineHeight: 34 },

  // Now Bold/SemiBold — section headings, card titles
  headingLg: { fontSize: 22, fontFamily: 'Now-Bold',     lineHeight: 28 },
  headingMd: { fontSize: 18, fontFamily: 'Now-SemiBold', lineHeight: 24 },
  headingSm: { fontSize: 16, fontFamily: 'Now-SemiBold', lineHeight: 22 },

  // Now Regular/Medium — body copy, descriptions
  bodyLg: { fontSize: 16, fontFamily: 'Now-Regular', lineHeight: 24 },
  bodyMd: { fontSize: 14, fontFamily: 'Now-Regular', lineHeight: 20 },
  bodySm: { fontSize: 12, fontFamily: 'Now-Regular', lineHeight: 18 },

  // Now SemiBold/Medium — buttons, tags, labels
  labelLg: { fontSize: 14, fontFamily: 'Now-SemiBold', lineHeight: 20 },
  labelSm: { fontSize: 12, fontFamily: 'Now-Medium',   lineHeight: 16 },

  // Now Bold — prices
  price: { fontSize: 18, fontFamily: 'Now-Bold', lineHeight: 24 },
} as const;
