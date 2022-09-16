import React, {useContext, useState} from 'react';
import {Button, Image} from 'react-native';
import { Context } from '../../App';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PostHomeScreen from '../screen/PostHomeScreen';
import CreatePostScreen from '../screen/CreatePostScreen'

const Stack = createNativeStackNavigator();

function ContentBStackNav() {
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
      initialRouteName='PostHome'
      // 全体の画面に設定を行いたい場合は以下のようにできる
      screenOptions={{
        tabBarActiveTintColor: '#e91e63',
        tabBarLabelStyle: { fontSize: 12 },
        tabBarStyle: { backgroundColor: 'powderblue' },
      }}>
      {/* 'component'propsではcomponent しか受け付けない。インライン関数とか入れたらダメ */}
      <Stack.Screen
        name="PostHome"
        component={PostHomeScreen}
        options={{headerRight: ChangeLoginStateButton}}
      />
      <Stack.Screen
        name="CreatePost"
        component={CreatePostScreen}
        options={{headerRight: ChangeLoginStateButton}}
      />
    </Stack.Navigator>
    </>
  );
}

export default ContentBStackNav;
