import { StyleSheet } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

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

  const sharedOpacity = useSharedValue(0.3);

  sharedOpacity.value = withRepeat(
    withTiming(1, { duration: 1000, easing: Easing.ease }),
    -1,
    true
  );

  if (type === 'idle') {
    opacity = 0.3;
  }

  if (type === 'finished') {
    backgroundColor = colors.primary;
  }

  const style = useAnimatedStyle(() => ({
    ...styles.circle,
    backgroundColor,
    borderColor,
    borderWidth: 2,
    opacity: type === 'inProgress' ? sharedOpacity.value : opacity,
  }));

  return (
    <View mh="xxs">
      <Animated.View style={style} />
    </View>
  );
};

const styles = StyleSheet.create({
  circle: {
    height: SIZE,
    width: SIZE,
    borderRadius: SIZE / 2,
  },
});
