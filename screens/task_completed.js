import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import {
  deleteTask,
  fetchTasks,
  storeTask,
  updateTask,
} from "../redux/taskSlice";

const TaskCompletedScreen = () => {
  // Menggunakan useDispatch hook untuk memanggil fungsi
  const dispatch = useDispatch();
  // Menggunakan useSelector hook untuk mengambil data
  const { nim, nama } = useSelector((state) => state.profile);
  const { data, loading } = useSelector((state) => state.task);

  // Jika halaman di load maka jalankan fungsi ini
  useEffect(() => {
    console.log("ref");
    dispatch(fetchTasks({ nim, isComplete: "1" }));
  }, []);

  // Fungsi untuk menangani ketika menghapus task
  const handleDeleteTask = async (item, index) => {
    dispatch(deleteTask({ id: item.id, nim, completed: true }));
  };

  // Fungsi untuk menangani ketika status task dirubah
  const handleStatusChange = async (item, index) => {
    dispatch(
      updateTask({
        id: item.id,
        title: item.title,
        nim,
        isComplete: false,
        completed: true,
      })
    );
  };

  // Componen untuk merender setiap task
  const renderItem = ({ item, index }) => (
    <View style={styles.task}>
      <Text style={styles.itemList}>{item.title}</Text>
      <View style={styles.taskButtons}>
        <TouchableOpacity onPress={() => handleDeleteTask(item, index)}>
          <Text style={styles.deleteButton}>Delete</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleStatusChange(item, index)}>
          <Text style={styles.statusButton}>Undone</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.itemBorder}></View>
    </View>
  );

  // Ketika state loading true maka tampilkan komponen loading
  if (loading) {
    return <ActivityIndicator size="large" style={styles.loader} />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Completed Task</Text>
      <Text style={styles.title}>Selamat Datang {nama}!</Text>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
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
    color: "green",
  },
  input: {
    borderWidth: 3,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 10,
    borderRadius: 10,
    fontSize: 18,
  },
  addButton: {
    backgroundColor: "green",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  addButtonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 18,
  },
  task: {
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
    fontSize: 18,
  },
  itemList: {
    fontSize: 19,
  },
  itemBorder: {
    borderWidth: 0.5,
    borderColor: "#cccccc",
  },
  taskButtons: {
    flexDirection: "row",
  },
  editButton: {
    marginRight: 10,
    color: "green",
    fontWeight: "bold",
    fontSize: 18,
  },
  deleteButton: {
    color: "red",
    fontWeight: "bold",
    fontSize: 18,
  },
  statusButton: {
    marginLeft: 10,
    color: "blue",
    fontWeight: "bold",
    fontSize: 18,
  },
  loader: {
    marginTop: "auto",
    marginBottom: "auto",
  },
});

export default TaskCompletedScreen;
