import { Picker } from "@react-native-picker/picker";
import React from "react";
import { Pressable, StyleSheet, Switch, Text, TextInput, View } from "react-native";

export default function MathTotalScreen() {
  const [amount, setAmount] = React.useState("");
  const [qty, setQty] = React.useState("");
  const [scholarship, setScholarship] = React.useState("0");
  const [isPunctual, setIsPunctual] = React.useState(false);
  const [result, setResult] = React.useState({
    subtotal: 0,
    beca: 0,
    puntual: 0,
    total: 0,
  });

  const calculate = () => {
    const a = Number(amount);
    const q = Number(qty);

    if (a <= 0 || q <= 0) {
      setResult({ subtotal: 0, beca: 0, puntual: 0, total: 0 });
      return;
    }

    const subtotal = a * q;
    const beca = subtotal * Number(scholarship);
    const puntual = isPunctual ? (subtotal - beca) * 0.05 : 0;
    const total = subtotal - beca - puntual;

    setResult({ subtotal, beca, puntual, total });
  };

  const money = (n: number) => n.toFixed(2);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Matrícula y beca</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Costo por crédito</Text>
        <TextInput
          value={amount}
          onChangeText={setAmount}
          keyboardType="numeric"
          style={styles.input}
        />

        <Text style={styles.label}>Número de créditos</Text>
        <TextInput
          value={qty}
          onChangeText={setQty}
          keyboardType="numeric"
          style={styles.input}
        />

        <Text style={styles.label}>Nivel de beca</Text>
        <Picker selectedValue={scholarship} onValueChange={setScholarship}>
          <Picker.Item label="Sin beca" value="0" />
          <Picker.Item label="25%" value="0.25" />
          <Picker.Item label="50%" value="0.5" />
        </Picker>

        <Text style={styles.label}>Pago puntual (-5% extra)</Text>
        <Switch value={isPunctual} onValueChange={setIsPunctual} />

        <Pressable style={styles.button} onPress={calculate}>
          <Text style={styles.buttonText}>Calcular total</Text>
        </Pressable>
      </View>

      <View style={styles.card}>
        <Text style={styles.rline}>Subtotal: ${money(result.subtotal)}</Text>
        <Text style={styles.rline}>Beca: -${money(result.beca)}</Text>
        <Text style={styles.rline}>Descuento puntual: -${money(result.puntual)}</Text>
        <Text style={styles.total}>TOTAL: ${money(result.total)}</Text>
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
  rline: { fontWeight: "800", marginTop: 6 },
  total: { fontWeight: "900", marginTop: 10, fontSize: 18 },
});
