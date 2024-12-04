import { Stack } from "expo-router";

const RootLayout = () => {
  return (
    <Stack>
      {/* Configurando a tela inicial (index) */}
      <Stack.Screen name="index"></Stack.Screen>
    </Stack>
  );
};

export default RootLayout;
