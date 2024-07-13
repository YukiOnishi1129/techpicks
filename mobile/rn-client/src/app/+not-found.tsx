import { Link, Stack } from "expo-router";

import { Text, View } from "@/components/Themed";

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: "Oops!" }} />
      <View className="flex-1 items-center justify-center">
        <Text className="tet-[20px] font-bold">This screen doesn't exist.</Text>

        <Link href="/" className="mt-[15px] p-[15px] bg-blue-500 rounded-md">
          <Text className="text-[14px] font-bold">Go to home screen!</Text>
        </Link>
      </View>
    </>
  );
}
