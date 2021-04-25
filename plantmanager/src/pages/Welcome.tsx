import React from 'react';
import { SafeAreaView, Text, Image, TouchableOpacity, StyleSheet, Dimensions, View } from 'react-native';
import { Feather } from '@expo/vector-icons';

import wateringImg from '../assets/watering.png';
import colors from '../styles/colors';
import fonts from '../styles/fonts';
import { useNavigation } from '@react-navigation/core';

export default function Welcome() {
   const navigation = useNavigation();

   return (
      <SafeAreaView style={styles.container}>
         <View style={styles.wrapper}>
            <Text style={styles.title}>Gerencie {'\n'} suas plantas de {'\n'} forma fácil</Text>

            <Image source={wateringImg} style={styles.img} resizeMode="contain"/>

            <Text style={styles.subtitle}>
               Não esqueça mais de regar suas plantas. Nós
               cuidamos de lembrar você sempre que precisar.
            </Text>

            <TouchableOpacity style={styles.button} activeOpacity={0.7} onPress={() => {navigation.navigate('UserIdentification')}}>
               <Feather name="chevron-right" style={styles.buttonIcon}/>
            </TouchableOpacity>
         </View>
      </SafeAreaView>
   );
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
   },
   wrapper: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'space-around',
      paddingHorizontal: 20
   },
   title: {
      fontSize: 32,
      textAlign: 'center',
      color: colors.heading,
      marginTop: 50,
      fontFamily: fonts.heading
   },
   subtitle: {
      textAlign: 'center',
      fontSize: 17,
      paddingHorizontal: 20,
      color: colors.heading,
      fontFamily: fonts.heading
   },
   img: {
      height: Dimensions.get("window").width * 0.7,
   },
   button: {
      backgroundColor: colors.green,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 16,
      marginBottom: 20,
      height: 56,
      width: 56
   },
   buttonIcon: {
      color: colors.white,
      fontSize: 24,
   }
});