import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  ScrollView,
} from "react-native";

export default function NewsDetails({ route, navigation }) {
  const [dataLoading, finishLoading] = useState(true);
  const [allPostData, setAllPostData] = useState([]);
  const { url } = route.params;
  const selectedPost = allPostData.find((post) => post.url === url);

  useEffect(() => {
    fetch(
      "https://newsapi.org/v2/everything?q=tech&apiKey=ca6f72a0379e45938a5fe4bb0876deba"
    )
      .then((response) => response.json())
      .then((json) => setAllPostData(json.articles))
      .catch((error) => console.error(error))
      .finally(() => finishLoading(false));
  }, []);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.goBack()}
      >
        {dataLoading ? (
          <ActivityIndicator />
        ) : (
          <ScrollView>
            <Text style={styles.title}>{selectedPost.title}</Text>
            <Image
              style={styles.storyImage}
              source={{ uri: selectedPost.urlToImage }}
            />
            <Text style={styles.blurb}>{selectedPost.description}</Text>
            <Text style={styles.content}>{selectedPost.content}</Text>
          </ScrollView>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    padding: 20,
  },
  button: {
    padding: 20,
    alignItems: "flex-start",
    justifyContent: "center",
  },
  buttontext: {
    fontFamily: "OpenSans",
    fontWeight: "bold",
  },
  storyimage: {
    height: 300,
    width: "100%",
  },

  title: {
    padding: 20,
    fontSize: 20,
    fontFamily: "OpenSans",
    fontWeight: "bold",
  },
  blurb: {
    fontFamily: "OpenSans",
    fontStyle: "italic",
    padding: 20,
    fontSize: 14,
  },
  content: {
    flex: 1,
    fontFamily: "OpenSans",
    fontStyle: "italic",
    fontSize: 16,
    paddingTop: 30,
    paddingBttom: 10,
    paddingLeft: 20,
    paddingRight: 20,
  },
});
