import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, FlatList, ImageBackground } from 'react-native';

export default function App() {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);
  const [editingTaskId, setEditingTaskId] = useState(null);

  const addTask = () => {
    if (task.trim() === '') return;

    if (editingTaskId) {
      
      setTasks(tasks.map(t => (t.id === editingTaskId ? { ...t, text: task } : t)));
      setEditingTaskId(null);
    } else {
     
      setTasks([...tasks, { id: Date.now().toString(), text: task }]);
    }

    setTask('');
  };

  const editTask = (taskId) => {
    const taskToEdit = tasks.find(task => task.id === taskId);
    if (taskToEdit) {
      setTask(taskToEdit.text);
      setEditingTaskId(taskId);
    }
  };

  const removeTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
    setEditingTaskId(null);
  };

  return (
    <ImageBackground
      source={require('./image/todolist.jpg')} 
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Todo List</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Enter task"
            onChangeText={(text) => setTask(text)}
            value={task}
          />
          <Button title={editingTaskId ? 'Update' : 'Add'} onPress={addTask} />
        </View>
        <FlatList
          data={tasks}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.taskContainer}>
              <Text>{item.text}</Text>
              <View style={styles.buttonContainer}>
                <Button title="Edit" onPress={() => editTask(item.id)} />
                <Button title="Remove" onPress={() => removeTask(item.id)} color="red" />
              </View>
            </View>
          )}
        />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', 
  },
  container: {
    flex: 1,
    padding: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 45,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '', 
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    marginRight: 1,
    padding: 5,
    backgroundColor: 'white', 
  },
  taskContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 2,
    padding: 10,
    marginBottom: 9,
    width: '85%',
    backgroundColor: 'rgba(255, 255, 255, 0.8)', 
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
