import { AntDesign, FontAwesome } from '@expo/vector-icons';
import { useFonts } from 'expo-font';
import { getLocales } from 'expo-localization';
import { SplashScreen, Stack, useRouter } from 'expo-router';
import i18n from 'i18next';
import { useEffect } from 'react';
import 'intl-pluralrules';
import { initReactI18next, useTranslation } from 'react-i18next';
import { Pressable } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { Text } from '../core/components/Text';
import { FontFamily } from '../core/constants/fonts';
import ThemeProvider from '../core/providers/ThemeProvider';
import { resources } from '../core/resources/resources';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

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

function RootLayoutNav() {
  const { t } = useTranslation();
  const router = useRouter();

  const handleCancel = () => {
    router.push('../');
  };

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
              // gestureEnabled: false,
            }}
          />
        </Stack>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
