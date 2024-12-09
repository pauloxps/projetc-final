import React, { useState } from "react";
import { ScrollView, View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";

const AdicionarLocalScreen = () => {
  const router = useRouter();
  const [nome, setNome] = useState("");
  const [cep, setCep] = useState("");
  const [logradouro, setLogradouro] = useState("");
  const [cidade, setCidade] = useState("");
  const [estado, setEstado] = useState("");
  const [numero, setNumero] = useState(""); // Novo campo
  const [bairro, setBairro] = useState(""); // Novo campo

  const handleSubmit = async () => {
    if (!nome || !cep || !logradouro || !cidade || !estado || !numero || !bairro) {
      Alert.alert("Erro", "Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    if (cep.length !== 8 || isNaN(cep)) {
      Alert.alert("Erro", "Digite um CEP válido com 8 dígitos.");
      return;
    }

    try {
      const response = await axios.post("https://api-produtos-9jmi.onrender.com/locations", {
        nome,
        cep,
        logradouro,
        cidade,
        estado,
        numero, // Enviar o número
        bairro, // Enviar o bairro
      });

      if (response.status === 201) {
        Alert.alert("Sucesso", "Local adicionado com sucesso!");
        router.push("/home");
      }
    } catch (error) {
      // Log de erro detalhado
      if (error.response) {
        console.error("Erro na requisição:", error.response.data);
        Alert.alert("Erro", "Ocorreu um erro ao adicionar o local: " + error.response.data.message);
      } else {
        console.error("Erro no servidor:", error.message);
        Alert.alert("Erro", "Ocorreu um erro ao conectar ao servidor.");
      }
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} style={styles.scrollView}>
        <View>
          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Nome</Text>
            <TextInput
              style={styles.input}
              placeholder="Digite o nome do local"
              value={nome}
              onChangeText={setNome}
            />
          </View>

          <View style={styles.fieldContainer}>
            <Text style={styles.label}>CEP</Text>
            <TextInput
              style={styles.input}
              placeholder="Digite o CEP (8 dígitos)"
              value={cep}
              onChangeText={setCep}
              keyboardType="numeric"
              maxLength={8}
            />
          </View>

          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Logradouro</Text>
            <TextInput
              style={styles.input}
              placeholder="Digite o logradouro"
              value={logradouro}
              onChangeText={setLogradouro}
            />
          </View>

          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Cidade</Text>
            <TextInput
              style={styles.input}
              placeholder="Digite a cidade"
              value={cidade}
              onChangeText={setCidade}
            />
          </View>

          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Estado</Text>
            <TextInput
              style={styles.input}
              placeholder="Digite o estado"
              value={estado}
              onChangeText={setEstado}
            />
          </View>

          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Número</Text>
            <TextInput
              style={styles.input}
              placeholder="Digite o número"
              value={numero}
              onChangeText={setNumero}
              keyboardType="numeric"
            />
          </View>

          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Bairro</Text>
            <TextInput
              style={styles.input}
              placeholder="Digite o bairro"
              value={bairro}
              onChangeText={setBairro}
            />
          </View>

          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Salvar Local</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.footerButton} onPress={() => router.push("/")}>
          <Ionicons name="log-out-outline" size={18} color="#333" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerButton} onPress={() => router.push("/home")}>
          <Ionicons name="home-outline" size={18} color="#333" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerButton} onPress={() => router.push("/adicionarLocal")}>
          <Ionicons name="add-circle-outline" size={18} color="#333" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerButton} onPress={() => router.push("/categoria")}>
          <Ionicons name="grid-outline" size={18} color="#333" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollView: { flex: 1 },
  scrollContent: { padding: 20 },
  fieldContainer: { marginBottom: 10 },
  label: { fontSize: 16, fontWeight: "bold" },
  input: { borderWidth: 1, borderColor: "#ddd", padding: 10, borderRadius: 5 },
  button: {
    backgroundColor: "#4CAF50",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: { color: "#fff", fontSize: 16 },
  footer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: "#ddd",
  },
  footerButton: {
    padding: 10,
  },
});

export default AdicionarLocalScreen;
