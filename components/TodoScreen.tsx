import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
//import AsyncStorage from '@react-native-async-storage/async-storage';

type todoTypes = {id: string; title: string}[];
type editType = null | {id: string; title: string};

const TodoScreen = () => {
  const [toDo, setToDo] = useState<string>('');
  const [addToList, setAddToList] = useState<todoTypes>([]);
  const [editList, setEditList] = useState<editType>(null);

  const handleToDoList = () => {
    setAddToList([...addToList, {id: Date.now().toString(), title: toDo}]);
    setToDo('');
  };

  const handleDelete = (id_catching: string) => {
    const updatedTodos = addToList.filter(ele => ele.id != id_catching);
    setAddToList(updatedTodos);
    //setTodos(updatedTodos);
  };

  const handleEdit = (obj: {id: string; title: string}) => {
    setEditList(obj);
    setToDo(obj.title);
  };
  const handleEditList = () => {
    if (toDo.length == 0) {
      alert('Cannot be empty');
    } else {
      setAddToList(
        addToList.map(todo => {
          if (todo.id === editList.id) {
            return {...todo, title: toDo};
          }
          return todo;
        }),
      );
      setEditList(null);
      setToDo('');
    }
  };

  // useEffect(() => {
  //   // await AsyncStorage.setItem('todos', JSON.stringify(addToList));
  //   getTodos();
  // }, []);
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Text style={styles.HeaderText}>To Do App</Text>
      <TextInput
        style={[styles.InputField]}
        placeholder="Schedule your task to do here..."
        value={toDo}
        onChangeText={e => setToDo(e)}
      />
      {editList != null ? (
        <TouchableOpacity style={styles.ButtonDesign} onPress={handleEditList}>
          <Text style={styles.ButttonText}>SAVE</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.ButtonDesign} onPress={handleToDoList}>
          <Text style={styles.ButttonText}>ADD TO LIST</Text>
        </TouchableOpacity>
      )}

      {addToList.length > 0 ? (
        addToList.map(({id, title}) => (
          <View key={id} style={styles.ListOuter}>
            <Text style={styles.SingleList}>{title}</Text>
            <View style={styles.Buttons}>
              <TouchableOpacity
                style={styles.EditButton}
                onPress={() => {
                  handleEdit({id, title});
                }}>
                <Image
                  style={styles.DeleteAndEditButtonInner}
                  source={{
                    uri: 'https://cdn-icons-png.flaticon.com/512/764/764599.png',
                  }}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleDelete(id)}>
                <Image
                  style={styles.DeleteAndEditButtonInner}
                  source={{
                    uri: 'https://cdn-icons-png.flaticon.com/512/484/484662.png',
                  }}
                />
              </TouchableOpacity>
            </View>
          </View>
        ))
      ) : (
        <Image
          source={{
            uri: 'https://media.istockphoto.com/id/874723624/vector/checklist-on-clip-board-icon-flat-graphic-design.jpg?s=612x612&w=0&k=20&c=tzQwMPU3-aAjkljDPd81SOm3U3ZPOWadA5W1WyWjys0=',
          }}
          style={styles.ImageStyle}
        />
      )}
    </ScrollView>
  );
};

export default TodoScreen;

const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
  HeaderText: {
    fontSize: 40,
    fontWeight: '700',
    marginVertical: 20,
  },
  InputField: {
    borderWidth: 2,
    height: 50,
    borderRadius: 5,
    padding: 10,
    fontSize: 20,
  },
  ButtonDesign: {
    height: 50,
    width: 'auto',
    backgroundColor: '#0b7fab',
    borderRadius: 5,
    marginTop: 20,
    marginBottom: 40,
  },
  ButttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 25,
    marginVertical: 10,
    fontWeight: '700',
  },
  ImageStyle: {
    marginTop: 50,
    height: 400,
    width: 'auto',
  },
  ListOuter: {
    backgroundColor: '#0db4b9',
    paddingTop: 40,
    paddingBottom: 40,
    paddingLeft: 20,
    paddingRight: 20,
    marginTop: 20,
    borderRadius: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  SingleList: {
    fontSize: 20,
    fontWeight: '800',
    color: 'white',
    maxWidth: '75%',
  },
  DeleteAndEditButtonInner: {
    height: 30,
    width: 30,
  },
  Buttons: {
    flexDirection: 'row',
  },
  EditButton: {
    marginRight: 20,
  },
});
