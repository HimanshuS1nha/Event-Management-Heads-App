import {
  View,
  Text,
  ImageBackground,
  TextInput,
  Pressable,
  Alert,
} from "react-native";
import React, { useCallback, useState } from "react";
import tw from "twrnc";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { ZodError } from "zod";
import { Entypo } from "@expo/vector-icons";
import { router } from "expo-router";
import * as SecureStore from "expo-secure-store";

import SafeView from "@/components/SafeView";
import { UserType, useUser } from "@/hooks/useUser";
import LoadingModal from "@/components/LoadingModal";
import Title from "@/components/Title";
import { loginValidator } from "@/validators/login-validator";

const Login = () => {
  const { setUser } = useUser();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleChangeText = useCallback(
    (type: "email" | "password", text: string) => {
      if (type === "email") {
        setEmail(text);
      } else if (type === "password") {
        setPassword(text);
      }
    },
    []
  );

  const changePasswordVisibility = useCallback(() => {
    setIsPasswordVisible((prev) => !prev);
  }, [isPasswordVisible]);

  const { mutate: handleLogin, isPending } = useMutation({
    mutationKey: ["login"],
    mutationFn: async () => {
      const parsedData = await loginValidator.parseAsync({
        email,
        password,
      });

      const { data } = await axios.post(
        `${process.env.EXPO_PUBLIC_API_URL}/login/head`,
        {
          ...parsedData,
        }
      );

      return data as { token: string; head: UserType };
    },
    onSuccess: async (data) => {
      await SecureStore.setItemAsync("token", data.token);
      await SecureStore.setItemAsync("user", JSON.stringify(data.head));
      setUser(data.head);
      router.replace("/home");
    },
    onError: (error) => {
      if (error instanceof ZodError) {
        Alert.alert("Error", error.errors[0].message);
      } else if (error instanceof AxiosError && error.response?.data.error) {
        Alert.alert("Error", error.response?.data.error);
      } else {
        Alert.alert("Error", "Some error occured. Please try again later!");
      }
    },
  });
  return (
    <SafeView>
      <LoadingModal isVisible={isPending} />
      <ImageBackground
        source={require("../../assets/images/login-bg.webp")}
        style={tw`flex-1 items-center justify-center gap-y-12`}
      >
        <Title>Login as Head</Title>

        <View style={tw`gap-y-6 w-full items-center`}>
          <View style={tw`gap-y-3 w-[80%]`}>
            <Text style={tw`text-white ml-1.5 font-medium text-base`}>
              Email
            </Text>
            <TextInput
              style={tw`w-full border border-white px-4 py-3 rounded-lg text-white`}
              placeholder="Enter your email"
              placeholderTextColor={"#fff"}
              value={email}
              onChangeText={(text) => handleChangeText("email", text)}
            />
          </View>
          <View style={tw`gap-y-3 w-[80%]`}>
            <Text style={tw`text-white ml-1.5 font-medium text-base`}>
              Password
            </Text>
            <View>
              <TextInput
                style={tw`w-full border border-white px-4 py-3 rounded-lg text-white`}
                placeholder="Enter your password"
                placeholderTextColor={"#fff"}
                value={password}
                onChangeText={(text) => handleChangeText("password", text)}
                secureTextEntry={!isPasswordVisible}
              />
              <Pressable
                style={tw`absolute right-3 top-[30%]`}
                onPress={changePasswordVisibility}
              >
                {isPasswordVisible ? (
                  <Entypo name="eye-with-line" size={24} color="white" />
                ) : (
                  <Entypo name="eye" size={24} color="white" />
                )}
              </Pressable>
            </View>
          </View>
        </View>

        <Pressable
          style={tw`bg-violet-600 w-[80%] items-center py-3 justify-center rounded-lg`}
          onPress={() => handleLogin()}
          disabled={isPending}
        >
          <Text style={tw`text-white text-base font-semibold`}>Login</Text>
        </Pressable>
      </ImageBackground>
    </SafeView>
  );
};

export default Login;
