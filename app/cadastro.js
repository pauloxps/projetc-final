import React, { useState } from "react";
import { ScrollView, View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons"; // Biblioteca de ícones


const CadastroScreen = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [nomeCompleto, setNomeCompleto] = useState("");
  const [usuario, setUsuario] = useState("");

  const handleSubmit = () => {
    if (!email || !senha || !nomeCompleto || !usuario) {
      Alert.alert("Erro", "Por favor, preencha todos os campos!");
      return;
    }

    // Aqui você pode processar os dados do formulário de cadastro
    Alert.alert("Sucesso", "Cadastro realizado com sucesso!");
    router.push("/home"); // Navega para a página inicial após o cadastro
  };

  const handleahome = () => {
    // Aqui você pode adicionar validações de login, se necessário
    // Depois que o login for bem-sucedido, você pode navegar para a home
    router.push('/home'); // Navega para a tela home
  };

  const handlealocal = () => {
    // Aqui você pode adicionar validações de login, se necessário
    // Depois que o login for bem-sucedido, você pode navegar para a home
    router.push('/adicionarLocal'); // Navega para a tela home
  };

  const handleaPerfil = () => {
    // Aqui você pode adicionar validações de login, se necessário
    // Depois que o login for bem-sucedido, você pode navegar para a home
    router.push('/perfil'); // Navega para a tela home
  };

  const handleaProduto = () => {
    // Aqui você pode adicionar validações de login, se necessário
    // Depois que o login for bem-sucedido, você pode navegar para a home
    router.push('/adicionap'); // Navega para a tela home
  };
  const handleacategoria = () => {
    // Aqui você pode adicionar validações de login, se necessário
    // Depois que o login for bem-sucedido, você pode navegar para a home
    router.push('/categoria'); // Navega para a tela home
  };



  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View>
          <View style={styles.fieldContainer}>
            <Text style={styles.label}>E-mail</Text>
            <TextInput
              style={styles.input}
              placeholder="Digite o e-mail"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
            />
          </View>

          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Senha</Text>
            <TextInput
              style={styles.input}
              placeholder="Digite a senha"
              value={senha}
              onChangeText={setSenha}
              secureTextEntry
            />
          </View>

          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Nome Completo</Text>
            <TextInput
              style={styles.input}
              placeholder="Digite o nome completo"
              value={nomeCompleto}
              onChangeText={setNomeCompleto}
            />
          </View>

          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Usuário</Text>
            <TextInput
              style={styles.input}
              placeholder="Digite o nome de usuário"
              value={usuario}
              onChangeText={setUsuario}
            />
          </View>

          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Salvar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

       {/* Barra de Navegação no Footer */}
       <View style={styles.footer}>
       <TouchableOpacity
    style={styles.footerButton}
    onPress={() => router.push("/")} // Navega para a tela inicial
  >
          <Ionicons name="log-out-outline" size={18} color="#333" />
          <Text style={styles.footerText}></Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerButton} onPress={handleahome}>
            <Ionicons name="home-outline" size={18} color="#333" />
            <Text style={styles.footerText}></Text>
          </TouchableOpacity>

        <TouchableOpacity style={styles.footerButton} onPress={handleaProduto}>
          <Ionicons name="add-circle-outline" size={18} color="#333" />
          <Text style={styles.footerText}></Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerButton} onPress={handleacategoria}>
          <Ionicons name="grid-outline" size={18} color="#333" />
        <Text style={styles.footerText}></Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.footerButton} onPress={handlealocal}>
          <Ionicons name="map-outline" size={18} color="#333" />
          <Text style={styles.footerText}></Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerButton} onPress={handleaPerfil}>
        <Ionicons name="person-circle-outline" size={18} color="#333" />
        <Text style={styles.footerText}></Text>
      </TouchableOpacity>
    


      </View>
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
  navBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#fff",
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: "#ddd",
    position: "absolute",
    bottom: 0,
    width: "100%",
  },
  navItem: {
    fontSize: 14,
    color: "#333",
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
  footerText: {
    fontSize: 14,
    color: "#333",
    marginTop: 5,
  },
});

export default CadastroScreen;
