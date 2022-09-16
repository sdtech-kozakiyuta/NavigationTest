import React, {useContext, useState} from 'react';
import {Button, Image} from 'react-native';
import { Context } from '../../App';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import ContentAStackNav from './ContentAStackNav';
import ContentBStackNav from './ContentBStackNav';

const Tab = createMaterialTopTabNavigator();

function HomeTabStackNav() {
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
    <Tab.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#e1154f',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
      <Tab.Screen
        name="ContentA"
        component={ContentAStackNav}
      />
      <Tab.Screen
        name="ContentB"
        component={ContentBStackNav}
      />
    </Tab.Navigator>
    </>
  );
}

export default HomeTabStackNav;
