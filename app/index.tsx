import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import MenuButton from "../src/components/MenuButton";

export default function MenuScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Admisión U — Campus Express</Text>
      <Text style={styles.subtitle}>Postulantes + cálculos de admisión</Text>

      <View style={{ gap: 12, marginTop: 14 }}>
        <MenuButton
          title="1) Postulantes (API + fotos)"
          onPress={() => router.push("/products")}
        />

        <MenuButton
          title="2) Puntaje de admisión"

          onPress={() => router.push("/math-trapecio")}
        />

        <MenuButton
          title="3) Costo matrícula + beca"
          onPress={() => router.push("/math-total")}
        />
      </View>

      <Text style={styles.note}>
        Alumno: Fernando Castro.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#f6f7fb" },
  title: { fontSize: 24, fontWeight: "900" },
  subtitle: { marginTop: 4, color: "#555", fontWeight: "700" },
  note: { marginTop: 18, color: "#1976d2", fontWeight: "800" },
});