import { Tabs } from "expo-router";
import React from "react";
import { FontAwesome, Fontisto } from "@expo/vector-icons";

const MainLayout = () => {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#000",
          borderColor: "#6b7280",
        },
      }}
      initialRouteName="home"
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ size, color }) => {
            return <FontAwesome name="home" size={size} color={color} />;
          },
        }}
      />

      <Tabs.Screen
        name="students"
        options={{
          title: "Students",
          tabBarIcon: ({ size, color }) => {
            return <FontAwesome name="users" size={size} color={color} />;
          },
        }}
      />

      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: ({ size, color }) => {
            return (
              <Fontisto name="player-settings" size={size} color={color} />
            );
          },
        }}
      />
    </Tabs>
  );
};

export default MainLayout;
