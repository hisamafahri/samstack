import { TRPCProvider } from "@/utils/trpc/trpc";
import { NavigationContainer } from "@react-navigation/native";
import ProtectedScreens from "@/app/screens/routes/protected";
import UnprotectedScreens from "@/app/screens/routes/unprotected";
import AuthProvider, { useAuth } from "@/utils/providers/auth";
import { ActivityIndicator, SafeAreaView } from "react-native";

const App = () => {
  return (
    <NavigationContainer>
      <TRPCProvider>
        <AuthProvider>
          <Navigation />
        </AuthProvider>
      </TRPCProvider>
    </NavigationContainer>
  );
};

const Navigation = () => {
  const { state } = useAuth();

  return state === "loading" ? (
    <SafeAreaView className="flex items-center justify-center h-full">
      <ActivityIndicator />
    </SafeAreaView>
  ) : state === "authenticated" ? (
    <ProtectedScreens />
  ) : (
    <UnprotectedScreens />
  );
};

export default App;
