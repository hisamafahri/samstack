import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "@/app/screens/unprotected/login";
import { ROUTES } from "@/app/screens/routes";

const Stack = createNativeStackNavigator();

const UnprotectedScreens = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name={ROUTES.LOGIN} component={LoginScreen} />
    </Stack.Navigator>
  );
};

export default UnprotectedScreens;
