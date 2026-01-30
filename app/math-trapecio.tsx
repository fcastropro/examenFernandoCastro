import { Picker } from "@react-native-picker/picker";
import React from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

export default function PuntajeAdmisionScreen() {
  const [exam, setExam] = React.useState("");
  const [avg, setAvg] = React.useState("");
  const [type, setType] = React.useState("regular");
  const [result, setResult] = React.useState({
    final: 0,
    status: "",
  });

  const calculate = () => {
    const examN = Number(exam);
    const avgN = Number(avg);

    if (
      examN < 0 ||
      examN > 1000 ||
      avgN < 0 ||
      avgN > 10 ||
      isNaN(examN) ||
      isNaN(avgN)
    ) {
      setResult({ final: 0, status: "" });
      return;
    }

    const prom1000 = (avgN / 10) * 1000;
    const base = examN * 0.7 + prom1000 * 0.3;

    let bonus = 0;
    if (type === "deportista") bonus = 30;
    if (type === "merito") bonus = 50;

    const finalScore = base + bonus;
    const status = finalScore >= 750 ? "APTO" : "NO APTO";

    setResult({ final: finalScore, status });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Puntaje de admisión</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Nota examen (0–1000)</Text>
        <TextInput
          value={exam}
          onChangeText={setExam}
          keyboardType="numeric"
          style={styles.input}
        />

        <Text style={styles.label}>Promedio colegio (0–10)</Text>
        <TextInput
          value={avg}
          onChangeText={setAvg}
          keyboardType="numeric"
          style={styles.input}
        />

        <Text style={styles.label}>Tipo de aspirante</Text>
        <Picker selectedValue={type} onValueChange={setType}>
          <Picker.Item label="Regular" value="regular" />
          <Picker.Item label="Deportista" value="deportista" />
          <Picker.Item label="Mérito académico" value="merito" />
        </Picker>

        <Pressable style={styles.button} onPress={calculate}>
          <Text style={styles.buttonText}>Calcular</Text>
        </Pressable>
      </View>

      <View style={styles.card}>
        <Text style={styles.total}>
          Puntaje final: {result.final.toFixed(2)}
        </Text>
        <Text
          style={[
            styles.status,
            { color: result.status === "APTO" ? "green" : "red" },
          ]}
        >
          Estado: {result.status}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#f6f7fb" },
  title: { fontSize: 22, fontWeight: "900" },
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
  button: {
    marginTop: 14,
    backgroundColor: "#4f46e5",
    padding: 12,
    borderRadius: 12,
    alignItems: "center",
  },
  buttonText: { color: "white", fontWeight: "900" },
  total: { fontWeight: "900", fontSize: 20 },
  status: { marginTop: 6, fontWeight: "900", fontSize: 18 },
});
