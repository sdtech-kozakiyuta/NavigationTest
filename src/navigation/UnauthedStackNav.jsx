import React, {useContext, useState} from 'react';
import {Button, Image} from 'react-native';
import { Context } from '../../App';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from '../screen/LoginScreen';
import SignupScreen from '../screen/SignupScreen';

const Stack = createNativeStackNavigator();

function UnauthedStackNav() {
  const [state, dispatch] = useContext(Context)

  function ChangeLoginStateButton() {
    return (
      <Button
        onPress={() => {
          dispatch({isLogin: !state.isLogin});
          console.log("logged in/out ");
          alert('isLogin: ' + state.isLogin);
        }}
        title={state.isLogin ? 'Logout' : 'Login'}
        color="#00cc00"
      />
    );
  }

  return (
    <>
    <Stack.Navigator
      initialRouteName='Login'
      screenOptions={{
        headerStyle: {
          backgroundColor: 'f4511e',
        },
        headerTintColor: '#000',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{headerRight: ChangeLoginStateButton}}
      />
      <Stack.Screen
        name="Signup"
        component={SignupScreen}
        options={{headerRight: ChangeLoginStateButton}}
      />
    </Stack.Navigator>
    </>
  );
}

export default UnauthedStackNav;
