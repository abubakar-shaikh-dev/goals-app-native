import { useState } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  Pressable,
  SafeAreaView,
  Text,
  StatusBar,
  FlatList,
  Modal,
  Image,
} from "react-native";
import { StatusBar as ExpoStatusBar } from "expo-status-bar";

export default function App() {
  const [isModal, setIsModal] = useState(false);
  const [goalInput, setGoalInput] = useState("");
  const [goals, setGoals] = useState([]);

  function handleChange(enteredText) {
    setGoalInput(enteredText);
  }

  function handleSubmit() {
    goalInput &&
      (setGoals((prev) => [...prev, goalInput]),
      setGoalInput(""),
      setIsModal(false));
  }

  function handleDelete(index) {
    setGoals((prev) => prev.filter((item, i) => i !== index));
  }

  function handleModal() {
    setIsModal(true);
  }

  function handleCancel() {
    setIsModal(false);
    setGoalInput("");
  }

  return (
    <>
      <ExpoStatusBar style="dark" />
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: "#ebeefc",
          paddingTop: StatusBar.currentHeight,
        }}
      >
        <View style={styles.container}>
          {/* Top Container Start */}
          <View style={styles.topContainer}>
            <View>
              <Text style={styles.title}>Goals App</Text>
            </View>
            <View>
              <Pressable
                android_ripple={{ color: "#adbeff" }}
                style={styles.ModalButton}
                onPress={handleModal}
              >
                <Text style={styles.buttonText}>ADD GOAL</Text>
              </Pressable>
            </View>
            <Modal visible={isModal} animationType="slide">
              <View style={styles.form}>
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
          {/* Top Container End */}

          {/* Bottom Container Start*/}
          <View style={styles.bottomContainer}>
            {goals.length != 0 ? (
              <FlatList
                data={goals}
                renderItem={(itemData) => {
                  return (
                    <Pressable
                      android_ripple={{ color: "#a7b0fc" }}
                      style={styles.task}
                      onPress={() => handleDelete(itemData.index)}
                    >
                      <Text style={styles.taskText}>{itemData.item}</Text>
                    </Pressable>
                  );
                }}
                keyExtractor={(item, index) => index}
              />
            ) : (
              <View>
                <Text style={styles.title}>No Goals</Text>
              </View>
            )}
          </View>
          {/* Bottom Container End*/}
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
  },
  topContainer: {
    padding: 30,
    gap: 25,
    backgroundColor: "#ebeefc",
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
  },
  title: {
    color: "#2e2e2e",
    fontSize: 30,
    fontWeight: "600",
  },
  form: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 16,
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
  ModalButton: {
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
