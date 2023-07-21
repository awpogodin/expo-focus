import { FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { observer } from 'mobx-react';
import { useTranslation } from 'react-i18next';
import { Platform } from 'react-native';

import { Button } from '../core/components/Button';
import { Text } from '../core/components/Text';
import { View } from '../core/components/View';
import { useTheme } from '../core/providers/ThemeProvider';
import rootStore from '../core/rootStore';

const OnboardingModal = () => {
  const { setIsOnboardingAlreadyShown } = rootStore;
  const { t } = useTranslation();
  const { colors } = useTheme();
  const router = useRouter();

  const handleContinue = () => {
    setIsOnboardingAlreadyShown(true);
    router.push('../');
  };

  const items = [
    {
      id: 1,
      title: t('onboarding.items.tasks.title'),
      description: t('onboarding.items.tasks.description'),
      iconName: 'inbox',
    },
    {
      id: 2,
      title: t('onboarding.items.focus.title'),
      description: t('onboarding.items.focus.description'),
      iconName: 'circle-o-notch',
    },
    {
      id: 3,
      title: t('onboarding.items.design.title'),
      description: t('onboarding.items.design.description'),
      iconName: 'leaf',
    },
  ];

  return (
    <>
      <View useSafeArea flex={1} ph="l" color="background" justifyContent="space-between">
        <View flex={1} mt="xl" mh="l">
          <Text type="headlineLarge" align="center" text={t('onboarding.title')} />
          <View mt="xl">
            {items.map(({ id, title, description, iconName }) => (
              <View mt="l" key={id} row>
                <View flex={0} mr="xl" justifyContent="center">
                  <FontAwesome
                    name={iconName as React.ComponentProps<typeof FontAwesome>['name']}
                    color={colors.primary}
                    size={22}
                  />
                </View>
                <View flex={1}>
                  <Text type="labelLarge" text={title} />
                  <Text mt="s" type="bodyMedium" color="secondary" text={description} />
                </View>
              </View>
            ))}
          </View>
        </View>
        <View mb="l">
          <Button onPress={handleContinue} text={t('buttons.continue')} />
        </View>
      </View>
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </>
  );
};

export default observer(OnboardingModal);
