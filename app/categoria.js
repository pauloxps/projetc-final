import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import Ionicons from "react-native-vector-icons/Ionicons"; // Importando os ícones corretamente

const AdicionarCategoriaScreen = () => {
  const [nome, setNome] = useState(""); // Estado para o nome da categoria
  const router = useRouter();

  // Função para salvar a categoria
  const handleSave = async () => {
    if (!nome.trim()) {  // Verificando se o nome está vazio ou só contém espaços
      Alert.alert("Erro", "Por favor, preencha o nome da categoria!");
      return;
    }

    try {
      // Enviando requisição POST para a API de categorias
      const response = await fetch("https://api-produtos-9jmi.onrender.com/categories/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nome }), // Envia o nome da categoria
      });

      // Verificar se a resposta da API foi bem-sucedida
      if (!response.ok) {
        const errorText = await response.text();  // Captura a resposta como texto
        console.error("Erro na resposta da API:", errorText);
        throw new Error("Erro ao adicionar categoria.");
      }

      const data = await response.json();  // Faz o parse da resposta JSON
      console.log("Resposta da API:", data); // Verifique o que a API retornou

      Alert.alert("Sucesso", "Categoria adicionada com sucesso!");
      router.push("/home"); // Navega para a página inicial
    } catch (error) {
      console.error("Erro ao adicionar categoria:", error);
      Alert.alert("Erro", error.message || "Ocorreu um erro ao adicionar a categoria.");
    }
  };

  // Funções para navegação entre telas
  const handleahome = () => {
    router.push("/home"); // Navega para a tela home
  };

  const handleaProduto = () => {
    router.push("/adicionap"); // Navega para a tela de adicionar produto
  };

  const handleacategoria = () => {
    router.push("/categoria"); // Navega para a tela de adicionar categoria
  };

  const handlealocal = () => {
    router.push("/adicionarLocal"); // Navega para a tela de adicionar local
  };

  const handleaPerfil = () => {
    router.push("/perfil"); // Navega para a tela de editar perfil
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Adicionar Categoria</Text>

      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Nome da Categoria</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite o nome da categoria"
          value={nome}
          onChangeText={setNome}
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Salvar</Text>
      </TouchableOpacity>

      {/* Barra de Navegação no Footer */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.footerButton} onPress={() => router.push("/")}>
          <Ionicons name="log-out-outline" size={18} color="#333" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerButton} onPress={handleahome}>
          <Ionicons name="home-outline" size={18} color="#333" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerButton} onPress={handleaProduto}>
          <Ionicons name="add-circle-outline" size={18} color="#333" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerButton} onPress={handleacategoria}>
          <Ionicons name="grid-outline" size={18} color="#333" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerButton} onPress={handlealocal}>
          <Ionicons name="map-outline" size={18} color="#333" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerButton} onPress={handleaPerfil}>
          <Ionicons name="person-circle-outline" size={18} color="#333" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
  },
  fieldContainer: {
    width: "100%",
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  input: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    fontSize: 16,
    backgroundColor: "#f9f9f9",
  },
  button: {
    backgroundColor: "#4CAF50",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 20,
    width: "100%",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: "#ddd",
    position: "absolute",
    bottom: 0,
    width: "100%",
  },
  footerButton: {
    alignItems: "center",
    padding: 10,
  },
});

export default AdicionarCategoriaScreen;
