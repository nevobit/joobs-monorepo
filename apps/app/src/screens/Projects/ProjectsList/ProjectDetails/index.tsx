import {
  View as DefaultView,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
  Pressable,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import Button from '../../../../components/Shared/Button';
import {useMutation, useQuery} from '@apollo/client';
import {PROJECT} from '../../../../graphql/queries/projects';
import Difficulty from '../../../../utils/color';
import {PARTICIPATE} from '../../../../graphql/mutations/participations';
import {Alert} from 'react-native';
import {useUser} from '../../../../hooks/users/useUser';
import {useIsParticipant} from '../../../../hooks/participants/useIsParticipant';
import styles from './styles';
import {View} from '../../../../components/Shared/View';
import {List} from 'react-native-paper';
import SyntaxHighlighter from 'react-native-syntax-highlighter';
import HTML from 'react-native-render-html';
import CodeHighlighter from "react-native-code-highlighter";
import Markdown, { MarkdownIt } from 'react-native-markdown-display';

const ProjectDetails = ({navigation, route}: any) => {
  const [refreshing, setRefreshing] = useState(false);
  const {user: userInfo, refetch: refetchUser} = useUser();
  const {data, loading, error, refetch} = useQuery(PROJECT, {
    variables: {
      projectId: route.params.id,
    },
  });
  const {isParticipant, refetch: refetchParticipant} = useIsParticipant(
    route.params.id,
  );

  const [
    participate,
    {data: dataCreating, loading: isCreating, error: creatingError},
  ] = useMutation(PARTICIPATE);

  const onSubmit = async () => {
    try {
      await participate({
        variables: {
          data: {
            user: userInfo.id,
            project: route.params.id,
          },
        },
      });
      await refetchParticipant();
    } catch (err) {
      if (creatingError) {
        Alert.alert('No se pudo crear la publicacion', creatingError.message);
        return;
      }
    }
    // refetch()
  };

  const [actualStage, setActualStage] = useState(0);

  const changeState = (value: number) => {
    if (value == 1) {
      if (actualStage < data?.project?.stages?.length - 1) {
        setActualStage(prev => prev + 1);
      }
    }
    if (value == -1) {
      if (actualStage > 0) {
        setActualStage(prev => prev - 1);
      }
    }
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    refetch().then(() => {
      setRefreshing(false);
    });
  }, []);

  useEffect(() => {
    refetchUser();
    refetch();
    refetchParticipant();
  }, [refetchParticipant, refetchUser, refetch]);

  return (
    <View>
      <DefaultView style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="chevron-back" size={25} color="#fff" />
        </TouchableOpacity>
        <Text
          style={{
            fontSize: 20,
            color: '#fff',
          }}>
          Detalles del Proyecto
        </Text>
      </DefaultView>
      <DefaultView
        style={{
          height: 10,
          backgroundColor: '#121212',
        }}
      />

      {loading ? (
        <ActivityIndicator
          style={{
            marginTop: 10,
          }}
          size="large"
          color="rgba(0,0,0,0.8)"
        />
      ) : (
        <ScrollView
          contentContainerStyle={{
            padding: 15,
            backgroundColor: '#f0f0f0',
          }}
          style={{
            backgroundColor: '#f0f0f0',
          }}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>
            <Pressable>

          <DefaultView style={styles.card}>
            <DefaultView
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <Text
                style={{
                  backgroundColor: Difficulty(data?.project?.difficulty),
                  padding: 5,
                  borderRadius: 10,
                  paddingHorizontal: 10,
                  fontSize: 12,
                  color: 'rgba(0,0,0,0.8)',
                }}>
                {data?.project.difficulty}
              </Text>
              <DefaultView
                style={[
                  styles.duration,
                  {
                    backgroundColor: Difficulty(data?.project?.difficulty),
                  },
                ]}>
                <Icon name="time-outline" size={25} color="rgba(0,0,0,0.8)" />
                <Text
                  style={{
                    fontSize: 14,
                    color: 'rgba(0,0,0,0.8)',
                  }}>
                  {data?.project.duration}
                </Text>
              </DefaultView>
            </DefaultView>
            <Text
              style={{
                fontSize: 18,
                fontWeight: '600',
                color: ' rgba(0,0,0,0.8)',
                marginTop: 15,
              }}>
              {data?.project.title}
            </Text>
            <Text
              style={{
                fontSize: 14,
                fontWeight: '400',
                color: ' rgba(0,0,0,0.8)',
                marginTop: 5,
              }}>
              {data?.project.description}
            </Text>

            <DefaultView
              style={{
                flexDirection: 'row',
                alignItems: 'flex-start',
                marginTop: 15,
              }}>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: '600',
                  color: 'rgba(0,0,0,0.8)',
                }}>
                Prerequisito:{' '}
              </Text>
              <Text numberOfLines={2} ellipsizeMode="tail" style={styles.text}>
                {data?.project.prerequisites}
              </Text>
            </DefaultView>

            <DefaultView
              style={{
                flexDirection: 'row',
                alignItems: 'flex-start',
                marginTop: 15,
              }}>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: '600',
                  color: ' rgba(0,0,0,0.8)',
                }}>
                Metodo de entrega:{' '}
              </Text>
              <Text numberOfLines={4} ellipsizeMode="tail" style={styles.text}>
                {data?.project.submission}
              </Text>
            </DefaultView>
            <Text
              style={{
                fontSize: 14,
                fontWeight: '400',
                color: ' rgba(0,0,0,0.8)',
                marginTop: 15,
              }}>
              Habilidades que aprenderás
            </Text>

            <DefaultView
              style={{
                flexDirection: 'row',
                gap: 10,
                flexWrap: 'wrap',
                marginTop: 10,
              }}>
              {data?.project?.skills.map((skill: string) => (
                <Text key={skill} style={styles.skill}>
                  {skill}
                </Text>
              ))}
            </DefaultView>
            {!isParticipant ? (
              <DefaultView
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginTop: 40,
                }}>
                <DefaultView style={styles.lock}>
                  <Icon name="lock-closed" size={40} color="rgba(0,0,0,0.8)" />
                </DefaultView>
                <Text style={styles.message}>
                  Las instrucciones solo son visibles para aquellos que
                  comienzan el proyecto
                </Text>
              </DefaultView>
            ) : (
              <DefaultView
                style={{
                  marginTop: 20,
                }}>
                <Text
                  style={{
                    fontSize: 14,
                    color: 'rgba(0,0,0,0.6)',
                  }}>
                  Instrucciones
                </Text>
                <DefaultView
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginTop: 15,
                  }}>
                  <TouchableOpacity
                    onPress={() => changeState(-1)}
                    style={{
                      borderWidth: 1,
                      borderColor: 'rgba(0,0,0,0.1)',
                      borderRadius: 5,
                      height: 45,
                      width: 45,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Text>
                      {' '}
                      <Icon name="chevron-back-outline" color="#121212" size={20} />{' '}
                    </Text>
                  </TouchableOpacity>
                  <DefaultView
                    style={{
                      borderWidth: 1,
                      borderColor: 'rgba(0,0,0,0.1)',
                      borderRadius: 5,
                      height: 45,
                      width: '60%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Text
                      style={{
                        fontSize: 14,
                        fontWeight: '500',
                        color: 'rgba(0,0,0,0.8)',
                      }}>
                      Etapa {actualStage + 1}
                    </Text>
                    <Text
                      style={{
                        fontSize: 12,
                        fontWeight: '400',
                        color: 'rgba(0,0,0,0.6)',
                      }}>
                      {data?.project?.stages[actualStage]?.steps?.length} paso
                      {data?.project?.stages[actualStage]?.steps?.length > 1 ? 's' : ''}
                    </Text>
                  </DefaultView>
                  <TouchableOpacity
                    onPress={() => changeState(1)}
                    style={{
                      borderWidth: 1,
                      borderColor: 'rgba(0,0,0,0.1)',
                      borderRadius: 5,
                      height: 45,
                      width: 45,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Text>
                      {' '}
                      <Icon name="chevron-forward-outline" color="#121212" size={20} />{' '}
                    </Text>
                  </TouchableOpacity>
                </DefaultView>
                <DefaultView
                  style={{
                    marginTop: 15,
                  }}>
                  <List.Section>
                    {data?.project?.stages[actualStage]?.steps.map(
                      (step: any, index: number) => (
                        <List.Accordion
                          title={'Paso ' + (index + 1)}
                          description={step.title}
                          right={() => <Icon name="add" size={23} />}>
                          
                        <Markdown  markdownit={
                MarkdownIt({typographer: true}).disable([ 'link', 'image' ])
              } >
                          {step.description}
                        </Markdown>

                        </List.Accordion>
                      ),
                    )}
                  </List.Section>
                </DefaultView>
              </DefaultView>
            )}
          </DefaultView>
          </Pressable>

        </ScrollView>
      )}

      <DefaultView style={styles.btn}>
        {!isParticipant && (
          <Button loading={isCreating} onPress={onSubmit} text="Comenzar" />
        )}
      </DefaultView>
    </View>
  );
};

export default ProjectDetails;
