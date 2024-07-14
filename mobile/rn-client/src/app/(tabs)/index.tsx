import EditScreenInfo from "@/components/EditScreenInfo";
import { Text, View } from "@/components/Themed";
import { Input } from "@/components/ui/input";
import React from "react";

export default function TabOneScreen() {
  return (
    <View className="flex-1 items-center justify-center">
      <Text className="text-[20px] font-bold">Tab One</Text>
      <View
        className="my-[30px] w-[80%] h-[1px]"
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <Input
        placeholder="Write some stuff"
        aria-labelledby="inputLabel"
        aria-errormessage="This is an error message"
      />
      <Text>{"text"}</Text>
      <EditScreenInfo path="app/(tabs)/index.tsx" />
    </View>
  );
}
