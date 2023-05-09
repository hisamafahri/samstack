import { useAuth } from "@/utils/providers/auth";
import { trpc } from "@/utils/trpc/trpc";
import { Text, SafeAreaView, Button } from "react-native";

const HomeScreen = () => {
  const { logout } = useAuth();
  const userGet = trpc.user.me.useQuery(undefined, {
    refetchOnWindowFocus: false,
  });

  return (
    <SafeAreaView>
      <Text className="text-red-500">
        Logged in: {userGet.data?.data?.phone || "-"}
      </Text>
      <Button title="Logout" onPress={logout} />
    </SafeAreaView>
  );
};

export default HomeScreen;
