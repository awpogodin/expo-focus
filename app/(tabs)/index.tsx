import { AntDesign } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { Pressable } from 'react-native';

import { Text } from '../../core/components/Text';
import { View } from '../../core/components/View';
import { useTheme } from '../../core/providers/ThemeProvider';

export default function HomeScreen() {
  const { t } = useTranslation();
  const { colors } = useTheme();

  return (
    <View ph="l" color="background" flex={1}>
      <View mt="xl">
        <Text align="center" type="labelLarge" text="Задача 1" />
        <Text align="center" type="bodySmall" color="secondary" mt="xs" text="Работа" />
      </View>
      <View flex={1} justifyContent="center">
        <Text align="center" type="bodyLarge" color="secondary" text={t('home.title')} />
        <Text align="center" type="headlineExtraLarge" mt="xs" text="25:00" />

        <View mt="xxl" justifyContent="center" row>
          <Pressable onPress={() => {}}>
            {({ pressed }) => (
              <AntDesign
                name="play"
                size={60}
                color={colors.primary}
                style={{ opacity: pressed ? 0.5 : 1 }}
              />
            )}
          </Pressable>
        </View>
      </View>
    </View>
  );
}
