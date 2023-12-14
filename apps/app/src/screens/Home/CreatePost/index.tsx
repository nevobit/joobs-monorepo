import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View as DefaultView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useUploadImage} from '../../../hooks';
import {View} from '../../../components/Shared/View';
import { BottomSheet } from '../../../containers';
import Button from '../../../components/Shared/Button';

const CreatePost = ({navigation}: any) => {
    const [ visible, setVisible ] = useState(false)
  const {photo, isLoading, getPhoto, error} = useUploadImage();

  const [post, setPost] = useState<{
    title: string;
    description: string;
    images: string[];
  }>({
    title: '',
    description: '',
    images: [],
  });

  useEffect(() => {
    if (photo.length > 4) {
      setPost(prev => ({...prev, images: [photo]}));
    }
  }, [photo]);

  const onSubmit = async () => {
    if (post.title.length > 1) {
      navigation.navigate('PostTo', {post: post});
    }
  };

  return (
    <View>
      <DefaultView
        style={{
          backgroundColor: '#121212',
          alignItems: 'center',
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingHorizontal: 14,
          paddingVertical: 10,
        }}>
        <DefaultView
          style={{
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'space-between',
            gap: 10,
          }}>
          <TouchableOpacity onPress={() => navigation.navigate('Home')}>
            <Icon name="close" size={25} color="#fff" />
          </TouchableOpacity>
          <Text
            style={{
              color: '#fff',
              fontSize: 18,
              fontWeight: '600',
              marginBottom: 3,
            }}>
            Empezar una discusión
          </Text>
        </DefaultView>
        <TouchableOpacity onPress={() => setVisible(true)} >
          <Icon
            size={25}
            color="rgba(255,255, 255, .6)"
            name="information-circle"
          />
        </TouchableOpacity>
      </DefaultView>
      <DefaultView
        style={{
          paddingVertical: 5,
          paddingHorizontal: 15,
          flex: 1,
          paddingBottom: 25,
          backgroundColor: '#f0f0f0',
        }}>
        <TextInput
          placeholderTextColor="rgba(0,0,0,0.4)"
          style={{
            fontSize: 16,
            fontWeight: '600',
            minHeight: 30,
            color: 'rgba(0,0,0,0.8)',
          }}
          multiline
          placeholder="Dale un título a tú discusión"
          onChangeText={text => setPost(prev => ({...prev, title: text}))}
        />
        <Text
          style={{
            color: 'rgba(0,0,0,0.5)',
            fontWeight: '600',
            fontSize: 16,
            marginLeft: 0,
            marginTop: 5,
          }}>
          {post.title.length}/160
        </Text>
        <TextInput
          multiline
          onChangeText={text => setPost(prev => ({...prev, description: text}))}
          style={{
            fontSize: 14,
            minHeight: 30,
            marginTop: 10,
            color: 'rgba(0,0,0,0.8)',
          }}
          placeholder="Descripción de la discusión (opcional)"
          placeholderTextColor="rgba(0,0,0,0.4)"
        />
        <Text
          style={{
            color: 'rgba(0,0,0,0.5)',
            fontWeight: '600',
            fontSize: 16,
            marginLeft: 0,
            marginTop: 5,
          }}>
          {post.description.length}/1500
        </Text>
        {isLoading && <ActivityIndicator color="#000" />}
        {post.images.length > 0 && (
          <DefaultView
            style={{
              marginTop: 10,
            }}>
            <DefaultView
              style={{
                borderWidth: 1,
                borderColor: 'rgba(0,0,0,0.1)',
                width: 80,
                height: 80,
                borderRadius: 5,
              }}>
              <Image
                source={{
                  uri: photo,
                }}
                style={{
                  width: 80,
                  height: 80,
                  objectFit: 'contain',
                }}
              />
            </DefaultView>
          </DefaultView>
        )}

        <DefaultView
          style={{
            marginTop: 'auto',
          }}>
          <TouchableOpacity
            onPress={getPhoto}
            style={{
              padding: 5,
              borderTopWidth: 1,
              borderBottomWidth: 1,
              borderBottomColor: 'rgba(0,0,0,0.1)',
              borderTopColor: 'rgba(0,0,0,0.1)',
              marginBottom: 10,
            }}>
            <Icon name="image" size={30} color="rgba(0,0,0,0.8)" />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: '#5169f6',
              borderRadius: 50,
              height: 45,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onPress={onSubmit}>
            <Text
              style={{
                color: '#fff',
                fontSize: 16,
              }}>
              Siguiente
            </Text>
          </TouchableOpacity>
        </DefaultView>
      </DefaultView>


   <BottomSheet isVisible={visible} setIsVisible={() => setVisible(!visible)}>
       <DefaultView style={{
         width: 50,
         height: 50,
         borderRadius: 100,
         backgroundColor: "#5368f5",
         alignItems: "center",
         justifyContent: "center",
         alignSelf: "center",
         marginBottom: 10
       }}>
         <Icon name='information-outline' size={30} color="#fff" style={{
           zIndex: 9999
         }} />
       </DefaultView>
       <Text style={{
         textAlign: "left",
         fontSize: 16,
         fontWeight: "600",
         marginBottom: 15,
         marginTop: 15,
         color: 'rgba(0,0,0,0.8)',
       }} >Pautas de discusión</Text>
       <Text style={{
         textAlign: "left",
         fontSize: 12,
         fontWeight: "300",
         marginBottom: 20,
         color: 'rgba(0,0,0,0.8)',
       }} >Joobs es una plataforma para discutir una variedad de temas. Te agradeceríamos si pudieras seguir estas pautas al crear una discusión:</Text>
       
       <DefaultView style={{
        gap: 10,
        marginBottom: 45
       }}>
            <DefaultView style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 10
            }} >
                <Icon name='star' color="#5368f5" size={18} />
                <Text style={{
                    fontSize: 12,
                    fontWeight: "300",
                    color: 'rgba(0,0,0,0.8)',
                }} >Sé amable con aquellos que comentan tu discussión.</Text>
            </DefaultView>
            <DefaultView style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 10
            }} >
                <Icon name='star' color="#5368f5" size={18} />
                <Text style={{
                    fontSize: 12,
                    fontWeight: "300",
                    color: 'rgba(0,0,0,0.8)',
                }} >Elige el club más relevante para publicar tu discussión.</Text>
            </DefaultView>
            <DefaultView style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 10
            }} >
                <Icon name='star' color="#5368f5" size={18} />
                <Text style={{
                    fontSize: 12,
                    fontWeight: "300",
                    color: 'rgba(0,0,0,0.8)',
                }} >No promociones ni vendas ningún producto o servicio.</Text>
            </DefaultView>
            <DefaultView style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 10
            }} >
                <Icon name='star' color="#5368f5" size={18} />
                <Text style={{
                    fontSize: 12,
                    fontWeight: "300",
                    color: 'rgba(0,0,0,0.8)',
                }} >No publiques requisitos de contratación. Puedes usar <Text style={{ color: "#5368f5", fontWeight: "500" }} >la sección de trabajo</Text> en su lugar.</Text>
            </DefaultView>
       </DefaultView>

       <Button text='¡Entendido!' onPress={() => setVisible(false)} />
</BottomSheet>
    </View>
  );
};

export default CreatePost;
