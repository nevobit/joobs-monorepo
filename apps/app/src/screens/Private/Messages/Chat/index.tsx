import React, {useEffect, useRef, useState} from 'react';
import {
  Image,
  ImageBackground,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {Text, View as DefaultView} from 'react-native';
import {View} from '../../../../components/Shared/View';
import {USERS} from '../../../../graphql/queries';
import {useQuery, useSubscription} from '@apollo/client';
import Icon from 'react-native-vector-icons/Ionicons';
import MessageCard from './MessageCard';
import {useCreateMessage, useMessages, useUser} from '../../../../hooks';
import Button from '../../../../components/Shared/Button';
import {MESSAGE_SUB} from '../../../../graphql/subscriptions';

interface Message {
  id: string;
  text: string;
  senderId: string;
  created_at: string;
}

const Chat = ({navigation, route}: any) => {
  const {isLoading: isLoadingUser, user} = useUser(route.params.id);

  const {user: myUser} = useUser();

  console.log(myUser);
  console.log(user);
  const [messagesList, setMessagesList] = useState<any>([]);
  const [text, setText] = useState('');
  const scrollViewRef = useRef<ScrollView>(null);

  const {messages, isLoading, error, refetch} = useMessages(
    route.params.id,
    setMessagesList,
  );

  console.log({error})
  const {
    message,
    isCreating,
    error: errorCre,
  } = useCreateMessage(setMessagesList);
  const {
    data,
    loading,
    error: errorSub,
  } = useSubscription(MESSAGE_SUB, {
    onData({data}) {

      if (
        (data.data.messageAdded.receiverId == route.params.id &&
          data.data.messageAdded.senderId == myUser.id) ||
        (data.data.messageAdded.senderId == route.params.id &&
          data.data.messageAdded.receiverId == myUser.id)
      ){
        setMessagesList((prev: any) => [...prev, data.data.messageAdded]);

      }
    },
  });


  const onSubmit = async () => {
    if(text == ""){
      return
    }
    message({
      variables: {
        data: {
          receiverId: route.params.id,
          text: text,
        },
      },
      onCompleted() {
        scrollViewRef.current?.scrollToEnd();
        setText('');
        refetch();
      },
    });
  };

  useEffect(() => {
      scrollViewRef.current?.scrollToEnd();
  }, []);

  useEffect(() => {
    if (messagesList.length > 0) {
      scrollViewRef.current?.scrollToEnd();
    }
  }, [messagesList]);
  return (
    <View>
      <DefaultView>
        <DefaultView
          style={{
            alignItems: 'center',
            flexDirection: 'row',
            marginTop: 10,
            gap: 5,
            paddingHorizontal: 15,
            paddingBottom: 10,
          }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="chevron-back" size={25} color="#fff" />
          </TouchableOpacity>
          {user?.photo ? (
            <Image
              source={{
                uri: user?.photo,
              }}
              style={{
                width: 40,
                height: 40,
                borderRadius: 100,
                marginRight: 5,
              }}
            />
          ) : (
            <DefaultView
              style={{
                backgroundColor: '#d5bffd',
                height: 40,
                width: 40,
                borderRadius: 5100,
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: 5,
              }}>
              <Text
                style={{
                  fontWeight: '600',
                  fontSize: 16,
                  color: 'rgba(0,0,0,0.8)',
                }}>
                {user?.name?.charAt(0)}
              </Text>
            </DefaultView>
          )}

          <Text
            style={{
              color: 'rgba(255,255,255,1)',
              fontWeight: '500',
              fontSize: 16,
            }}>
            {user?.name}
          </Text>
        </DefaultView>
        <DefaultView
          style={{
            backgroundColor: 'rgba(255,255,255,.93)',
            height: '93%',
          }}>
          <ImageBackground
            resizeMode="cover"
            style={{
              flex: 1,
            }}
            source={{
              uri: 'https://i.ibb.co/3Cyq5pM/Disen-o-sin-ti-tulo-16.png',
            }}>
            <ScrollView
            ref={scrollViewRef} 
              contentContainerStyle={{
                paddingHorizontal: 10,
                paddingTop: 10,
                gap: 10,
                minHeight: "100%"
              }}>
              {messagesList?.map(
                ({
                  id,
                  text,
                  senderId,
                  created_at,
                }: Message) => (
                  <MessageCard
                    key={id}
                    created_at={created_at}
                    text={text}
                    isSender={senderId !== route.params.id}
                  />
                ),
              )}
            </ScrollView>
          </ImageBackground>

          <DefaultView
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 10,
              paddingHorizontal: 15,
              height: 60,
              marginTop: 'auto',
              backgroundColor: '#fff',
            }}>
            <Icon name="link-outline" size={25} />
            <TextInput
              value={text}
              onChangeText={text => setText(text)}
              style={{
                fontSize: 15,
                width: '78%',
                color: '#000',
              }}
              placeholderTextColor="rgba(0,0,0,0.3)"
              placeholder="Escribe un mensaje..."
            />
            <TouchableOpacity onPress={onSubmit}>
              <Icon name="send" size={32} color="#5368f5" />
            </TouchableOpacity>
          </DefaultView>
        </DefaultView>
      </DefaultView>
    </View>
  );
};

export default Chat;
