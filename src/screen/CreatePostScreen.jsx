import * as React from 'react';
import {Button, TextInput} from 'react-native';

function CreatePostScreen({navigation, route}) {
  const [postText, setPostText] = React.useState('');

  return (
    <>
      <TextInput
        multiline
        placeholder="What's on your mind?"
        style={{height: 200, padding: 10, backgroundColor: 'white'}}
        value={postText}
        onChangeText={setPostText}
      />
      <Button
        title="Done"
        onPress={() => {
          // 前の画面に戻ってパラメータを渡すには"navigate"メソッドを活用
          // "goBack"メソッドと似たような動作をする
          navigation.navigate({
            name: 'PostHome',
            params: {post: postText},
            merge: true,
          });
        }}
      />
    </>
  );
}

export default CreatePostScreen;
