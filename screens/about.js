import React from "react";
import { View, Text, StyleSheet, Linking } from "react-native";
import { Button, ButtonText } from "@gluestack-ui/themed";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";

const About = () => {
  const navigation = useNavigation();
  const { nim, nama } = useSelector((state) => state.profile);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>About</Text>
      <Text style={styles.title}>About This Application</Text>
      <Text style={styles.content}>
        Aplikasi ini dirancang sebagai studi kasus untuk pembelajaran mata
        kuliah Pemrograman Mobile Program Studi Informatika Institut Teknologi
        Telkom Surabaya
      </Text>
      <Text style={styles.heading}>Profile</Text>
      <Text style={styles.title}>Nama : {nama}</Text>
      <Text style={styles.title}>NIM : {nim}</Text>

      {/* <Button style={{ marginTop: 15 }} title="Clear Data" onPress={() => handleClearData()}></Button> */}
      <Button
        onPress={() => {
          navigation.navigate("Profile");
        }}
      >
        <ButtonText>Ubah Profile</ButtonText>
      </Button>
      <Text
        style={{ marginBottom: 5 }}
        onPress={() =>
          Linking.openURL(
            "https://www.freepik.com/icon/task-list_9329651#fromView=search&term=todo+list&page=1&position=1&track=ais"
          ).catch((err) => console.error("Error", err))
        }
      >
        Splash Icon by Azland Studio (Freepik)
      </Text>
      <Text
        style={{ marginBottom: 15 }}
        onPress={() =>
          Linking.openURL("https://github.com/IrvanSN").catch((err) =>
            console.error("Error", err)
          )
        }
      >
        Developed by Irvan Surya Nugraha
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 20,
    paddingRight: 20,
    marginTop: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  heading: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 7,
    color: "blue",
  },
  content: {
    fontSize: 18,
    marginBottom: 20,
  },
});

export default About;
