import React, {useContext, useEffect, useState} from 'react';
import {Button, Image} from 'react-native';
import { Context, IntentContext } from '../../App';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import PlanScreen from '../screen/PlanScreen';
import FavoriteContentsScreen from '../screen/FavoriteContentsScreen';
import SettingsScreen from '../screen/SettingsScreen';
import HomeTabStackNav from './HomeTabStackNav';

const Tab = createBottomTabNavigator();

function AuthedStackNav() {
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
      initialRouteName='HomeTabStack'
      // 全体の画面に設定を行いたい場合は以下のようにできる
      screenOptions={{
        headerStyle: {
          backgroundColor: '#e1154f',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
      {/* 'component'propsではcomponent しか受け付けない。インライン関数とか入れたらダメ */}
      <Tab.Screen
        name="HomeTabStack"
        component={HomeTabStackNav}
      />
      <Tab.Screen
        name="Plan"
        component={PlanScreen}
        options={{headerRight: ChangeLoginStateButton}}
      />
      <Tab.Screen
        name="FavoriteContents"
        component={FavoriteContentsScreen}
        options={{headerRight: ChangeLoginStateButton}}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{headerRight: ChangeLoginStateButton}}
      />
    </Tab.Navigator>
    </>
  );
}

export default AuthedStackNav;
