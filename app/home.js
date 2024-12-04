import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";

const ListarProdutosScreen = () => {
  const router = useRouter();
  const [produtos, setProdutos] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchProdutos = async () => {
      try {
        const response = await fetch("https://api-produtos-6p7n.onrender.com/products");
        const data = await response.json();
        setProdutos(data); // Salva os produtos recebidos
      } catch (error) {
        console.error("Erro ao buscar produtos:", error);
        Alert.alert("Erro", "Não foi possível carregar os produtos. Tente novamente.");
      }
    };

    fetchProdutos();
  }, []);

  // Função para filtrar os produtos pela pesquisa
  const filteredProdutos = produtos.filter((produto) =>
    produto.nome.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Buscar Produto"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      {filteredProdutos.length > 0 ? (
        <FlatList
          data={filteredProdutos}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.productItem}>
              <Text style={styles.productName}>{item.nome}</Text>
              <Text style={styles.productPrice}>R$ {item.preco}</Text>
              {item.image && (
                <Image
                  source={{ uri: `https://api-produtos-6p7n.onrender.com/${item.image}` }}
                  style={styles.productImage}
                />
              )}
              <Text style={styles.productDetails}>
                Categoria: {item.Category?.nome || "N/A"}
              </Text>
              <Text style={styles.productDetails}>
                Local: {item.Location?.nome || "N/A"}
              </Text>
            </View>
          )}
        />
      ) : (
        <Text style={styles.noProductsText}>Nenhum produto encontrado.</Text>
      )}

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => router.push("/adicionar-produto")}
      >
        <Text style={styles.addButtonText}>Adicionar Produto</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    marginBottom: 20,
  },
  productItem: {
    marginBottom: 15,
    padding: 10,
    backgroundColor: "#f9f9f9",
    borderRadius: 5,
  },
  productName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  productPrice: {
    fontSize: 16,
    color: "#555",
    marginTop: 5,
  },
  productDetails: {
    fontSize: 14,
    color: "#777",
    marginTop: 5,
  },
  productImage: {
    width: 100,
    height: 100,
    marginTop: 10,
    borderRadius: 5,
  },
  noProductsText: {
    fontSize: 16,
    textAlign: "center",
    marginTop: 20,
    color: "#777",
  },
  addButton: {
    backgroundColor: "#4CAF50",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 20,
  },
  addButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default ListarProdutosScreen;
