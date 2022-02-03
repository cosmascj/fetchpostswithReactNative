import React, { useState, useEffect } from "react";
import { Card } from "react-native-shadow-cards";
import { useNavigation } from "@react-navigation/native";
import Dialog from "react-native-dialog";

import {
  Button,
  View,
  Text,
  StyleSheet,
  FlatList,
  ToastAndroid,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from "react-native";
import { TextInput } from "react-native-paper";
import DialogInput from "react-native-dialog/lib/Input";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const HomeScreen = ({ navigation, route }) => {
  const nav = useNavigation();

  const clickHandler = () => {
    //function to handle click on floating Action Button
    alert("Floating Button Clicked");
  };

  const commentScreen = (item) => {
    navigation.navigate("Blog Comments", { item });
  };

  nav.setOptions({
    headerRight: () => {
      return (
        <SafeAreaView>
          <Button title="ADD POSTS" color="#21a3ce" onPress={showDialog} />
          <Dialog.Container visible={visible} statusBarTranslucent>
            <Dialog.Title>ADD NEW POST</Dialog.Title>
            <Dialog.Description>
              Share current trends with friends and Family!
            </Dialog.Description>
            <DialogInput>Enter a title</DialogInput>
            <DialogInput>Type your post</DialogInput>

            <Dialog.Button label="CANCEL" onPress={cancelDialog} />
            <Dialog.Button label="ADD" onPress={addPost} />
          </Dialog.Container>
        </SafeAreaView>
      );
    },
  });

  const [searchInput, setSearchInput] = useState("");
  const [isLoading, setLoading] = useState(true);
  const [post, setPost] = useState([]);
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [visible, setVisible] = useState(false);

  const showDialog = () => {
    setVisible(true);
  };

  const cancelDialog = () => {
    setVisible(false);
  };

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "GET",
      //Request Type
    })
      .then((response) => response.json())
      //If response is in json then in successr
      .then((responseJson) => {
        //Success
        setFilteredDataSource(responseJson);
        setPost(responseJson);
        //  alert(JSON.stringify(responseJson));
        console.log(responseJson);
        //If response is not in json then in error
      })

      .catch((error) => {
        //Error
        alert(JSON.stringify(error));
        console.error(error);
      })

      .finally(() => setLoading(false));
  }, []);

  const searchFilterFunction = (text) => {
    // Check if searched text is not blank
    if (text) {
      // Inserted text is not blank
      // Filter the masterDataSource
      // Update FilteredDataSource
      const newData = post.filter(function (item) {
        const itemData = item.title
          ? item.title.toLowerCase()
          : "".toLowerCase();
        const textData = text.toLowerCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredDataSource(newData);
      setSearchInput(text);
    } else {
      // Inserted text is blank
      // Update FilteredDataSource with masterDataSource
      setFilteredDataSource(post);
      setSearchInput(text);
    }
  };

  const addPost = () => {
    fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      body: JSON.stringify({
        title: "aba",
        body: "bbc",
      }),
    })
      .then((response) => response.json())
      .then((responseData) => {
        console.log(responseData);
        showToast();
        cancelDialog();
      })
      .catch((error) => {
        //Error
        alert(JSON.stringify(error));
        console.error(error);
      })
      .finally(() => setLoading(false));
  };

  function showToast() {
    ToastAndroid.show("Post sent successfully!", ToastAndroid.SHORT);
  }

  return (
    <SafeAreaView style={styles.mainView}>
      <TextInput
        style={styles.inputdesign}
        value={searchInput}
        onChangeText={(text) => searchFilterFunction(text)}
        onClear={(text) => searchFilterFunction("")}
        placeholder={"...Search"}
        placeholderTextColor={"#000000"}
        backgroundColor={"#21a3ce"}
        underlineColorAndroid="transparent"
        style={styles.TextInput}
        left={
          <TextInput.Icon name={"/Users/mac/BlogApp/assets/searchblack.png"} />
        }
      />

      <View style={{ flex: 1, padding: 24 }}>
        {isLoading ? (
          <Text>Loading...</Text>
        ) : (
          <View
            style={{
              flex: 1,
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <FlatList
              style={{ flex: 1, padding: 0, marginRight: -10, marginLeft: -13 }}
              data={filteredDataSource}
              keyExtractor={({ id }, index) => id}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => {
                    commentScreen(item);
                  }}
                >
                  <Card
                    style={{
                      padding: 10,
                      margin: 5,
                      justifyContent: "center",
                      elevation: 8,
                    }}
                  >
                    <Text style={{ fontWeight: "bold" }}>{item.title}</Text>

                    <Text>{item.body}</Text>
                  </Card>
                </TouchableOpacity>
              )}
            />
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
  },
  TextInput: {
    marginTop: 7,
    height: 39,
    width: "90%",
    borderRadius: 10,
    backgroundColor: "#ADA7A7",
  },
  mainPostView: {
    width: "90%",
  },

  postView: {
    color: "green",
  },

  card: {},
  touchableOpacityStyle: {
    position: "absolute",
    width: 50,
    height: 50,
    right: 30,
    bottom: 30,
  },
  floatingButtonStyle: {
    // marginLeft: 190,
    marginTop: 90,
    resizeMode: "contain",
    width: 60,
    height: 60,
    //backgroundColor:'black'
  },

  container: {
    flex: 1,
    backgroundColor: "white",
  },

  inputdesign: {},
});

export default HomeScreen;
