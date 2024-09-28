import { Tabs } from "expo-router";
import React from "react";

import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { INDIGO, ROSE } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { DrawerToggleButton } from "@react-navigation/drawer";
import { View, Text, Image } from "react-native";
import { StatusBar } from "expo-status-bar";
const imagePath = require("../../../assets/images/mini_fullwhite.png");
import Constants from "expo-constants";

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
          borderColor: "transparent",
          borderRadius: 8,
          marginBottom: 8,
          marginHorizontal: 8,
          height: 64,
        },
        tabBarLabelStyle: {
          color: "white",
          marginBottom: 8,
          marginTop: -4,
        },
        header: () => (
          <View
            style={{
              marginTop: Constants.statusBarHeight + 8,
              backgroundColor: INDIGO,
              borderRadius: 8,
              height: 64,
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              paddingHorizontal: 16,
              marginHorizontal: 8,
            }}
          >
            <View>
              <Image source={imagePath} style={{ width: 40, height: 40 }} />
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
          title: "Home",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "home" : "home-outline"}
              color={"#fff"}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: "Explore",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "code-slash" : "code-slash-outline"}
              color={"#fff"}
            />
          ),
        }}
      />
    </Tabs>
  );
}
