import { Tabs } from 'expo-router';
import React from 'react';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { INDIGO, LIGHT_PURPLE, ROSE } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { DrawerToggleButton } from '@react-navigation/drawer';
import { View, Text, Image, Dimensions } from 'react-native';
import { StatusBar } from 'expo-status-bar';
const imagePath = require('../../../assets/images/mini_fullwhite.png');
import Constants from 'expo-constants';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        headerShown: true,
        headerLeft: () => <DrawerToggleButton tintColor="#000" />,
        headerStyle: {
          backgroundColor: INDIGO,
          marginHorizontal: 8,
          marginTop: 16,
        },
        tabBarStyle: {
          backgroundColor: ROSE,
          borderColor: 'transparent',
          borderRadius: 8,
          marginBottom: 8,
          marginHorizontal: 8,
          height: 64,
        },
        tabBarLabelStyle: {
          color: 'white',
          marginBottom: 10,
          marginTop: -6,
          fontFamily: 'Outfit_400Regular',
          fontSize: 14,
        },
        header: () => (
          <View
            style={{
              marginTop: Constants.statusBarHeight + 8,
              backgroundColor: INDIGO,
              borderRadius: 8,
              height: 64,
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingHorizontal: 16,
              marginHorizontal: 8,
            }}
          >
            <View>
              <Image source={imagePath} style={{ width: 32, height: 32 }} />
            </View>
            <View>
              <DrawerToggleButton tintColor="white"></DrawerToggleButton>
            </View>
          </View>
        ),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={'home'}
              color={focused ? 'white' : LIGHT_PURPLE}
              style={{}}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="explore"
        options={{
          title: 'QnA',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={'question-answer'}
              color={focused ? 'white' : LIGHT_PURPLE}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="scan"
        options={{
          title: 'Scan',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={'camera'}
              color={focused ? 'white' : LIGHT_PURPLE}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="notes/index"
        options={{
          title: 'Notes',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={'note'}
              color={focused ? 'white' : LIGHT_PURPLE}
            />
          ),
        }}
      />
    </Tabs>
  );
}
