import React from 'react'
import { Image, Pressable, ScrollView } from 'react-native'
import { Text, View } from 'react-native'
import { useConversations } from '../../../../hooks'
import { useNavigation } from '@react-navigation/native'

const Chats = () => {
  const { conversations, isLoading } = useConversations();
  
  const navigation = useNavigation<any>();

  const renderProfileImage = (photo: string, name: string) => {
    if (photo) {
      return (
        <Image
          source={{ uri: photo }}
          width={35}
          height={35}
          style={{
            borderRadius: 50,
            borderWidth: 1,
            borderColor: 'rgba(0,0,0,0.1)',
          }}
        />
      );
    } else {
      return (
        <View
          style={{
            backgroundColor: '#d5bffd',
            height: 35,
            width: 35,
            borderRadius: 50,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text
            style={{
              fontWeight: '600',
              fontSize: 16,
              color: 'rgba(0,0,0,0.8)',
            }}>
            {name?.charAt(0)}
          </Text>
        </View>
      );
    }
  };
  
  return (
    <View style={{
      backgroundColor: "#fff",
      minHeight: "100%"
    }} >
      { conversations?.length <= 0 ? (

      <View style={{
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 30
      }}>
        <Image source={{
          uri: 'https://i.ibb.co/N6PvW1M/Screenshot-from-2023-11-02-11-46-00-removebg-preview.png'
        }} style={{
          width: 150,
          height: 150
        }} />
        <Text style={{
          color: 'rgba(0,0,0,0.5)',
          fontWeight: '500',
          fontSize: 14

        }}>Aún no tienes conexiones</Text>
      </View>
      ) : (

        <ScrollView contentContainerStyle={{
          paddingHorizontal: 10,
          paddingTop: 10
        }} >
          {conversations?.map((conversation: any) => (
            <Pressable onPress={() => navigation.navigate("Chat", { id:conversation.participantId })} style={{
              marginBottom: 20
            }} >
              <View style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 10
              }} >
                {renderProfileImage(conversation?.user?.photo, conversation?.user?.name)}
                <View style={{
                    gap: 5
                }} >
                  <Text style={{
                    fontWeight: "600",
                    fontSize: 14,
                  }} >{conversation?.user?.name}</Text>
                  <Text style={{
                    color: "rgba(0,0,0,0.7)",
                    fontSize: 13
                  }} >{conversation?.lastMessage}</Text>
                </View>
              </View>

            </Pressable>
          ))}
        </ScrollView>

      )}

    </View>
  )
}

export default Chats