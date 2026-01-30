import { Picker } from '@react-native-picker/picker';
import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

export default function MathTrapecioScreen() {
  const [B, setB] = React.useState("10");
  const [b, setb] = React.useState("6");
  const [h, seth] = React.useState("4");

  const BN = Number(B || 0);
  const bN = Number(b || 0);
  const hN = Number(h || 0);
  const [shift, setShift] = React.useState("diurna");

  const area = React.useMemo(() => {
    return ((BN + bN) / 2) * hN;
  }, [BN, bN, hN]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Puntaje de admisión</Text>
      

      <View style={styles.card}>
        <Text style={styles.label}>Nota examen (0–1000)</Text>
        <TextInput value={B} onChangeText={setB} keyboardType="numeric" style={styles.input} />

        <Text style={styles.label}>Promedio colegio (0–10)</Text>
        <TextInput value={b} onChangeText={setb} keyboardType="numeric" style={styles.input} />
        <Text style={styles.label}>Tipo de aspirante</Text>
        <Picker selectedValue={shift} onValueChange={(v) => setShift(String(v))}>
          <Picker.Item label="Regular" value="regular" />
          <Picker.Item label="Deportista" value="deportista" />
          <Picker.Item label="Mérito académico" value="merito" />
        </Picker>
      </View>

      <View style={styles.card}>
        <Text style={styles.total}>Normalización del promedio colegio: 100</Text>
        <Text style={styles.total}>Puntaje base: 100</Text>
        <Text style={styles.total}>Bono por tipo: +30</Text>
        <Text style={styles.total}>Puntaje final: 130</Text>
        <Text style={styles.total}>Estado: Aprobado</Text>
        <Text style={styles.muted}>Cambia los valores y observa el resultado.</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#f6f7fb" },
  title: { fontSize: 22, fontWeight: "900" },
  subtitle: { marginTop: 4, color: "#555", fontWeight: "700" },
  card: {
    backgroundColor: "white",
    padding: 14,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,.10)",
    marginTop: 12,
  },
  label: { marginTop: 8, color: "#666", fontWeight: "800" },
  input: {
    marginTop: 6,
    backgroundColor: "#fff",
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,.10)",
  },
  total: { fontWeight: "900", fontSize: 20 },
  muted: { color: "#666", fontWeight: "700", marginTop: 6 },
});