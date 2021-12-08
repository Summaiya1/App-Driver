import React, { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import { View, StyleSheet, Dimensions } from "react-native";
import {
  HStack,
  Heading,
  Spinner,
  Center,
  NativeBaseProvider,
  Text,
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
import { updatelocation,updateStatus} from "../../config/firebase";

export default function Dashboard({ route, navigation }) {
  const obj = route.params.obj;
  const [Loc, setLoc] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const [client, setClient] = useState();
  const [id,setId] =useState();

  const onClose = () => setIsOpen(false);

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
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({}); // get current location coordinates
      setLoc(location.coords);

      await updatelocation(
        obj.id,
        location.coords.latitude,
        location.coords.longitude
      );

      const options = {
        accuracy: Location.Accuracy.Highest,
        timeInterval: 100,
        distanceInterval: 1,
      };

      Location.watchPositionAsync(options, async (location) => {
        setLoc(location.coords);

        await updatelocation(
          obj.id,
          location.coords.latitude,
          location.coords.longitude
        );
       
      });

      //where("state", "==", "CA")
    })();
    // onSnapshot(
    //   doc(db, "Rides"),
    //   where("driverId" ,"==",obj.id),
    //   { includeMetadataChanges: true },
    //   (doc) => {
    //     // setStatus(doc.data().status);
    //     console.log(doc.data());
    //     setContent(doc.data());
    //     setIsOpen(true);

    //   }
    // );
    const q = query(collection(db, "Rides"), where("driverId", "==", obj.id));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const rides = [];
      querySnapshot.forEach((doc) => {
        rides.push(doc.data());
         setId(doc.id);
        setClient(doc.data());
        setIsOpen(true);
      });
    });
  }, []);

  const TrackUser = async () =>{
  await updateStatus(id,"accepted");
  navigation.navigate("UserTracking",{client});



  }
  // useEffect(() => {

  // const q = query(collection(db, "location"))
  // onSnapshot(q, (querySnapshot) => {
  // const userLocation = [];
  // querySnapshot.forEach(doc => {

  //     userLocation.push({ ...doc.data(), id: doc.id})
  // });

  //     (async () => {
  //     for (let i =0 ; i<userLocation.length ; i++)
  //     {
  //        const data =await getUserData(userLocation[i].id)
  //        userLocation[i].data = {...data}
  //     }
  // }) ();
  // console.log(userLocation)

  // setLocations(userLocation);
  // });

  //   });

  // })();
  // }, []);

  //  const data = await getUserData(doc.id)

  // const { latitude, longitude} = Location;

  return (
    <NativeBaseProvider>
      <Center flex={1} px="3">
        <MapView
          region={{
            latitude: Loc.latitude || 24.907636522606577,
            longitude: Loc.longitude || 67.11521435271561,
            latitudeDelta: 0.0022,
            longitudeDelta: 0.0021,
          }}
          style={styles.map}
        >
          <Marker
            coordinate={{
              latitude: Loc.latitude || 24.907636522606577,
              longitude: Loc.longitude || 67.11521435271561,
            }}
          />
        </MapView>

        <AlertDialog isOpen={isOpen} onClose={onClose}>
          <AlertDialog.Content>
            <AlertDialog.Header>New Ride</AlertDialog.Header>

            {client && (
              <AlertDialog.Body>
                {" "}
                User : {client.user.name}
                Fare : {client.fare}
                Car : {client.car}{" "}
              </AlertDialog.Body>
            )}

            <AlertDialog.Footer>
              <Button.Group space={2}>
                <Button colorScheme="success" onPress={TrackUser}>
                  Accept
                </Button>
                <Button colorScheme="danger" onPress={onClose}>
                  Reject
                </Button>
              </Button.Group>
            </AlertDialog.Footer>
          </AlertDialog.Content>
        </AlertDialog>
      </Center>
    </NativeBaseProvider>
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
