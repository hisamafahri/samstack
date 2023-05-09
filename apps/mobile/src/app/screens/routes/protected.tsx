import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "@/app/screens/protected/home";
import { ROUTES } from ".";

const Stack = createNativeStackNavigator();

const ProtectedScreens = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name={ROUTES.HOME} component={HomeScreen} />
    </Stack.Navigator>
  );
};

export default ProtectedScreens;
