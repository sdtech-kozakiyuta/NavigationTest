import React, { createContext, useContext, useEffect, useReducer, useState } from 'react'
import { Context, IntentContext } from '../../App';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import UnauthedStackNav from './UnauthedStackNav';
import AuthedStackNav from './AuthedStackNav';
import { Linking } from 'react-native';

const Stack = createNativeStackNavigator();

function RootStackNav({navigation}) {
  const [state, dispatch] = useContext(Context);
  const [path, pathDispatch] = useContext(IntentContext);

  useEffect(() => {
    // App起動直後でIntentを受ける場合
    Linking.getInitialURL().then((url)=> {
      if(path.path =! ''){
        pathDispatch({path: 'details'});
        console.log(`url`, path.path);
        // transition();
      }
    });
    // App起動中にIntentを受ける場合
    Linking.addEventListener('url', callback);

    if(state.isLogin == true) {
      // transition;
    }
  }, [state]);

  callback = async(event) =>{
    if(path.path != ''){
      console.log(`event`, event.url);
      pathDispatch({path: 'details'});
    }
  }

  // TODO：useEffect等から画面遷移を行う方法がわからない。
  transition = () => {
    console.log('trans to details');
    navigation.navigate({screen: 'Authed', params: {screen: 'HomeTabStack', params: {screen: 'ContentA', params: {screen: 'Details'}}}})
  }

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
