import React from "react";
import { StyleSheet, Text, View,Button,Alert} from 'react-native';
import * as Facebook from 'expo-facebook';
import { addDriver } from "../../config/firebase";

export default function Login({navigation})
{
    async function login() {
        try {
          await Facebook.initializeAsync({
            appId: '880153375978847',
          });
          const { type, token, expirationDate, permissions, declinedPermissions } =
            await Facebook.logInWithReadPermissionsAsync({
              permissions: ['public_profile'],
            });
          if (type === 'success') {
            // Get the user's name using Facebook's Graph API
            const response = await fetch(`https://graph.facebook.com/me?access_token=${token}`);
            var obj = await response.json();
            // console.log(obj);
            // Alert.alert('Logged in!', `Hi ${(await response.json()).name}!`);
            await addDriver(obj.id,obj.name);
            
            navigation.navigate("Dashboard",{obj});
          } else {
            // type === 'cancel'
          }
        } catch ({ message }) {
           if(message === "Already read")
           {
            navigation.navigate("Dashboard",{obj});
           }
           else Alert.alert(`Facebook Login Error: ${message}`);
        }
      }

   return(
    <View style={styles.container}>
   
        <Button
        title="Login with facebook"
        color="black"
        onPress={login}
        />
    </View>
   );


}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
  

