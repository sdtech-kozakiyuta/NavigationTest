import React, { useContext, useState } from 'react'
import { Context } from '../../App';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import UnauthedStackNav from './UnauthedStackNav';
import AuthedStackNav from './AuthedStackNav';

const Stack = createNativeStackNavigator();

function RootStackNav() {
  const [state, dispatch] = useContext(Context);

  return (
    <Stack.Navigator screenOptions={{headerShown:false}}>
      {state.isLogin ? (
        <Stack.Screen name="Authed" component={AuthedStackNav} />
      ):(
        <Stack.Screen name="Unauthed" component={UnauthedStackNav} />
      )}
    </Stack.Navigator>
  );
}

export default RootStackNav;
