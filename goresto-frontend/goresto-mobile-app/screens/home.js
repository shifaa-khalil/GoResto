import React, { useRef } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  ScrollView,
  Image,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import GoPro from "../assets/GoPro.png";
import NavBar from "../components/navBar";
import NavCard from "../components/navigationalCard";
import Reservations from "../assets/reservationsWhite.png";
import Chats from "../assets/chatsWhite.png";
import DownArrow from "../assets/downArrow.png";
import Chinese from "../assets/chinese.png";
import Japanese from "../assets/japanese.png";
import Italian from "../assets/italian.png";
import Lebanese from "../assets/lebanese.png";
import French from "../assets/french.jpg";
import Indian from "../assets/indian.png";
import Thai from "../assets/thai.png";
import Turkish from "../assets/turkish.png";
import Mexican from "../assets/mexican.png";
import Spanish from "../assets/spanish.jpg";
import Greek from "../assets/greek.jpg";
import American from "../assets/american.png";
import CategoryCard from "../components/categoryCard";
import Icon from "react-native-vector-icons/Ionicons";

const Home = () => {
  const navigation = useNavigation();

  const scrollViewRef = useRef();

  const handleScroll = () => {
    scrollViewRef.current.scrollTo({ y: 500, animated: true });
  };

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
    <ScrollView ref={scrollViewRef} showsVerticalScrollIndicator={false}>
      <View style={[styles.container]}>
        <NavBar />
        <Image source={GoPro} style={[styles.heading]} />
        <NavCard
          color={styles.yellow}
          text="Check my reservations"
          icon={Reservations}
          onPress={() => navigation.navigate("Reservations")}
        />
        <NavCard
          color={styles.red}
          text="Go to chats"
          icon={Chats}
          onPress={() => navigation.navigate("Chats")}
        />
        <Text style={[styles.text]}>Check categories</Text>
        <TouchableOpacity onPress={handleScroll}>
          <Image source={DownArrow} style={[styles.downArrow]} />
        </TouchableOpacity>

        <View style={[styles.categories]}>
          <CategoryCard
            text="Chinese"
            image={Chinese}
            onPress={() =>
              navigation.navigate("Restaurants", { cuisine: "Chinese" })
            }
          />
          <CategoryCard
            text="Japanese"
            image={Japanese}
            onPress={() =>
              navigation.navigate("Restaurants", { cuisine: "Japanese" })
            }
          />
          <CategoryCard
            text="Italian"
            image={Italian}
            onPress={() =>
              navigation.navigate("Restaurants", { cuisine: "Italian" })
            }
          />
          <CategoryCard
            text="Lebanese"
            image={Lebanese}
            onPress={() =>
              navigation.navigate("Restaurants", { cuisine: "Lebanese" })
            }
          />
          <CategoryCard
            text="French"
            image={French}
            onPress={() =>
              navigation.navigate("Restaurants", { cuisine: "French" })
            }
          />
          <CategoryCard
            text="American"
            image={American}
            onPress={() =>
              navigation.navigate("Restaurants", { cuisine: "American" })
            }
          />
          <CategoryCard
            text="Mexican"
            image={Mexican}
            onPress={() =>
              navigation.navigate("Restaurants", { cuisine: "Mexican" })
            }
          />
          <CategoryCard
            text="Indian"
            image={Indian}
            onPress={() =>
              navigation.navigate("Restaurants", { cuisine: "Indian" })
            }
          />
          <CategoryCard
            text="Turkish"
            image={Turkish}
            onPress={() =>
              navigation.navigate("Restaurants", { cuisine: "Turkish" })
            }
          />
          <CategoryCard
            text="Spanish"
            image={Spanish}
            onPress={() =>
              navigation.navigate("Restaurants", { cuisine: "Spanish" })
            }
          />
          <CategoryCard
            text="Greek"
            image={Greek}
            onPress={() =>
              navigation.navigate("Restaurants", { cuisine: "Greek" })
            }
          />
          <CategoryCard
            text="Thai"
            image={Thai}
            onPress={() =>
              navigation.navigate("Restaurants", { cuisine: "Thai" })
            }
          />
        </View>
        <TouchableOpacity
          style={styles.row}
          onPress={() => navigation.navigate("Restaurants")}
        >
          <Icon name="chevron-back" size={24} color="#000" />
          <Text style={[styles.discover]}>Discover restaurants</Text>
          <Icon name="chevron-forward" size={24} color="#000" />
        </TouchableOpacity>
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
    paddingBottom: 40,
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
    borderRadius: 8,
  },
  categories: {
    width: 310,
    flexDirection: "row",
    justifyContent: "center",
    columnGap: 30,
    flexWrap: "wrap",
    marginTop: 50,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
  },
  discover: {
    fontSize: 20,
  },
});

export default Home;
