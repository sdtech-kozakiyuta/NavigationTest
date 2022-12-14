// In App.js in a new project

import {createContext, useReducer, useEffect} from 'react';
import * as React from 'react';
import {Platform, Linking, Text, Alert} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import RootStackNav from './src/navigation/RootStackNav';
import messaging from '@react-native-firebase/messaging';

const initialState = {
  isLogin: false,
};

const intentState = {
  path: '',
};

// getToken ->
const checkToken = async () => {
  const fcmToken = await messaging().getToken();
  if (fcmToken) {
    console.log(fcmToken);
  }
};

messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message handled in the background!', remoteMessage);
});

export const Context = createContext(initialState); // <- initialStateを使ってContextを作成
export const IntentContext = createContext(intentState);

function pathReducer(state, action) {
  return {...state, path: action.path};
}

// 下記コマンドで、Details画面に引数を渡して遷移可能
// 下記コマンドのPathは以下の"linking - config"の設定に準じて決まる。
// "npx uri-scheme open "navigationtest://contentA/details/77/OKGoogle" --android"
const linking = {
  prefixes: [
    /* your linking prefixes */
    'navigationtest://',
  ],
  config: {
    /* configuration for matching screens with paths */
    screens: {
      Authed: {
        initialRouteName: 'Plan',
        screens: {
          HomeTabStack: {
            screens: {
              ContentA: {
                path: 'contentA',
                screens: {
                  Details: {
                    path: 'details/:itemId/:otherParams',
                  },
                },
              },
            },
          },
          Settings: {
            path: 'settings',
          },
        },
      },
    },
  },
};

function App() {
  const [state, dispatch] = useReducer((state, action) => {
    return {...state, isLogin: action.isLogin};
  }, initialState);
  const [path, pathDipatch] = useReducer(pathReducer, intentState);

  const handleOpenURL = event => {
    if (event.url) {
      openFromUrlScheme(event.url);
    }
  };

  const openFromUrlScheme = url => {
    console.log(url);
    // const parsedUrl = parse(url, true);
    // if (parsedUrl.protocol === 'myapp:') {
    //   console.log('from console log: ' + parsedUrl);
    // }
  };

  useEffect(() => {
    if (Platform.OS === 'android') {
      // androidはこのタイミングで起動されたURLを取得できる
      Linking.getInitialURL()
        .then(url => {
          if (url) {
            openFromUrlScheme(url);
            console.log('linking');
          }
        })
        .catch(e => {
          console.log('called from: ' + e);
        });
    } else if (Platform.OS === 'ios') {
      // iosの場合はハンドラを経由する必要があるので追加
      Linking.addEventListener('url', handleOpenURL);
    }
    return () => {
      Linking.removeEventListener('url', handleOpenURL);
    };
  }, []);

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    // Appは起動しているが、Backgroundにある場合（Foregroundの場合、Push通知は表示されない）
    // データペイロードの中に"type"のプロパティがあると仮定した場合
    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log(
        'Notification caused app to open from background state:',
        remoteMessage.notification,
      );
      // navigation.navigate(remoteMessage.data.type);
    });

    // 停止状態のAppをPush通知のタップから起動させた場合
    // ペイロードの情報を基に特定の画面に遷移させるような場合
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          console.log(
            'Notification caused app to open from quit state:',
            remoteMessage.notification,
          );
          console.log('type', remoteMessage.data.type);
          // setInitialRoute(remoteMessage.data.type); // e.g. "Settings"
        }
        // setLoading(false);
      });
  }, []);

  checkToken();

  return (
    <IntentContext.Provider value={[path, pathDipatch]}>
      <Context.Provider value={[state, dispatch]}>
        {/* 手順2："NavigationContainer"で"Navigator"要素をWrap。これをAppのルートで行う。 */}
        <NavigationContainer
          // linking={linking}
          fallback={<Text>Loading...</Text>}>
          <RootStackNav />
        </NavigationContainer>
      </Context.Provider>
    </IntentContext.Provider>
  );
}

export default App;

/*
navigation のパターン
- navigation.navigate('遷移先')
  ‐ ルートを変えるイメージ？
- navigation.push('遷移先')
  ‐ Stack を積んでいくイメージ
*/
