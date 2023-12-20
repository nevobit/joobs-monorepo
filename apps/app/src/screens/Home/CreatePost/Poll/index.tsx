import {
  View as DefaultView,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import Input from '../../../../components/Shared/Input';
import Icon from 'react-native-vector-icons/Ionicons';

const Poll = ({post, setPost}: {post: any; setPost: any}) => {
  const addPollOption = () => {
    if (post.poll.length > 3) return;
    setPost((prev: any) => ({
      ...prev,
      poll: [
        ...prev.poll,
        {
          id: `${Date.now()}-${Math.random()}`, // Agregar un identificador único
          text: '',
          votes: 0,
        },
      ],
    }));
  };

  const removePollOption = (idToRemove: string) => {
    setPost((prev: any) => {
      const newPoll = prev.poll.filter(
        (option: any) => option.id !== idToRemove,
      );
      return {
        ...prev,
        poll: newPoll,
      };
    });
  };

  const updateOptionText = (id: string, text: string) => {
    setPost((prev: any) => {
      const newPoll = prev.poll.map((option: any) =>
        option.id === id ? {...option, text} : option,
      );
      return {
        ...prev,
        poll: newPoll,
      };
    });
  };

  return (
    <DefaultView>
      <TextInput
        placeholderTextColor="rgba(0,0,0,0.4)"
        style={{
          fontSize: 16,
          fontWeight: '600',
          minHeight: 30,
          color: 'rgba(0,0,0,0.8)',
        }}
        multiline
        placeholder="Título/pregunta de la encuesta"
        onChangeText={text => setPost((prev: any) => ({...prev, title: text}))}
      />
      <Text
        style={{
          color: 'rgba(0,0,0,0.5)',
          fontWeight: '600',
          fontSize: 16,
          marginLeft: 0,
          marginTop: 5,
        }}>
        {post.title.length}/80
      </Text>

      <DefaultView
        style={{
          gap: 10,
          marginTop: 10,
        }}>
        {post.poll.map((po: any, index: number) => (
          <DefaultView
            key={po.id}
            style={{
              flexDirection: 'row',
              gap: 10,
              alignItems: 'center',
            }}>
            <Input
              style={{
                width: index > 1 ? '90%' : '100%',
              }}
              onChangeText={text => updateOptionText(po.id, text)}
              placeholder={`Opción ${index + 1} ( 30 caracteres )`}
            />
            {index > 1 && (
              <TouchableOpacity
                onPress={() => removePollOption(po.id)}
                style={{
                  width: 25,
                  height: 25,
                  backgroundColor: 'rgba(0,0,0,0.8)',
                  borderRadius: 50,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Icon name="close-outline" size={22} color="#fff" />
              </TouchableOpacity>
            )}
          </DefaultView>
        ))}
        {post.poll.length <= 3 && (
          <TouchableOpacity
            onPress={addPollOption}
            style={{
              width: '100%',
              height: 35,
              backgroundColor: 'rgba(0,0,0,0.2)',
              borderRadius: 10,
              alignItems: 'flex-start',
              justifyContent: 'center',
              paddingHorizontal: 10,
            }}>
            <DefaultView
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-start',
              }}>
              <Icon name="add-outline" size={20} color="rgba(0,0,0,0.8)" />

              <Text
                style={{
                  color: 'rgba(0,0,0,0.8)',
                  fontSize: 13,
                }}>
                Agregar opción
              </Text>
            </DefaultView>
          </TouchableOpacity>
        )}
      </DefaultView>
    </DefaultView>
  );
};

export default Poll;
