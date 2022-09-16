import * as React from 'react';
import {useContext} from 'react';
import {Button, View, Text} from 'react-native';
import { Context } from '../../App';

function FavoriteContentsScreen({navigation}) {
  // const [state, dispatch] = useContext(Context);

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Favorite Contents Screen</Text>
      <Button
        title="Favorite Content"
        onPress={() => {
          alert('Favorite Contents Screen');
        }}
      />
    </View>
  );
}

export default FavoriteContentsScreen;
