import React, {useContext, useState} from 'react';
import {Button, Image} from 'react-native';
import { Context } from '../../App';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screen/HomeScreen';
import DetailsScreen from '../screen/DetailScreen';

const Stack = createNativeStackNavigator();

function ContentAStackNav() {
  const [state, dispatch] = useContext(Context)

  function ChangeLoginStateButton() {
    return (
      <Button
        onPress={() => {
          dispatch({isLogin: !state.isLogin});
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
      initialRouteName='Home'
      // 全体の画面に設定を行いたい場合は以下のようにできる
      screenOptions={{
        tabBarActiveTintColor: '#e91e63',
        tabBarLabelStyle: { fontSize: 12 },
        tabBarStyle: { backgroundColor: 'powderblue' },
      }}>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
      />
      <Stack.Screen
        name="Details"
        component={DetailsScreen}
      />
    </Stack.Navigator>
    </>
  );
}

export default ContentAStackNav;
