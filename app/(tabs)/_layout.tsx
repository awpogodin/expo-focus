import { AntDesign, FontAwesome } from '@expo/vector-icons';
import { Tabs, useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { Pressable } from 'react-native';

import { Text } from '../../core/components/Text';
import { useTheme } from '../../core/providers/ThemeProvider';

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const router = useRouter();

  const handleAddEntry = () => {
    router.push('/entry');
  };

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.tabIconSelected,
        tabBarInactiveTintColor: colors.tabIconDefault,
        tabBarShowLabel: false,
        headerShadowVisible: false,
        // headerTransparent: true,
        tabBarStyle: {
          borderTopWidth: 0,
        },
      }}>
      <Tabs.Screen
        name="entries"
        options={{
          title: '',
          tabBarIcon: ({ color }) => <TabBarIcon name="inbox" color={color} />,
          headerRight: () => (
            <Pressable onPress={handleAddEntry}>
              {({ pressed }) => (
                <AntDesign
                  name="pluscircle"
                  size={25}
                  color={colors.primary}
                  style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                />
              )}
            </Pressable>
          ),
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          title: '',
          tabBarIcon: ({ color }) => <TabBarIcon name="circle-o-notch" color={color} />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: t('settings.screenTitle'),
          tabBarIcon: ({ color }) => <TabBarIcon name="user" color={color} />,
          headerRight: () => (
            <Pressable>
              {({ pressed }) => (
                <Text
                  type="bodyMedium"
                  text="Pro upgrade"
                  style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                />
              )}
            </Pressable>
          ),
        }}
      />
    </Tabs>
  );
}
