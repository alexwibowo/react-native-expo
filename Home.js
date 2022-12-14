import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  FlatList,
  Image,
  TouchableWithoutFeedback,
} from "react-native";

// since homepage is added to navigation, it has access to navigatin prop
export default function Homepage({ navigation }) {
  const [dataLoading, finishLoading] = useState(true);
  const [newsData, setData] = useState([]);

  // combination of componentDidMount, componentDidUpdate, componentWillUnmount lifecycles
  // empty array to indicate that it should just run once, and will never update after we get them
  useEffect(() => {
    fetch(
      "https://newsapi.org/v2/everything?q=tech&apiKey=ca6f72a0379e45938a5fe4bb0876deba"
    )
      .then((response) => response.json())
      .then((json) => setData(json.articles))
      .catch((error) => console.error(error))
      .finally(() => finishLoading(false));
  }, []);

  // this is like cell renderer, used  in FlatList
  const storyItem = ({ item }) => {
    return (
      <TouchableWithoutFeedback
        onPress={() => {
          navigation.navigate("NewsDetail", { url: item.url });
        }}
      >
        <View style={styles.listings}>
          <Text style={styles.title}>{item.title}</Text>
          <Image style={styles.thumbnail} source={{ uri: item.urlToImage }} />
          <Text style={styles.blurb}>{item.description}</Text>
        </View>
      </TouchableWithoutFeedback>
    );
  };

  return (
    <View style={styles.container}>
      {dataLoading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={newsData}
          renderItem={storyItem}
          keyExtractor={(item) => item.url}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    padding: 20,
  },
  thumbnail: {
    height: 100,

    width: "98%",
  },
  listings: {
    paddingTop: 15,
    paddingBottom: 25,
    borderBottomColor: "black",
    borderBottomWidth: 1,
  },
  title: {
    paddingBottom: 10,
    fontFamily: "OpenSans",
    fontWeight: "bold",
  },
  blurb: {
    fontFamily: "OpenSans",
    fontStyle: "italic",
  },
});
