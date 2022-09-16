import * as React from 'react';
import {useState, useEffect} from 'react';
import {Button, View, Text, Linking, StyleSheet,} from 'react-native';

const useMount = func => useEffect(() => func(), []);

const useInitialURL = () => {
  const [url, setUrl] = useState(null);
  const [processing, setProcessing] = useState(true);

  useMount(() => {
    const getUrlAsync = async () => {
      // Get the deep link used to open the app
      const initialUrl = await Linking.getInitialURL();

      // The setTimeout is just for testing purpose
      setTimeout(() => {
        setUrl(initialUrl);
        setProcessing(false);
      }, 1000);
    };

    getUrlAsync();
  });

  return { url, processing };
};

// "navigation" propsはすべてのScreen Component に渡されるモノ
function HomeScreen({navigation}) {
  const {url:initialUrl, processing} = useInitialURL();

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
      <Text>
      {processing
          ? `Processing the initial url from a deep link`
          : `The deep link is: ${initialUrl || "None"}`}
      </Text>
    </View>
  );
}

export default HomeScreen;
