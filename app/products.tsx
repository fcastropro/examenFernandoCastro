import React from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import { getProducts } from "../src/api/productsApi";
import PaginationBar from "../src/components/PaginationBar";
import ProductItem from "../src/components/ProductItem";
import type { Product } from "../src/types/product";

export default function ProductsScreen() {
  const [items, setItems] = React.useState<Product[]>([]);
  const [count, setCount] = React.useState(0);

  const [page, setPage] = React.useState(1);
  const [pageSize] = React.useState(5);

  const [search, setSearch] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const load = React.useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await getProducts({
        page,
        pageSize,
        search: search.trim() || undefined,
      });
      setItems(data.results);
      setCount(data.count);
    } catch (e) {
      console.log(e);
      setError("No se pudo cargar productos. Revisa internet / API.");
    } finally {
      setLoading(false);
    }
  }, [page, pageSize, search]);

  React.useEffect(() => {
    load();
  }, [load]);

  const onPrev = () => setPage((p) => Math.max(1, p - 1));
  const onNext = () => setPage((p) => p + 1);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de postulantes</Text>
      <Text style={styles.subtitle}>
        /aspirantes/?page={page}&page_size={pageSize}
      </Text>

      <TextInput
        value={search}
        onChangeText={(t) => {
          setSearch(t);
          setPage(1);
        }}
        placeholder="Buscar (opcional)"
        style={styles.input}
      />

      {loading ? (
        <View style={{ paddingVertical: 30 }}>
          <ActivityIndicator />
        </View>
      ) : error ? (
        <Text style={styles.error}>{error}</Text>
      ) : (
        <>
          <FlatList
            data={items}
            keyExtractor={(p) => String(p.id)}
            contentContainerStyle={{ gap: 12 }}
            renderItem={({ item }) => (
              <ProductItem item={item} onPress={() => {}} />
            )}
            ListEmptyComponent={
              <Text style={styles.muted}>No hay productos para mostrar.</Text>
            }
          />

          <PaginationBar
            page={page}
            pageSize={pageSize}
            count={count}
            onPrev={onPrev}
            onNext={onNext}
          />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#f6f7fb" },
  title: { fontSize: 22, fontWeight: "900" },
  subtitle: { marginTop: 4, color: "#555", fontWeight: "700" },
  input: {
    marginTop: 12,
    marginBottom: 12,
    backgroundColor: "white",
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,.10)",
  },
  error: { color: "#c62828", fontWeight: "800", marginTop: 12 },
  muted: { color: "#666", fontWeight: "700", paddingVertical: 14 },
});