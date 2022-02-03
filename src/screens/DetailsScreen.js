import React, { useState, useEffect } from "react";
//import { Card } from "react-native-shadow-cards";
import { useNavigation } from "@react-navigation/native";
import Dialog from "react-native-dialog";
import DialogInput from "react-native-dialog/lib/Input";

// import all the components we are going to use
import {
  SafeAreaView,
  StyleSheet,
  View,
  Button,
  Image,
  FlatList,
  ToastAndroid,
  TouchableOpacity,
  Text,
} from "react-native";
import { Card } from "react-native-shadow-cards";

const DetailsScreen = ({ route, navigation }) => {
  const [isLoading, setLoading] = useState(true);
  const [post, setPost] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [visible, setVisible] = useState(false);

  const nav = useNavigation();

  const { item } = route.params;

  const itemId = item.id;

  nav.setOptions({
    headerRight: () => {
      return (
        <SafeAreaView>
          <Button title="ADD COMMENTS" color="#21a3ce" onPress={showDialog} />
          <Dialog.Container visible={visible} statusBarTranslucent>
            <Dialog.Title>POST COMMENTS</Dialog.Title>
            <Dialog.Description>
              Share current trends with friends and Family!
            </Dialog.Description>
            <DialogInput>Enter a title</DialogInput>

            <DialogInput>Add comments</DialogInput>

            <Dialog.Button label="CANCEL" onPress={cancelDialog} />
            <Dialog.Button label="ADD" onPress={addComments} />
          </Dialog.Container>
        </SafeAreaView>
      );
    },
  });

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/posts/${itemId}/comments`, {
      method: "GET",
      //Request Type
    })
      .then((response) => response.json())
      //If response is in json then in successr
      .then((responseJson) => {
        //Success
        setFilteredDataSource(responseJson);
        setPost(responseJson);
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

  const addComments = () => {
    fetch("https://jsonplaceholder.typicode.com/posts/comments", {
      method: "POST",
      body: JSON.stringify({
        title: "aba",
        body: "bbc",
      }),
    })
      .then((response) => response.json())
      .then((responseData) => {
        console.log(responseData);
        showCommentToast();
        cancelDialog();
      })
      .catch((error) => {
        //Error
        alert(JSON.stringify(error));
        console.error(error);
      })
      .finally(() => setLoading(false));
  };

  function showCommentToast() {
    ToastAndroid.show("Comment sent successfully!", ToastAndroid.SHORT);
  }

  const showDialog = () => {
    setVisible(true);
  };

  const cancelDialog = () => {
    setVisible(false);
  };

  const clickHandlerFab = () => {
    //function to handle click on floating Action Button
    ToastAndroid.show(
      " Please use the menu options to add your comments!",
      ToastAndroid.SHORT
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flex: 1, padding: 24 }}>
        {isLoading ? (
          <Text>Loading...</Text>
        ) : (
          <Card
            style={{
              flex: 1,
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <FlatList
              style={{
                flex: 1,
                padding: 0,
                marginRight: -2,
                marginLeft: -5,
                marginBottom: 20,
              }}
              data={post}
              keyExtractor={({ id }, index) => id}
              renderItem={({ item }) => (
                <View
                  style={{
                    padding: 10,
                    margin: 5,
                    justifyContent: "center",
                    elevation: 8,
                  }}
                >
                  <Text style={{ fontWeight: "bold" }}>{item.name}</Text>

                  <Text>{item.body}</Text>
                </View>
              )}
            />
          </Card>
        )}
      </View>

      <View style={styles.container}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={clickHandlerFab}
          style={styles.touchableOpacityStyle}
        >
          <Image
            //We are making FAB using TouchableOpacity with an image
            //We are using online image here
            source={require("/Users/mac/BlogApp/icons8-comment-58.png")}
            style={styles.floatingButtonStyle}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default DetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 1,
    marginLeft: -4,
  },
  titleStyle: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    padding: 10,
  },
  textStyle: {
    fontSize: 16,
    textAlign: "center",
    padding: 10,
  },
  touchableOpacityStyle: {
    position: "absolute",
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    right: 30,
    bottom: 30,
  },
  floatingButtonStyle: {
    resizeMode: "contain",
    width: 40,
    height: 40,
    marginRight: -40,

    //backgroundColor:'black'
  },
});
