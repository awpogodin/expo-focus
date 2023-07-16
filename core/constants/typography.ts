import { scale } from 'react-native-size-matters';

import { FontFamily } from './fonts';

export const Typography = {
  headlineExtraLarge: {
    fontFamily: FontFamily.SFProSemibold,
    fontSize: scale(72),
    fontWeight: 'normal',
    letterSpacing: 0,
    lineHeight: 80,
  },
  headlineLarge: {
    fontFamily: FontFamily.SFProSemibold,
    fontSize: scale(24),
    fontWeight: 'normal',
    letterSpacing: 0,
    lineHeight: 32,
  },
  headlineMedium: {
    fontFamily: FontFamily.SFProSemibold,
    fontSize: scale(20),
    fontWeight: 'normal',
    letterSpacing: 0,
    lineHeight: 24,
  },
  headlineSmall: {
    fontFamily: FontFamily.SFProSemibold,
    fontSize: scale(18),
    fontWeight: 'normal',
    letterSpacing: 0,
    lineHeight: 22,
  },
  titleLarge: {
    fontFamily: FontFamily.SFProSemibold,
    fontSize: scale(22),
    fontWeight: 'normal',
    letterSpacing: 0,
    lineHeight: 28,
  },
  titleMedium: {
    fontFamily: FontFamily.SFProSemibold,
    fontSize: scale(16),
    fontWeight: 'normal',
    letterSpacing: 0,
    lineHeight: 20,
  },
  titleSmall: {
    fontFamily: FontFamily.SFProSemibold,
    fontSize: scale(14),
    fontWeight: 'normal',
    letterSpacing: 0,
    lineHeight: 20,
  },
  bodyLarge: {
    fontFamily: FontFamily.SFProRegular,
    fontSize: scale(16),
    fontWeight: 'normal',
    letterSpacing: 0,
    lineHeight: 20,
  },
  bodyMedium: {
    fontFamily: FontFamily.SFProRegular,
    fontSize: scale(14),
    fontWeight: 'normal',
    letterSpacing: 0,
    lineHeight: 20,
  },
  bodySmall: {
    fontFamily: FontFamily.SFProRegular,
    fontSize: scale(12),
    fontWeight: 'normal',
    letterSpacing: 0,
    lineHeight: 16,
  },
  labelLarge: {
    fontFamily: FontFamily.SFProSemibold,
    fontSize: scale(16),
    fontWeight: 'normal',
    letterSpacing: 0,
    lineHeight: 20,
  },
  labelMedium: {
    fontFamily: FontFamily.SFProSemibold,
    fontSize: scale(12),
    fontWeight: 'normal',
    letterSpacing: 0,
    lineHeight: 16,
  },
  labelSmall: {
    fontFamily: FontFamily.SFProSemibold,
    fontSize: scale(10),
    fontWeight: 'normal',
    letterSpacing: 0,
    lineHeight: 14,
  },
} as const;
