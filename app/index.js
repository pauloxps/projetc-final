import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from "react-native";
import { useRouter } from "expo-router";

const LoginScreen = () => {
  const [email, setEmail] = useState(""); // Estado para armazenar o e-mail
  const [senha, setSenha] = useState(""); // Estado para armazenar a senha
  const router = useRouter(); // Inicializa o useRouter para navegação

  const handleLogin = () => {
    // Realiza a autenticação com a API
    fetch("https://dummyjson.com/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: email, // Passa o e-mail como 'username'
        password: senha, // Passa a senha
        expiresInMins: 30, // Token válido por 30 minutos
      }),
      credentials: "include", // Inclui cookies (ex: accessToken)
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.accessToken) {
          // Se o login for bem-sucedido, redireciona para a tela principal
          console.log("Login bem-sucedido. Token:", data.accessToken);
          // Armazenar o token ou utilizar conforme necessário
          router.push("/home"); // Redireciona para a tela de Home
        } else {
          // Se as credenciais forem inválidas, exibe um erro
          alert("Credenciais inválidas. Tente novamente.");
        }
      })
      .catch((error) => {
        console.error("Erro de login:", error);
        alert("Ocorreu um erro. Tente novamente.");
      });
  };

  const handleCadastro = () => {
    router.push("/cadastro"); // Navega para a tela de cadastro
  };

  return (
    <View style={styles.background}>
      <View style={styles.overlay}>
        <View style={styles.container}>
          {/* Imagem circular */}
          <Image
            source={require("../assets/imagem/logoe.png")} // Caminho correto para a imagem
            style={styles.circleImage}
          />

          <Text style={styles.title}>Bem-vindo!</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite seu e-mail"
            placeholderTextColor="#aaa"
            value={email}
            onChangeText={setEmail} // Atualiza o estado do e-mail
          />
          <TextInput
            style={styles.input}
            placeholder="Digite sua senha"
            placeholderTextColor="#aaa"
            secureTextEntry
            value={senha}
            onChangeText={setSenha} // Atualiza o estado da senha
          />
          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Entrar</Text>
          </TouchableOpacity>

          {/* Botão para ir à página de cadastro */}
          <TouchableOpacity style={styles.registerButton} onPress={handleCadastro}>
            <Text style={styles.registerButtonText}>Cadastrar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
    backgroundColor: "#f0f0f0", // Cor de fundo clara
    justifyContent: "center", // Garante que o conteúdo seja centralizado
  },
  overlay: {
    flex: 1,
    justifyContent: "center", // Centraliza os itens dentro da View
    alignItems: "center", // Alinha os itens horizontalmente
  },
  container: {
    width: "90%",
    backgroundColor: "rgba(255, 255, 255, 0.8)", // Fundo branco com leve transparência
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    justifyContent: "center", // Garante que o conteúdo dentro do container também seja centralizado
  },
  circleImage: {
    width: 100, // Tamanho da imagem
    height: 100, // Tamanho da imagem
    borderRadius: 50, // Tornando a imagem circular
    marginBottom: 20, // Espaço entre a imagem e o título
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  input: {
    width: "100%",
    height: 50,
    backgroundColor: "#fff",
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  button: {
    width: "100%",
    height: 50,
    backgroundColor: "#4CAF50",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  registerButton: {
    marginTop: 15,
    width: "100%",
    height: 50,
    backgroundColor: "#007BFF", // Cor para o botão de cadastro
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  registerButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default LoginScreen;
