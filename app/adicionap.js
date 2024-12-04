import React, { useState } from "react";
import { ScrollView, View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, Image } from "react-native";
import * as ImagePicker from "expo-image-picker"; // Biblioteca para captura de imagens
import { useRouter } from "expo-router";

const AdicionaProdutoScreen = () => {
  const router = useRouter();
  const [local, setLocal] = useState("");
  const [nome, setNome] = useState("");
  const [preco, setPreco] = useState("");
  const [categoria, setCategoria] = useState("");
  const [observacao, setObservacao] = useState("");
  const [image, setImage] = useState(null); // Estado para armazenar a imagem

  // Função para abrir a câmera e capturar uma foto
  const handleAddPhoto = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert("Permissão Necessária", "É necessário permitir o acesso à câmera.");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri); // Armazena o URI da imagem capturada
    }
  };

  // Função para enviar os dados para a API
  const handleSubmit = async () => {
    if (!local || !nome || !preco || !categoria || !image) {
      Alert.alert("Erro", "Por favor, preencha todos os campos e adicione uma foto!");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("nome", nome);
      formData.append("preco", preco);
      formData.append("categoria", categoria);
      formData.append("local", local);
      formData.append("imagem", {
        uri: image,
        name: "produto.jpg",
        type: "image/jpeg",
      });

      console.log("Dados enviados:", formData);

      const response = await fetch("https://api-produtos-6p7n.onrender.com/products", {
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        body: formData,
      });

      if (response.ok) {
        Alert.alert("Sucesso", "Produto cadastrado com sucesso!");
        router.push("/home"); // Redireciona para a tela de listagem de produtos
      } else {
        const error = await response.json();
        console.log("Erro no servidor:", error);
        Alert.alert("Erro", "Não foi possível cadastrar o produto.");
      }
    } catch (error) {
      console.error("Erro ao salvar produto:", error);
      Alert.alert("Erro", "Ocorreu um erro ao salvar o produto.");
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Local</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite o local"
            value={local}
            onChangeText={setLocal}
          />
        </View>
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Nome</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite o nome"
            value={nome}
            onChangeText={setNome}
          />
        </View>
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Preço</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite o preço"
            value={preco}
            onChangeText={setPreco}
            keyboardType="numeric"
          />
        </View>
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Categoria</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite a categoria"
            value={categoria}
            onChangeText={setCategoria}
          />
        </View>

        {/* Exibição da imagem capturada */}
        {image && (
          <View style={styles.imagePreview}>
            <Image source={{ uri: image }} style={styles.image} />
          </View>
        )}

        <TouchableOpacity style={styles.button} onPress={handleAddPhoto}>
          <Text style={styles.buttonText}>Adicionar Foto</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Salvar Produto</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContent: {
    flexGrow: 1,
    padding: 20,
  },
  fieldContainer: {
    marginBottom: 15,
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
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  imagePreview: {
    marginTop: 15,
    alignItems: "center",
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 10,
  },
});

export default AdicionaProdutoScreen;
