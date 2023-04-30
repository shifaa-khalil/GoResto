import * as React from "react";
import { ScrollView, Image, View, Text, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StyleSheet } from "react-native";
import Input from "../components/input";
import MyButton from "../components/button";
import MyLink from "../components/link";
import GoPro from "../assets/GoPro.png";
import NavBar from "../components/navBar";
import Signin from "../screens/signin";
import NavCard from "../components/navigationalCard";
import Reservations from "../assets/reservationsWhite.png";
import Chats from "../assets/chatsWhite.png";
import DownArrow from "../assets/downArrow.png";
import Chinese from "../assets/chinese.png";
import Japanese from "../assets/japanese.png";
import Italian from "../assets/italian.png";
import Lebanese from "../assets/lebanese.png";
import French from "../assets/french.png";
import Indian from "../assets/indian.png";
import CategoryCard from "../components/categoryCard";

const Home = () => {
  //   const images = [
  //     { Chinese },
  //     { Japanese },
  //     { Italian },
  //     { Lebanese },
  //     { French },
  //     { Indian },
  //   ];
  //   let property = "";
  //   for (i = 1; i < images.length; i++) {
  //     if (images[i] % 3 == 0) property = "center";
  //     else property = "space-between";
  //   }

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={[styles.container]}>
        <NavBar />
        <Image source={GoPro} style={[styles.heading]} />
        <NavCard
          color={styles.yellow}
          text="Check my reservations"
          icon={Reservations}
          onPress={() => console.log("pressed")}
        />
        <NavCard
          color={styles.red}
          text="Go to chats"
          icon={Chats}
          onPress={() => console.log("pressed")}
        />
        <Text style={[styles.text]}>Check categories</Text>
        <Image source={DownArrow} style={[styles.downArrow]} />
        <View style={[styles.categories]}>
          <CategoryCard
            text="Chinese"
            image={Chinese}
            onPress={() => console.log("pressed")}
          />
          <CategoryCard
            text="Japanese"
            image={Japanese}
            onPress={() => console.log("pressed")}
          />
          <CategoryCard
            text="Italian"
            image={Italian}
            onPress={() => console.log("pressed")}
          />
          <CategoryCard
            text="Lebanese"
            image={Lebanese}
            onPress={() => console.log("pressed")}
          />
          <CategoryCard
            text="French"
            image={French}
            onPress={() => console.log("pressed")}
          />
          <CategoryCard
            text="Indian"
            image={Indian}
            onPress={() => console.log("pressed")}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  red: {
    backgroundColor: "#D43325",
  },
  yellow: {
    backgroundColor: "#D6C02C",
  },
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
  },
  heading: {
    width: 310,
    height: 37,
    marginBottom: 40,
    marginTop: 20,
  },
  text: {
    fontSize: 20,
    marginTop: 20,
    marginBottom: 10,
  },
  downArrow: {
    height: 23,
    width: 25,
  },
  categories: {
    width: 310,
    flexDirection: "row",
    justifyContent: "center",
    columnGap: 60,
    flexWrap: "wrap",
    marginVertical: 40,
  },
});

export default Home;
