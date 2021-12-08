import React, { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import { View, StyleSheet, Dimensions,Text } from "react-native";
import {
  HStack,
  Heading,
  Spinner,
  Center,
  NativeBaseProvider,
  Button,
  AlertDialog,
} from "native-base";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import {
  collection,
  query,
  onSnapshot,
  getFirestore,
  doc,
  where,
} from "firebase/firestore";

export default function UserTracking({ route, navigation }) {
  const obj = route.params.client;
  const [location, setLocation] = useState({});
  


  const firebaseConfig = {
    apiKey: "AIzaSyAdjpcjPpRmzfi98v8HfLvtBytwpKdQIyw",
    authDomain: "carsist-5c761.firebaseapp.com",
    projectId: "carsist-5c761",
    storageBucket: "carsist-5c761.appspot.com",
    messagingSenderId: "750585716376",
    appId: "1:750585716376:web:f0ea2d49e84641b3e2baed",
    measurementId: "G-F614Z8RNRP",
  };
  initializeApp(firebaseConfig);

  const db = getFirestore();

  useEffect(() => {
  
    onSnapshot(
      doc(db, "users",obj.user.id),
      { includeMetadataChanges: true },
      (doc) => {
        // setStatus(doc.data().status);
       setLocation({...doc.data()});
       console.log({...doc.data()})

      }
    );
    
  }, []);

  


  return (
      <View style={styles.container}>
        <Text style={{fontSize:20}}>Tracking your Client</Text>
        <MapView
          region={{
            latitude: location.latitude || 24.907636522606577,
            longitude: location.longitude || 67.11521435271561,
            latitudeDelta: 0.0022,
            longitudeDelta: 0.0021,
          }}
          style={styles.map}
        >
          <Marker
            coordinate={{
              latitude: location.latitude || 24.907636522606577,
              longitude: location.longitude || 67.11521435271561,
            }}
            title={location.name}
          />
        </MapView>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height * 0.6,
  },
});
