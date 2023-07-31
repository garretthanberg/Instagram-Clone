import { Image, View, StyleSheet, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { Divider } from "react-native-elements";

export const bottomTabIcons = [
  {
    name: "Home",
    active: "home_active.png",
    inactive: "home_inactive.png",
  },
  {
    name: "Search",
    active: "search_active.png",
    inactive: "search_inactive.png",
  },
  {
    name: "Reels",
    active: "reels_active.png",
    inactive: "reels_inactive.png",
  },
  {
    name: "Shop",
    active: "shop_active.png",
    inactive: "shop_inactive.png",
  },
  {
    name: "Profile",
    active: "garrett.png",
    inactive: "garrett.png",
  },
];

const imageMap = {
  "home_active.png": require("../../assets/home_active.png"),
  "home_inactive.png": require("../../assets/home_inactive.png"),
  "search_active.png": require("../../assets/search_active.png"),
  "search_inactive.png": require("../../assets/search_inactive.png"),
  "reels_active.png": require("../../assets/reels_active.png"),
  "reels_inactive.png": require("../../assets/reels_inactive.png"),
  "shop_active.png": require("../../assets/shop_active.png"),
  "shop_inactive.png": require("../../assets/shop_inactive.png"),
  "garrett.png": require("../../assets/garrett.png"),
};

const BottomTabs = ({ icons }) => {
  const [activeTab, setActiveTab] = useState("Home");

  const Icon = ({ icon }) => (
    <TouchableOpacity onPress={() => setActiveTab(icon.name)}>
      <Image
        source={imageMap[activeTab === icon.name ? icon.active : icon.inactive]}
        style={[
          styles.icon,
          icon.name === "Profile" ? styles.profilePic() : null,
          activeTab === "Profile" && icon.name === activeTab
            ? styles.profilePic(activeTab)
            : null,
        ]}
      />
    </TouchableOpacity>
  );

  return (
    <View style={styles.wrapper}>
      <Divider width={1} orientation="vertical" />
      <View style={styles.container}>
        {icons.map((icon, index) => (
          <Icon key={index} icon={icon} />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    position: "absolute",
    width: "100%",
    bottom: "3%",
    backgroundColor: "#000",
    zIndex: 999,
  },

  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    height: 50,
    paddingTop: 10,
  },

  icon: {
    width: 30,
    height: 30,
  },

  profilePic: (activeTab = "") => ({
    borderRadius: 50,
    borderWidth: activeTab === "Profile" ? 2 : 0,
    borderColor: "#fff",
  }),
});

export default BottomTabs;
