import {
  TouchableOpacity,
  ScrollView,
  RefreshControl,
  Pressable,
  View as DefaultView,
  Text,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {HomePoll, HomePost} from '../../../components/UI';
import Icon from 'react-native-vector-icons/Ionicons';
import {Instagram} from 'react-content-loader/native';
import {useDiscussions, useMyClubs, useUpdateUser} from '../../../hooks';
import styles from './styles';
import { getFcmToken } from '../../../utils/fcmHelper';

const Discussions = ({navigation, search}: any) => {
  const [refreshing, setRefreshing] = useState(false);
  const [option, setOption] = useState('forme');
  const {discussions, isLoading, error, refetch} = useDiscussions(option);
  const {clubs, isLoading: isLoadingClubs} = useMyClubs();
  const userClubIds = clubs?.map((club: any) => club.id);

  const changeOption = async (op: string) => {
    setOption(op);
  };

  const { updateUser, isUpdating } = useUpdateUser();

  const submit = async () => {
    const token = getFcmToken();
      try{
          await updateUser({variables: {
              data: { token }
          }});
      }catch(err){
          console.log(err)
      }
  }
  useEffect(() => {
    submit()
  }, []); 

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await refetch({data: {option, userClubs: userClubIds}});
    setRefreshing(false);
  }, [option, refetch]);

  return (
    <>
      <ScrollView
        contentContainerStyle={{
          backgroundColor: '#f0f0f0',
          marginBottom: 10,
        }}
        style={styles.container}
        refreshControl={
          <RefreshControl
            tintColor="#000"
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }>
        <DefaultView
          style={{
            backgroundColor: 'rgba(255,255,255,1)',
            marginBottom: 15,
            flexDirection: 'row',
            alignItems: 'center',
            gap: 20,
            height: 50,
            paddingHorizontal: 15,
            paddingTop: 10,
          }}>
          <TouchableOpacity
            onPress={() => changeOption('forme')}
            style={{
              backgroundColor:
                option == 'forme'
                  ? 'rgba(81, 105, 246, 0.2)'
                  : 'rgba(0,0,0,0.1)',
              paddingHorizontal: 20,
              paddingVertical: 5,
              borderRadius: 50,
            }}>
            <Text
              style={{
                color: 'rgba(0,0,0,0.9)',
                fontWeight: '400',
                fontSize: 13,
              }}>
              Para ti
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => changeOption('popular')}
            style={{
              backgroundColor:
                option == 'popular'
                  ? 'rgba(81, 105, 246, 0.2)'
                  : 'rgba(0,0,0,0.1)',
              paddingHorizontal: 20,
              paddingVertical: 5,
              borderRadius: 50,
            }}>
            <Text
              style={{
                color: 'rgba(0,0,0,0.9)',
                fontWeight: '400',
                fontSize: 13,
              }}>
              Popular
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => changeOption('latest')}
            style={{
              backgroundColor:
                option == 'latest'
                  ? 'rgba(81, 105, 246, 0.2)'
                  : 'rgba(0,0,0,0.1)',
              paddingHorizontal: 20,
              paddingVertical: 5,
              borderRadius: 50,
            }}>
            <Text
              style={{
                color: 'rgba(0,0,0,0.9)',
                fontWeight: '400',
                fontSize: 13,
              }}>
              Lo último
            </Text>
          </TouchableOpacity>
        </DefaultView>

        {isLoading || isLoadingClubs ? (
          <DefaultView
            style={{
              flex: 1,
              gap: 10,
            }}>
            {['1', '2', '3', '4'].map(v => (
              <Instagram key={v} backgroundColor="#fff" />
            ))}
          </DefaultView>
        ) : (
          <ScrollView
            style={{
              marginBottom: 50,
            }}>
            {discussions
              ?.slice()
              .reverse()
              .filter((disscusion: any) =>
                disscusion.title
                  ?.toLowerCase()
                  .includes(search?.toLowerCase() || ''),
              )
              .map((discussion: any) => (
                <Pressable
                  key={discussion.id}
                  onPress={() =>
                    navigation.navigate('Discussion', {id: discussion.id})
                  }>
                  {discussion?.isPoll ? (
                    <HomePoll
                      headline={discussion.user?.headline}
                      voters={discussion.voters}
                      poll={discussion.poll}
                      navigation={navigation}
                      id={discussion.user.id}
                      refetch={refetch}
                      discussionId={discussion.id}
                      liked={discussion.liked}
                      disliked={discussion.disliked}
                      likes={discussion.likes}
                      comments={discussion.comments}
                      photo={discussion?.user?.photo}
                      title={discussion.title}
                      image={discussion?.images}
                      text={discussion.description}
                      created_at={discussion.created_at}
                      name={discussion.user.name}
                      type={discussion.club.name}
                    />
                  ) : (
                    <HomePost
                      headline={discussion.user?.headline}
                      isPoll={discussion.isPoll}
                      link={discussion.link}
                      navigation={navigation}
                      id={discussion.user.id}
                      refetch={refetch}
                      discussionId={discussion.id}
                      liked={discussion.liked}
                      disliked={discussion.disliked}
                      likes={discussion.likes}
                      comments={discussion.comments}
                      photo={discussion?.user?.photo}
                      title={discussion.title}
                      image={discussion?.images}
                      text={discussion.description}
                      created_at={discussion.created_at}
                      name={discussion.user.name}
                      type={discussion.club.name}
                    />
                  )}
                </Pressable>
              ))}
          </ScrollView>
        )}
      </ScrollView>
      <TouchableOpacity
        onPress={() => navigation.navigate('CreatePost')}
        style={styles.button}>
        <Icon name="pencil" size={22} color="#fff" />
      </TouchableOpacity>
    </>
  );
};

export default Discussions;
