import React, { useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

import colors from '../styles/colors';
import Welcome from '../pages/Welcome';
import UserIdentification from '../pages/UserIdentification';
import Confirmation from '../pages/Confirmation';
import PlantSave from '../pages/PlantSave';
import AuthRoutes from './tab.routes';

const stackRoutes = createStackNavigator();

const AppRoutes: React.FC = () => {
   const [userExists, setUserExists] = useState(false);

   useEffect(() => {
      async function findUser() {
         const user = !!(await AsyncStorage.getItem('@plantmanager:user'));
         setUserExists(user);
      }
      findUser();
   }, []);
   return (
      <stackRoutes.Navigator
         headerMode="none"
         screenOptions={{
            cardStyle: {
               backgroundColor: colors.white
            },
         }}
      >
         { !userExists && (
            <>
               <stackRoutes.Screen
                  name="Welcome"
                  component={Welcome}
               />
            </>
         )}
         <stackRoutes.Screen
            name="PlantSelect"
            component={AuthRoutes}
         />
         <stackRoutes.Screen
            name="PlantSave"
            component={PlantSave}
         />
         <stackRoutes.Screen
            name="MyPlants"
            component={AuthRoutes}
         />
         <stackRoutes.Screen
            name="Confirmation"
            component={Confirmation}
         />
         <stackRoutes.Screen
            name="UserIdentification"
            component={UserIdentification}
         />
      </stackRoutes.Navigator>
   )
}

export default AppRoutes;