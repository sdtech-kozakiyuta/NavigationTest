import * as React from 'react';
import {useContext} from 'react';
import {Button, View, Text} from 'react-native';
import { Context } from '../../App';

function SettingsScreen({navigation}) {
  // const [state, dispatch] = useContext(Context);

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Settings Screen</Text>
      <Button
        title="Setting"
        onPress={() => {
          alert('Setting Screen');
        }}
      />
    </View>
  );
}

export default SettingsScreen;
