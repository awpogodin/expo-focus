import React from 'react';
import { Text as DefaultText, StyleSheet } from 'react-native';

import { Spacings } from '../constants/spacings';
import { Typography } from '../constants/typography';
import { Theme, useTheme } from '../providers/ThemeProvider';

type Color = Extract<
  keyof Theme['colors'],
  'primary' | 'secondary' | 'tertiary' | 'success' | 'danger' | 'buttonPrimary'
>;

export type TextProps = {
  text: string;
  color?: Color;
  type?: keyof typeof Typography;
  align?: 'left' | 'center' | 'right';

  mt?: keyof typeof Spacings;
  mb?: keyof typeof Spacings;
  mr?: keyof typeof Spacings;
  ml?: keyof typeof Spacings;
  mv?: keyof typeof Spacings;
  mh?: keyof typeof Spacings;

  pt?: keyof typeof Spacings;
  pb?: keyof typeof Spacings;
  pr?: keyof typeof Spacings;
  pl?: keyof typeof Spacings;
  pv?: keyof typeof Spacings;
  ph?: keyof typeof Spacings;
} & DefaultText['props'];

export const Text = React.forwardRef<DefaultText, TextProps>((props, ref) => {
  const {
    text,
    color = 'primary',
    type = 'bodyLarge',
    align,
    style,

    mt,
    mb,
    mr,
    ml,
    mv,
    mh,
    pt,
    pb,
    pr,
    pl,
    pv,
    ph,
    ...rest
  } = props;
  const { typography, colors, spacings } = useTheme();

  const styles = StyleSheet.flatten([
    {
      color: colors[color],
      ...typography[type],
    },
    align && { textAlign: align },

    mt && { marginTop: spacings[mt] },
    mb && { marginBottom: spacings[mb] },
    mr && { marginRight: spacings[mr] },
    ml && { marginLeft: spacings[ml] },
    mv && { marginVertical: spacings[mv] },
    mh && { marginHorizontal: spacings[mh] },

    pt && { paddingTop: spacings[pt] },
    pb && { paddingBottom: spacings[pb] },
    pr && { paddingRight: spacings[pr] },
    pl && { paddingLeft: spacings[pl] },
    pv && { paddingVertical: spacings[pv] },
    ph && { paddingHorizontal: spacings[ph] },
    style,
  ]);

  return (
    <DefaultText ref={ref} style={styles} {...rest}>
      {text}
    </DefaultText>
  );
});
