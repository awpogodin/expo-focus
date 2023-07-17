import { StyleSheet } from 'react-native';

import { View } from './View';
import { useTheme } from '../providers/ThemeProvider';

type Props = {
  type: 'idle' | 'inProgress' | 'finished';
};

const SIZE = 15;

export const ProgressCircle: React.FC<Props> = ({ type }) => {
  const { colors } = useTheme();
  const borderColor = colors.primary;
  let backgroundColor = 'transparent';
  let opacity = 1;

  if (type === 'idle') {
    opacity = 0.3;
  }

  if (type === 'finished') {
    backgroundColor = colors.primary;
  }

  const style = {
    ...styles.circle,
    backgroundColor,
    borderColor,
    borderWidth: 2,
    opacity,
  };

  return <View mh="xxs" style={style} />;
};

const styles = StyleSheet.create({
  circle: {
    height: SIZE,
    width: SIZE,
    borderRadius: SIZE / 2,
  },
});
