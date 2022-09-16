import * as React from 'react';
import {useContext} from 'react';
import {Button, View, Text} from 'react-native';
import { Context } from '../../App';

function PlanScreen({navigation}) {
  // const [state, dispatch] = useContext(Context);

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Plan Screen</Text>
      <Button
        title="Prepare Plan"
        onPress={() => {
          alert('Plan Screen');
        }}
      />
    </View>
  );
}

export default PlanScreen;
