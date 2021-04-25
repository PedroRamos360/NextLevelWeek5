import React, { useEffect, useState } from 'react';
import {
   StyleSheet,
   Text,
   Image,
   View,
   TouchableOpacity,
   Alert
} from 'react-native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';

import colors from '../styles/colors';
import defaultImg from '../assets/anonymous.jpg';
import fonts from '../styles/fonts';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useRoute } from '@react-navigation/core';
import * as ImagePicker from 'expo-image-picker';

export default function Header() {
   const [username, setUsername] = useState<string>();
   const [userImg, setUserImg] = useState<any>();
   const [count, setCount] = useState(0);
   const [whenUserChangedName, setWhenUserChangedName] = useState(0);
   const navigation = useNavigation();

   async function pickImage() {
      let result = await ImagePicker.launchImageLibraryAsync({
         mediaTypes: ImagePicker.MediaTypeOptions.Images,
         allowsEditing: true
      })

      if (!result.cancelled) {
         await AsyncStorage.setItem('@plantmanager:userImage', result.uri);
      }
   }

   useEffect(() => {
      // Gambiarra 100%
      const interval = setInterval(() => {
         setCount(() => count + 1);
      }, 20000);


      async function loadStorageUsernameAndUserImg() {
         const user = await AsyncStorage.getItem('@plantmanager:user');
         const image = await AsyncStorage.getItem('@plantmanager:userImage');
         console.log(image);
         setUsername(user || '');
         setUserImg(image || '');
      }
      loadStorageUsernameAndUserImg();

      const unsubscribe = navigation.addListener('focus', () => {
         setCount(0);
         setWhenUserChangedName(0);
      });

       return () => {
         // Clear setInterval in case of screen unmount
         clearTimeout(interval);
         // Unsubscribe for the focus Listener
         unsubscribe;
       }
   }, [count])


   return (
      <View style={styles.container}>
         <View>
            <Text style={styles.greeting}>Olá,</Text>
            <TouchableOpacity onPress={() => {
               if (whenUserChangedName < count) {
                  Alert.alert('Trocar de nome', "Você quer mudar o seu nome?", [
                     {
                        text: 'Não',
                        style: 'cancel'
                     },
                     {
                        text: 'Sim',
                        onPress: async () => {
                           setWhenUserChangedName(count);
                           navigation.navigate('UserIdentification');
                        }
                     }
                  ]);
               } else {
                  Alert.alert('Muitas requisições', 'Aguarde 20 segundos e tente novamente');
               }

            }}>
               <Text style={styles.username}>{username}</Text>
            </TouchableOpacity>
         </View>
         <TouchableOpacity onPress={() => {
            if (whenUserChangedName < count) {
               Alert.alert('Foto de perfil', "Você quer mudar a sua foto de perfil?", [
                  {
                     text: 'Não',
                     style: 'cancel'
                  },
                  {
                     text: 'Sim',
                     onPress: () => {
                        setWhenUserChangedName(count);
                        pickImage();
                     }
                  }
               ]);
            } else {
               Alert.alert('Muitas requisições', 'Aguarde 20 segundos e tente novamente');
            }
         }}>
            { userImg ? (
               <Image source={{ uri: userImg }} style={styles.image} />
            ) : (
               <Image source={defaultImg} style={styles.image} />
            )}

         </TouchableOpacity>
      </View>
   )
}

const styles = StyleSheet.create({
   container: {
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: 20,
      marginTop: getStatusBarHeight(),
   },
   image: {
      width: 70,
      height: 70,
      borderRadius: 35,
   },
   greeting: {
      fontSize: 32,
      color: colors.heading,
      fontFamily: fonts.text,
   },
   username: {
      fontSize: 32,
      fontFamily: fonts.heading,
      color: colors.heading,
      lineHeight: 40,
   }
});