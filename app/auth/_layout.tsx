import { useAuthenticator } from "@aws-amplify/ui-react-native";
import { Redirect, Slot } from "expo-router";

function AuthLayout() {
  const { authStatus } = useAuthenticator((context) => [context.authStatus]);

  if (authStatus !== "unauthenticated")
    return <Redirect href={"../auth/index"} />;

  console.log(authStatus);
  return <Slot />;
}

export default AuthLayout;
