import { Tabs } from "expo-router"

const TabsLayout = () => {
  return (
    <Tabs>
        <Tabs.Screen name="index" options={{
            headerTitle: "Home",
            title: "Home",
            tabBarActiveBackgroundColor: 'lightblue',
        }}/>
        <Tabs.Screen name="profile/[id]" options={{
            headerTitle: "Profile",
            title: "Profile",
            tabBarActiveBackgroundColor: 'lightblue',
        }}/>
    </Tabs>
  );
};

export default TabsLayout