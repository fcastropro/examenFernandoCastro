import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

export default function MathTotalScreen() {
  const [amount, setAmount] = React.useState("25");
  const [qty, setQty] = React.useState("2");
  const [taxPct, setTaxPct] = React.useState("12");     // IVA %
  const [discPct, setDiscPct] = React.useState("10");   // Descuento %

  const a = Number(amount || 0);
  const q = Number(qty || 0);
  const t = Number(taxPct || 0) / 100;
  const d = Number(discPct || 0) / 100;

  const result = React.useMemo(() => {
    const subtotal = a * q;
    const tax = subtotal * t;
    const discount = subtotal * d;
    const total = subtotal + tax - discount;
    return { subtotal, tax, discount, total };
  }, [a, q, t, d]);

  const money = (n: number) => n.toFixed(2);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Matrícula y beca</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Monto unitario</Text>
        <TextInput value={amount} onChangeText={setAmount} keyboardType="numeric" style={styles.input} />

        <Text style={styles.label}>Cantidad</Text>
        <TextInput value={qty} onChangeText={setQty} keyboardType="numeric" style={styles.input} />

        <Text style={styles.label}>IVA (%)</Text>
        <TextInput value={taxPct} onChangeText={setTaxPct} keyboardType="numeric" style={styles.input} />

        <Text style={styles.label}>Descuento (%)</Text>
        <TextInput value={discPct} onChangeText={setDiscPct} keyboardType="numeric" style={styles.input} />
      </View>

      <View style={styles.card}>
        <Text style={styles.rline}>Subtotal:   ${money(result.subtotal)}</Text>
        <Text style={styles.rline}>IVA:        ${money(result.tax)}</Text>
        <Text style={styles.rline}>Descuento:  -${money(result.discount)}</Text>
        <Text style={styles.total}>TOTAL:      ${money(result.total)}</Text>
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
  rline: { fontWeight: "800", marginTop: 6 },
  total: { fontWeight: "900", marginTop: 10, fontSize: 18 },
});