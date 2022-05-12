import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  FlatList,
  ImageBackground,
  StyleSheet,
  Text,
  Button,
  StatusBar,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
const Stack = createNativeStackNavigator();
const Grid = () => {
  const navigation = useNavigation();
  const [data, setData] = useState(null);
  const [selectedId, setSelectedId] = useState(null);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    await fetch("https://dummyjson.com/users")
      .then((res) => res.json())
      .then((res) => setData(res.users))
      .catch((err) => console.log(err));
  };

  const Item = (user) => {
    const id = user.data.id;
    return (
      <View style={styles.item}>
        <Button
          title="Naviagte user's profile"
          onPress={() => navigation.navigate("Profile", { id })}
        />
        <ImageBackground source={{ uri: user.data.image }}>
          <Text style={styles.firstName}>{user.data.firstName}</Text>
          <Text style={styles.age}>{user.data.age}</Text>
        </ImageBackground>
      </View>
    );
  };

  const renderItem = ({ item }) => <Item data={item} />;

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        numColumns={2}
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        extraData={selectedId}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    marginVertical: 8,
    marginHorizontal: 16,
    height: 200,
    width: 200,
    overflow: "hidden",
    alignItems: "center",
  },

  firstName: {
    fontSize: 12,
  },
  age: {
    fontSize: 12,
  },
  image: {},
});

export default Grid;
