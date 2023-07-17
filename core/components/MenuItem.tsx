import { MenuView } from '@react-native-menu/menu';
import { Pressable, PressableStateCallbackType } from 'react-native';

import { Text } from './Text';
import { View } from './View';

type Props = {
  title: string;
  description?: string;
  value?: string;
  onPress?(): void;
  disabled?: boolean;
  menuViewTitle?: React.ComponentProps<typeof MenuView>['title'];
  actions?: React.ComponentProps<typeof MenuView>['actions'];
  onPressAction?: React.ComponentProps<typeof MenuView>['onPressAction'];
};

export const MenuItem: React.FC<Props> = ({
  title,
  description,
  value,
  onPress,
  disabled,
  menuViewTitle,
  actions,
  onPressAction,
}) => {
  const renderContent = ({ pressed }: PressableStateCallbackType) => (
    <View row alignItems="center" style={{ opacity: pressed || disabled ? 0.5 : 1 }}>
      <View flex={1}>
        <Text text={title} type="labelLarge" />
        {!!description && <Text text={description} type="bodySmall" color="secondary" />}
      </View>
      {!!value && <Text text={value} type="labelLarge" />}
    </View>
  );

  if (actions?.length && !disabled) {
    return (
      <MenuView title={menuViewTitle} actions={actions} onPressAction={onPressAction}>
        <Pressable disabled={disabled}>{renderContent}</Pressable>
      </MenuView>
    );
  }

  return (
    <Pressable onPress={onPress} disabled={disabled}>
      {renderContent}
    </Pressable>
  );
};
