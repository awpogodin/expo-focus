import { useHeaderHeight } from '@react-navigation/elements';
import {
  View as DefaultView,
  ScrollView,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Spacings } from '../constants/spacings';
import { Theme, useTheme } from '../providers/ThemeProvider';

type Color = Extract<keyof Theme['colors'], 'background'>;

export type ViewProps = {
  color?: Color;
  row?: boolean;
  useSafeArea?: boolean;
  scrollable?: boolean;

  flex?: ViewStyle['flex'];
  flexDirection?: ViewStyle['flexDirection'];
  justifyContent?: ViewStyle['justifyContent'];
  alignItems?: ViewStyle['alignItems'];
  alignSelf?: ViewStyle['alignSelf'];
  flexWrap?: ViewStyle['flexWrap'];

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
} & DefaultView['props'];

export const View: React.FC<ViewProps> = (props) => {
  const {
    color,
    useSafeArea,
    scrollable,
    row,

    flex,
    flexDirection,
    alignItems,
    alignSelf,
    flexWrap,
    justifyContent,
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
  const { colors, spacings } = useTheme();
  const insets = useSafeAreaInsets();
  const headerHeight = useHeaderHeight();

  const styles = StyleSheet.flatten([
    {
      backgroundColor: color ? colors[color] : 'transparent',
    },
    row && { flexDirection: 'row' as const },

    { flex },
    alignItems && { alignItems },
    alignSelf && { alignSelf },
    flexWrap && { flexWrap },
    flexDirection && { flexDirection },
    justifyContent && { justifyContent },

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

    useSafeArea && {
      paddingTop: Math.max(headerHeight, insets.top),
      paddingBootom: insets.bottom,
    },

    style,
  ]);

  return scrollable ? (
    <ScrollView style={styles} {...rest} />
  ) : (
    <DefaultView style={styles} {...rest} />
  );
};
