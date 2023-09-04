import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TextInput,
  Pressable,
  Modal,
  Image,
  FlatList,
} from "react-native";
import { StatusBar as ExpoStatusBar } from "expo-status-bar";

export default function App() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [goalInput, setGoalInput] = useState("");
  const [goals, setGoals] = useState([]);

  const handleChange = (enteredText) => {
    setGoalInput(enteredText);
  };

  const handleSubmit = () => {
    if (goalInput) {
      setGoals((prevGoals) => [...prevGoals, goalInput]);
      setGoalInput("");
      setIsModalVisible(false);
    }
  };

  const handleDelete = (index) => {
    setGoals((prevGoals) => prevGoals.filter((_, i) => i !== index));
  };

  const handleModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setGoalInput("");
  };

  return (
    <>
      <ExpoStatusBar style="dark" />
      <SafeAreaView style={styles.container}>
        <View style={styles.topContainer}>
          <Text style={styles.title}>Goals App</Text>
          <Pressable
            android_ripple={{ color: "#adbeff" }}
            style={styles.modalButton}
            onPress={handleModal}
          >
            <Text style={styles.buttonText}>ADD GOAL</Text>
          </Pressable>
          <Modal visible={isModalVisible} animationType="slide">
            <View style={styles.modalContent}>
              <Image
                style={styles.image}
                source={require("./assets/images/goal.png")}
              />
              <TextInput
                style={styles.textInput}
                placeholder="Write your Goal Here"
                value={goalInput}
                onChangeText={handleChange}
              />
              <View style={styles.buttonContainer}>
                <Pressable
                  android_ripple={{ color: "#adbeff" }}
                  style={styles.button}
                  onPress={handleSubmit}
                >
                  <Text style={styles.buttonText}>ADD</Text>
                </Pressable>
                <Pressable
                  android_ripple={{ color: "#adbeff" }}
                  style={styles.button}
                  onPress={handleCancel}
                >
                  <Text style={styles.buttonText}>CANCEL</Text>
                </Pressable>
              </View>
            </View>
          </Modal>
        </View>
        <View style={styles.bottomContainer}>
          {goals.length !== 0 ? (
            <FlatList
              data={goals}
              renderItem={({ item, index }) => (
                <Pressable
                  android_ripple={{ color: "#a7b0fc" }}
                  style={styles.task}
                  onPress={() => handleDelete(index)}
                >
                  <Text style={styles.taskText}>{item}</Text>
                </Pressable>
              )}
              keyExtractor={(_, index) => index.toString()}
            />
          ) : (
            <View>
              <Text style={styles.title}>No Goals</Text>
            </View>
          )}
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ebeefc",
    paddingTop: StatusBar.currentHeight,
  },
  topContainer: {
    padding: 30,
    backgroundColor: "#ebeefc",
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    color: "#2e2e2e",
    fontSize: 30,
    fontWeight: "600",
  },
  modalContent: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: 30,
    backgroundColor: "#ebeefc",
  },
  textInput: {
    width: "100%",
    backgroundColor: "#fff",
    color: "#000",
    height: 50,
    paddingHorizontal: 15,
    borderRadius: 8,
    borderColor: "#e9e9e9",
    borderWidth: 2,
  },
  button: {
    width: "47%",
    backgroundColor: "#7993fc",
    height: 50,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  modalButton: {
    width: "100%",
    backgroundColor: "#7993fc",
    height: 50,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    height: 150,
    width: 150,
  },
  buttonText: {
    color: "#f2f2f2",
  },
  bottomContainer: {
    padding: 30,
  },
  task: {
    backgroundColor: "#d4d8fc",
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 8,
    marginBottom: 23,
  },
  taskText: {
    fontSize: 17,
    fontWeight: "400",
  },
  buttonContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
