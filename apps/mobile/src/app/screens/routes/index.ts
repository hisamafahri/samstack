import { NativeStackScreenProps } from "@react-navigation/native-stack";

export enum ROUTES {
  LOGIN = "LOGIN",
  HOME = "HOME",
}

type RootStackParamList = {
  LOGIN: undefined;
  HOME: undefined;
};

export type NavigationProps = NativeStackScreenProps<RootStackParamList>;
