import * as React from 'react';
import {useContext} from 'react';
import {Button, View, Text} from 'react-native';
import { Context } from '../../App';

function SignupScreen({navigation}) {
  const [state, dispatch] = useContext(Context);

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Sign up Screen</Text>
      <Button
        title="Signup"
        onPress={() => {
          dispatch({isLogin: true});
          alert('isLogin: ' + state.isLogin);
        }}
      />
    </View>
  );
}

export default SignupScreen;
