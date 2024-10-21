import { Tabs } from "expo-router"

const TabsLayout = () => {
  return (
    <Tabs>
        <Tabs.Screen name="index" options={{
            headerTitle: "Hello Jimbo",
            title: "Home",
            tabBarActiveBackgroundColor: 'lightblue',
        }}/>
        <Tabs.Screen name="newStock/newStock" options={{
            headerTitle: "Add Stock",
            title: "Add Stock",
            tabBarActiveBackgroundColor: 'lightblue',
        }} />
        <Tabs.Screen name="profile/[id]" options={{
            headerTitle: "Profile",
            title: "Profile",
            tabBarActiveBackgroundColor: 'lightblue',
        }}/>
    </Tabs>
  );
};

export default TabsLayout