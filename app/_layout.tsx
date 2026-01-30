import { Stack } from "expo-router";
import React from "react";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Menú" }} />
      <Stack.Screen name="products" options={{ title: "Aspirantes" }} />
      <Stack.Screen name="math-trapecio" options={{ title: "Puntaje de admisión" }} />
      <Stack.Screen name="math-total" options={{ title: "Matrícula y beca" }} />
    </Stack>
  );
}