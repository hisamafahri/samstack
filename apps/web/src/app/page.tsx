"use client";
import { trpc } from "@/utils/trpc";

export default function Home() {
  const authLogin = trpc.auth.login.useMutation();
  const authLogout = trpc.auth.logout.useMutation();

  const userCreate = trpc.user.create.useMutation();
  const userMe = trpc.user.me.useQuery();

  return (
    <main className="text-lg">
      <p>
        {userMe.isLoading || userMe.isFetching
          ? "Calling an API..."
          : userMe.isSuccess
          ? `Login: ${userMe.data.data?.phone}`
          : "No Data"}
      </p>
      <button
        onClick={() =>
          userCreate.mutate({ phone: "08123456789", password: "123456" })
        }
      >
        {userCreate.isLoading ? "Creating..." : "Create New User"}
      </button>
      <br />
      <button
        onClick={() =>
          authLogin.mutate({ phone: "08123456789", password: "123456" })
        }
      >
        {authLogin.isLoading ? "Logging in..." : "Login"}
      </button>
      <br />
      <button onClick={() => authLogout.mutate()}>
        {authLogout.isLoading ? "Logging out..." : "Logout"}
      </button>
    </main>
  );
}
