import {View, Text, Image, TouchableOpacity, Alert} from 'react-native';
import React, {useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {fromNow} from '../../../../utils';
import Share from 'react-native-share';
import {useMutation} from '@apollo/client';
import {DELETELIKE, LIKE} from '../../../../graphql/mutations/likes';
import {LIKES} from '../../../../graphql/queries/likes';
import {useUser} from '../../../../hooks/users/useUser';
import {useSelector} from 'react-redux';
import {DISCUSSIONS} from '../../../../graphql/queries';
import {getColorForClub} from '../../../../screens/Home/club-color';
import styles from './styles';
import { DELETEDISLIKE, DISLIKE } from '../../../../graphql/mutations/dislikes';
interface Props {
  name: string;
  id: string;
  type: string;
  title: string;
  money?: number;
  text: string;
  image?: string;
  created_at: string;
  comments: number;
  likes: number;
  liked: boolean;
  disliked: boolean;
  photo?: string;
  refetch: any;
  discussionId: string;
  navigation: any;
}


const HomePost = ({
  refetch,
  id,
  navigation,
  liked,
  likes,
  discussionId,
  comments,
  name,
  photo,
  disliked,
  type,
  title,
  image,
  created_at,
  text,
}: Props) => {
  const { user: userInfo, refetch: refetchUser } = useUser();
  const { user } = useSelector((state: any) => state.auth);

  const share = async () => {
    const options = {
      message: `Hey, estoy teniendo una discusión interesante sobre ${title}`,
      url: 'https://joobs.lat',
    };

    try {
      await Share.open(options);
    } catch (error) {
      console.error(error);
      Alert.alert('Error al compartir', 'No se puede compartir en este momento. Inténtalo de nuevo más tarde.');
    }
  };

  const [like, { loading: likeLoading, error: likeError }] = useMutation(LIKE, {
    refetchQueries: [{ query: DISCUSSIONS }],
  });

  const [likeDelete, { loading: likeDeleteLoading, error: likeDeleteError }] = useMutation(DELETELIKE, {
    refetchQueries: [{ query: DISCUSSIONS }],
  });

  const [dislike, { loading: dislikeLoading, error: dislikeError }] = useMutation(DISLIKE, {
    refetchQueries: [{ query: DISCUSSIONS }],
  });

  const [dislikeDelete, { loading: dislikeDeleteLoading, error: dislikeDeleteError }] = useMutation(DELETEDISLIKE, {
    refetchQueries: [{ query: DISCUSSIONS }],
  });

  const onSubmitLike = async () => {
    if (!liked) {
      await like({
        variables: {
          data: {
            discussionId: discussionId,
            userId: userInfo.id,
          },
        },
      });

      await refetchUser();
      await refetch();
    } else {
      await likeDelete({
        variables: {
          data: {
            discussionId: discussionId,
            userId: userInfo.id,
          },
        },
      });

      await refetchUser();
      await refetch();
    }
  };

  const onSubmitdISLike = async () => {
    if (!disliked) {
      await dislike({
        variables: {
          data: {
            discussionId: discussionId,
            userId: userInfo.id,
          },
        },
      });

      await refetchUser();
      await refetch();
    } else {
      await dislikeDelete({
        variables: {
          data: {
            discussionId: discussionId,
            userId: userInfo.id,
          },
        },
      });

      await refetchUser();
      await refetch();
    }
  };

  const renderProfileImage = () => {
    if (photo) {
      return (
        <Image
          source={{ uri: photo }}
          width={30}
          height={30}
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
            height: 30,
            width: 30,
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
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.navigate('UserProfile', { id: id })}
        style={styles.profileContainer}>
        <View style={styles.profileInfo}>
          {renderProfileImage()}
          <View>
            <Text style={styles.profileName}>{name}</Text>
            <Text style={styles.profileDate}>{fromNow(created_at)}</Text>
          </View>
        </View>

        <View style={[styles.clubContainer, { backgroundColor: getColorForClub(type) }]}>
          <Text style={styles.clubText}>{type}</Text>
        </View>
      </TouchableOpacity>

      <Text style={styles.postTitle}>{title}</Text>

      <Text style={styles.postText}>{text}</Text>

      {image && (
        <Image
          source={{ uri: image[0] }}
          style={styles.postImage}
        />
      )}

      <View style={styles.postFooter}>
        <View style={styles.likeContainer}>
          <TouchableOpacity
            disabled={likeDeleteLoading || likeLoading}
            onPress={onSubmitLike}
            style={styles.likeButton}>
            <Icon
              name={liked ? 'triangle' : 'triangle-outline'}
              size={20}
              color="rgba(0,0,0,0.8)"
            />
            <Text style={styles.likeCount}>{likes}</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={onSubmitdISLike} style={styles.dislikeButton}>
            <Icon  name={disliked ? 'triangle' : 'triangle-outline'} size={20} color="rgba(0,0,0,0.8)" />
          </TouchableOpacity>
        </View>

        <View style={styles.commentContainer}>
          <Icon name="chatbubble-outline" size={20} color="rgba(0,0,0,0.8)" />
          <Text style={styles.commentCount}>{comments}</Text>
        </View>

        <TouchableOpacity onPress={share} style={styles.shareButton}>
          <Icon name="share-social-outline" size={25} color="rgba(0,0,0,0.8)" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HomePost;
