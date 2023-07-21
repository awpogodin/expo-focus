import { Pressable } from 'react-native';

import { Text } from './Text';
import { View } from './View';
import { useTheme } from '../providers/ThemeProvider';

type Props = {
  text: string;
  onPress?(): void;
  disabled?: boolean;
};

export const Button: React.FC<Props> = ({ text, onPress, disabled }) => {
  const { colors } = useTheme();

  const styles = {
    height: 52,
    borderRadius: 12,
    backgroundColor: colors.primary,
  };

  return (
    <Pressable onPress={onPress} disabled={disabled}>
      {({ pressed }) => (
        <View
          style={[{ opacity: pressed || disabled ? 0.5 : 1 }, styles]}
          justifyContent="center"
          alignItems="center">
          <Text color="buttonPrimary" text={text} />
        </View>
      )}
    </Pressable>
  );
};
