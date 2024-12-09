import React, { useState, useEffect } from "react";
import { ScrollView, View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, Image } from "react-native";
import * as ImagePicker from "expo-image-picker"; // Biblioteca para captura de imagens
import { useRouter } from "expo-router";
import RNPickerSelect from 'react-native-picker-select'; // Importa a biblioteca de seleção

const AdicionaProdutoScreen = () => {
  const router = useRouter();
  const [local, setLocal] = useState(""); // Agora 'local' é uma variável de estado
  const [nome, setNome] = useState("");
  const [preco, setPreco] = useState("");
  const [categoria, setCategoria] = useState(""); // Estado para armazenar a categoria selecionada
  const [observacao, setObservacao] = useState("");
  const [image, setImage] = useState(null); // Estado para armazenar a imagem
  const [locais, setLocais] = useState([]); // Estado para armazenar os locais da API
  const [categorias, setCategorias] = useState([]); // Estado para armazenar as categorias da API

  // Função para abrir a câmera e capturar uma foto
  const handleAddPhoto = async () => {
    // Solicita permissões para usar a câmera
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    
    // Se não tiver permissão, mostra um alerta
    if (!permissionResult.granted) {
      Alert.alert("Permissão Necessária", "É necessário permitir o acesso à câmera.");
      return;
    }

    // Lança a câmera para capturar a imagem
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images, // Permite capturar apenas imagens
      quality: 1, // Qualidade da imagem
    });

    // Se a captura não for cancelada, armazena a imagem
    if (!result.canceled) {
      setImage(result.assets[0].uri); // Armazena o URI da imagem capturada
    }
  };

  // Função para enviar os dados para a API
  const handleSubmit = async () => {
    // Validação dos campos obrigatórios
    if (!nome || !preco || !categoria || !local || !image) {
      Alert.alert("Erro", "Por favor, preencha todos os campos obrigatórios e adicione uma foto!");
      return;
    }

    try {
      // Criação do objeto FormData para envio
      const formData = new FormData();
      formData.append("nome", nome); // Nome do produto
      formData.append("preco", preco); // Preço do produto
      formData.append("descricao", observacao); // Observação (opcional)
      formData.append("usuario", "Osvaldo"); // Usuário (pode ser dinâmico dependendo do login)
      formData.append("CategoryId", categoria); // Categoria selecionada (ID)
      formData.append("LocationId", local); // Local selecionado (ID)
      formData.append("image", {
        uri: image,
        name: "image.jpg", // Nome fixo ou dinâmico para a imagem
        type: "image/jpeg", // Tipo de arquivo (deve ser compatível com a API)
      }); // Imagem capturada

      // Enviando o produto para a API
      const response = await fetch("https://api-produtos-9jmi.onrender.com/products", {
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        body: formData,
      });

      // Tratamento da resposta da API
      if (response.ok) {
        Alert.alert("Sucesso", "Produto cadastrado com sucesso!");
        router.push("/home"); // Redireciona para a tela de listagem de produtossss
      } else {
        const error = await response.json();
        console.error("Erro no servidor:", error);
        Alert.alert("Erro", "Não foi possível cadastrar o produto.");
      }
    } catch (error) {
      console.error("Erro ao salvar produto:", error);
      Alert.alert("Erro", "Ocorreu um erro ao salvar o produto.");
    }
  };

  // Função para carregar os locais da API
  const fetchLocais = async () => {
    try {
      const response = await fetch("https://api-produtos-9jmi.onrender.com/locations");
      const data = await response.json();
      const locaisList = data.map((local) => ({
        label: local.nome, // Assume que a API retorna um campo 'nome' para o local
        value: local.id, // Assume que a API retorna um campo 'id' para o local
      }));
      setLocais(locaisList); // Atualiza o estado com os locais
    } catch (error) {
      console.error("Erro ao carregar locais:", error);
      Alert.alert("Erro", "Não foi possível carregar os locais.");
    }
  };

  // Função para carregar as categorias da API
  const fetchCategorias = async () => {
    try {
      const response = await fetch("https://api-produtos-9jmi.onrender.com/categories");
      const data = await response.json();
      const categoriasList = data.map((categoria) => ({
        label: categoria.nome, // Assume que a API retorna um campo 'nome' para a categoria
        value: categoria.id, // Assume que a API retorna um campo 'id' para a categoria
      }));
      setCategorias(categoriasList); // Atualiza o estado com as categorias
    } catch (error) {
      console.error("Erro ao carregar categorias:", error);
      Alert.alert("Erro", "Não foi possível carregar as categorias.");
    }
  };

  // Carregar os locais e categorias assim que o componente for montado
  useEffect(() => {
    fetchLocais();
    fetchCategorias();
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Local</Text>
          <RNPickerSelect
            onValueChange={(value) => setLocal(value)} // Atualiza o local selecionado
            items={locais} // Passa a lista de locais
            value={local} // Valor atual do local
            style={{
              inputIOS: styles.input,
              inputAndroid: styles.input,
            }}
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
          <RNPickerSelect
            onValueChange={(value) => setCategoria(value)} // Atualiza a categoria selecionada
            items={categorias} // Passa a lista de categorias
            value={categoria} // Valor atual da categoria
            style={{
              inputIOS: styles.input,
              inputAndroid: styles.input,
            }}
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
