import * as React from 'react';
import {useState, useEffect} from 'react';
import {Button, View, Text, Linking, StyleSheet,} from 'react-native';

// "navigation" propsはすべてのScreen Component に渡されるモノ
function HomeScreen({navigation}) {

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Home Screen</Text>
      <Button
        title="Go to Details"
        // Appのルートで定義されているSatck.Screenの画面にしか遷移できない（動的に遷移先を指定できない。）
        onPress={() => {
          // 遷移先にパラメータを送る場合は第二引数にJson形式で入力
          navigation.navigate('Details', {
            itemId: 86,
            otherParams: 'anything you want here',
          });
        }}
      />
      <Button
        title="Go to Post Home"
        onPress={() => navigation.navigate('PostHome')}
      />
      <View style={{flex:0.1}}/>
      <Button
        title="Push to Post Home"
        onPress={() => navigation.push('PostHome')}
      />
     
    </View>
  );
}

export default HomeScreen;
