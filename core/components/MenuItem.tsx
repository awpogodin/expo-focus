import { Pressable, PressableStateCallbackType } from 'react-native';
import { ContextMenuButton } from 'react-native-ios-context-menu';

import { Text } from './Text';
import { View } from './View';

type Props = {
  title: string;
  description?: string;
  value?: string;
  onPress?(id?: string): void;
  disabled?: boolean;
  menuConfig?: React.ComponentProps<typeof ContextMenuButton>['menuConfig'];
};

export const MenuItem: React.FC<Props> = ({
  title,
  description,
  value,
  onPress,
  disabled,
  menuConfig,
}) => {
  const handlePress = () => onPress?.();
  const handlePressMenuItem: React.ComponentProps<typeof ContextMenuButton>['onPressMenuItem'] = ({
    nativeEvent,
  }) => onPress?.(nativeEvent.actionKey);

  const renderContent = ({ pressed }: PressableStateCallbackType) => (
    <View row alignItems="center" style={{ opacity: pressed || disabled ? 0.5 : 1 }}>
      <View flex={1}>
        <Text text={title} type="labelLarge" />
        {!!description && <Text text={description} type="bodySmall" color="secondary" />}
      </View>
      {!!value && <Text text={value} type="labelLarge" />}
    </View>
  );

  if (menuConfig && !disabled) {
    return (
      <ContextMenuButton
        isMenuPrimaryAction
        menuConfig={menuConfig}
        onPressMenuItem={handlePressMenuItem}>
        <Pressable disabled={disabled}>{renderContent}</Pressable>
      </ContextMenuButton>
    );
  }

  return (
    <Pressable onPress={handlePress} disabled={disabled}>
      {renderContent}
    </Pressable>
  );
};
