import { SafeAreaView, Button } from "react-native";
import { useAuth } from "@/utils/providers/auth";

const LoginScreen = () => {
  const { login } = useAuth();

  return (
    <SafeAreaView>
      <Button
        title="Login"
        onPress={() => login({ phone: "08123456789", password: "123456" })}
      />
    </SafeAreaView>
  );
};

export default LoginScreen;
