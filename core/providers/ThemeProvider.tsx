import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider as DefaultThemeProvider,
  useTheme as useDefaultTheme,
} from '@react-navigation/native';
import { observer } from 'mobx-react';
import React, { FC, ReactNode, useEffect, useState } from 'react';
import { useColorScheme } from 'react-native';

import { colors } from '../constants/colors';
import { Radii } from '../constants/radii';
import { Spacings } from '../constants/spacings';
import { Typography } from '../constants/typography';
import rootStore from '../rootStore';

export type Theme = {
  dark: boolean;
  colors: {
    primary: string;
    secondary: string;
    tertiary: string;
    buttonPrimary: string;
    success: string;
    danger: string;
    background: string;
    surface: string;
    card: string;
    text: string;
    border: string;
    notification: string;
    tabIconDefault: string;
    tabIconSelected: string;
  };
  typography: typeof Typography;
  radii: typeof Radii;
  spacings: typeof Spacings;
};

enum ThemeNames {
  Dark = 'dark',
  Light = 'light',
}

enum ColorSchemas {
  Dark = 'dark',
  Light = 'light',
}

const themes: Record<ThemeNames, Theme> = {
  [ThemeNames.Light]: {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      text: colors.mineShaft,
      primary: colors.mineShaft,
      secondary: colors.silverChalice,
      tertiary: colors.alto,
      buttonPrimary: colors.white,
      success: colors.fruitSalad,
      danger: colors.pomegranate,
      card: colors.white,
      background: colors.white,
      surface: colors.white,
      tabIconDefault: colors.silverChalice,
      tabIconSelected: colors.mineShaft,
    },
    typography: Typography,
    radii: Radii,
    spacings: Spacings,
  },
  // TODO: config theme
  [ThemeNames.Dark]: {
    ...DarkTheme,
    colors: {
      ...DarkTheme.colors,
      text: colors.white,
      primary: colors.white,
      secondary: colors.silverChalice,
      tertiary: colors.alto,
      buttonPrimary: colors.black,
      success: colors.fruitSalad,
      danger: colors.pomegranate,
      card: colors.black,
      background: colors.black,
      surface: colors.black,
      tabIconDefault: colors.silverChalice,
      tabIconSelected: colors.white,
    },
    typography: Typography,
    radii: Radii,
    spacings: Spacings,
  },
};

interface Props {
  children?: ReactNode;
}

const ThemeProvider: FC<Props> = ({ children }) => {
  const isDarkMode = useColorScheme() === ColorSchemas.Dark;
  const [currentThemeName, setCurrentThemeName] = useState(ThemeNames.Light);
  const { userTheme } = rootStore;

  useEffect(() => {
    if (userTheme === 'light') {
      setCurrentThemeName(ThemeNames.Light);
      return;
    }
    if (userTheme === 'dark') {
      setCurrentThemeName(ThemeNames.Dark);
      return;
    }
    setCurrentThemeName(isDarkMode ? ThemeNames.Dark : ThemeNames.Light);
  }, [isDarkMode, userTheme]);

  return <DefaultThemeProvider value={themes[currentThemeName]}>{children}</DefaultThemeProvider>;
};

export default observer(ThemeProvider);

export const useTheme = () => {
  const theme = useDefaultTheme();

  return theme as Theme;
};
