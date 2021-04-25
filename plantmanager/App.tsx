import React, { useEffect } from 'react';
import AppLoading from 'expo-app-loading';
import * as Notifications from 'expo-notifications';

import Routes from './src/routes';
import {
   useFonts,
   Jost_400Regular,
   Jost_600SemiBold
} from '@expo-google-fonts/jost';
import { PlantProps } from './src/libs/storage';

export default function App() {
   const [ fontsLoaded ] = useFonts({
      Jost_400Regular,
      Jost_600SemiBold
   });

   useEffect(() => {
      // Exemplo de como ouvir as notificações
      // const subscription = Notifications.addNotificationReceivedListener(
      //    async notification => {
      //       const data = notification.request.content.data.plant as PlantProps;
      //       console.log(data);
      //    }
      // );
      // return () => subscription.remove();

      // Verificar todos agendamentos de notificações
      // async function notifications() {
      //    const data = await Notifications.getAllScheduledNotificationsAsync();
      //    console.log('############### NOTIFICAÇÕES AGENDADAS #####################');
      //    console.log(data);

            // Excluir todos agendamentos de notificações
      //    await Notifications.cancelAllScheduledNotificationsAsync();
      // }
      // notifications();
   }, []);

   if (!fontsLoaded) {
      return <AppLoading />
   }

   return (
      <Routes />
   );
}

