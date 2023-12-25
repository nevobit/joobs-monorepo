import React, {useState} from 'react';
import {Image, ScrollView, TextInput, TouchableOpacity} from 'react-native';
import {Text, View as DefaultView} from 'react-native';
import {View} from '../../../../components/Shared/View';
import {USERS} from '../../../../graphql/queries';
import {useQuery, useSubscription} from '@apollo/client';
import Icon from 'react-native-vector-icons/Ionicons';
import MessageCard from './MessageCard';
import {useCreateMessage, useMessages, useUser} from '../../../../hooks';
import Button from '../../../../components/Shared/Button';
import {MESSAGE_SUB} from '../../../../graphql/subscriptions';

const Chat = ({navigation, route}: any) => {
  const {isLoading: isLoadingUser, user, refetch} = useUser(route.params.id);
  
  const { user: myUser } = useUser();

  console.log(myUser)
  console.log(user)
  const [messagesList, setMessagesList] = useState<any>([]);
  const [text, setText] = useState('');

  const {messages, isLoading, error} = useMessages(
    route.params.id,
    setMessagesList,
  );
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
    onSubscriptionData({subscriptionData: {data}}) {
      if((data.messageAdded.receiverId == route.params.id && data.messageAdded.senderId == myUser.id) || (data.messageAdded.sender == route.params.id && data.messageAdded.receiverId == myUser.id)  )
      setMessagesList((prev: any) => [...prev, data.messageAdded]);
    },
  });
  console.log({errorSub});
  console.log({data});
  console.log({data});
  console.log({errorCre});

  const onSubmit = async () => {
     message({
      variables: {
        data: {
          receiverId: route.params.id,
          text: text,
        },
      },
      onCompleted(){
        setText('');
      }
    });
  };
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
          <Image
            source={{
              uri: user?.photo,
            }}
            style={{
              width: 45,
              height: 45,
              borderRadius: 100,
            }}
          />
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
            height: '90%',
          }}>
          <ScrollView
            contentContainerStyle={{
              paddingHorizontal: 10,
              paddingTop: 10,
              gap: 10,
              height: '90%',
            }}>
            {messagesList?.map(
              ({
                id,
                text,
                senderId,
              }: {
                id: string;
                text: string;
                senderId: string;
              }) => (
                <MessageCard
                  key={id}
                  text={text}
                  isSender={senderId !== route.params.id}
                />
              ),
            )}
          </ScrollView>
          <DefaultView
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 10,
              paddingHorizontal: 15,
              height: 80,
              marginTop: 'auto',
              marginBottom: 5,
              paddingBottom: 10,
              backgroundColor: '#fff',
            }}>
            <Icon name="link-outline" size={25} />
            <TextInput
            value={text}
              onChangeText={text => setText(text)}
              style={{
                fontSize: 15,
                width: '70%',
              }}
              placeholder="Escribe un mensaje..."
            />
            <Button
              text="Enviar"
              style={{
                margin: 0,
              }}
              onPress={onSubmit}
            />
          </DefaultView>
        </DefaultView>
      </DefaultView>
    </View>
  );
};

export default Chat;
