import 'react-native-get-random-values';
import { AntDesign, FontAwesome } from '@expo/vector-icons';
import { useFonts } from 'expo-font';
import { getLocales } from 'expo-localization';
import * as Notifications from 'expo-notifications';
import { SplashScreen, Stack, useRouter } from 'expo-router';
import i18n from 'i18next';
import { observer } from 'mobx-react';
import { useEffect } from 'react';
import 'intl-pluralrules';
import { initReactI18next, useTranslation } from 'react-i18next';
import { Pressable } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { Text } from '../core/components/Text';
import { FontFamily } from '../core/constants/fonts';
import { useNotifications } from '../core/hooks/useNotifications';
import ThemeProvider from '../core/providers/ThemeProvider';
import { resources } from '../core/resources/resources';
import rootStore from '../core/rootStore';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: getLocales()[0].languageCode,
    fallbackLng: 'en',

    interpolation: {
      escapeValue: false, // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
    },
  });

export default function RootLayout() {
  useNotifications(true);
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    [FontFamily.SFProRegular]: require('../assets/fonts/SF-Pro-Display-Regular.otf'),
    [FontFamily.SFProSemibold]: require('../assets/fonts/SF-Pro-Display-Semibold.otf'),
    ...FontAwesome.font,
    ...AntDesign.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  return (
    <>
      {/* Keep the splash screen open until the assets have loaded. In the future, we should just support async font loading with a native version of font-display. */}
      {loaded ? <RootLayoutNav /> : <SplashScreen />}
    </>
  );
}

const RootLayoutNav = observer(() => {
  const { t } = useTranslation();
  const { isOnboardingAlreadyShown } = rootStore;
  const router = useRouter();

  const handleCancel = () => {
    router.push('../');
  };

  useEffect(() => {
    if (!isOnboardingAlreadyShown) {
      router.push('/onboarding');
    }
  }, [isOnboardingAlreadyShown]);

  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <Stack
          screenOptions={{
            headerBackTitle: t('buttons.back'),
          }}>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen
            name="entry"
            options={{
              presentation: 'modal',
              // headerTransparent: true,
              headerTitle: t('entry.screenTitle'),
              headerLeft: () => (
                <Pressable onPress={handleCancel}>
                  {({ pressed }) => (
                    <Text
                      type="bodyMedium"
                      text={t('buttons.cancel')}
                      style={{ opacity: pressed ? 0.5 : 1 }}
                    />
                  )}
                </Pressable>
              ),
            }}
          />
          <Stack.Screen
            name="onboarding"
            options={{
              presentation: 'modal',
              headerTransparent: true,
              headerTitle: '',
              gestureEnabled: false,
            }}
          />
        </Stack>
      </ThemeProvider>
    </SafeAreaProvider>
  );
});
