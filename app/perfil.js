import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router"; // Para navegação com Expo Router
import { Ionicons } from "@expo/vector-icons"; // Biblioteca de ícones

const ProfileScreen = () => {
  const router = useRouter();

  const handleEditarPerfil = () => {
    // Navega para a tela de edição de perfil
    router.push("/editarPerfil");
  };
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
    router.push('/editarPerfil'); // Navega para a tela home
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
      {/* Parte superior com fundo verde */}
      <View style={styles.header}>
        <Image
          source={require("../assets/imagem/foto.png")} // Substitua pelo caminho da imagem de perfil
          style={styles.profileImage}
        />
        <Text style={styles.userName}>João</Text>
      </View>

      {/* Parte inferior com opções */}
      <View style={styles.body}>
        {/* A opção de Editar Perfil sem estilo de botão */}
        <TouchableOpacity onPress={handleEditarPerfil}>
          <Text style={styles.optionText}>Editar Perfil</Text>
        </TouchableOpacity>

        {/* Outras opções */}
        <TouchableOpacity>
          <Text style={styles.optionText}>Notificações</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.optionText}>Excluir Minha Conta</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.optionText}>Sair</Text>
        </TouchableOpacity>
      </View>

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
  },
  header: {
    flex: 1,
    backgroundColor: "#4CAF50", // Fundo verde
    alignItems: "center",
    justifyContent: "center",
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: "#fff",
    marginBottom: 10,
  },
  userName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
  body: {
    flex: 2,
    backgroundColor: "#f9f9f9", // Cor normal
    padding: 20,
  },
  optionText: {
    fontSize: 18,
    color: "#333",
    paddingVertical: 15, // Adicionando um pouco de espaçamento para cada item
    borderBottomWidth: 1, // Linha separadora
    borderBottomColor: "#ddd", // Cor da linha
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

export default ProfileScreen;
