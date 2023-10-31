import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState } from 'react'
import Header from '../Header'
import Input from '../../../../../components/Shared/Input'
import Button from '../../../../../components/Shared/Button'


const skillsData = {
    development: [
      'Flutter',
      'React JS',
      'HTML',
      'CSS',
      'Javascript',
      'React Native',
      'Android Developer',
      'Wordpress',
      'AngularJS',
      'IOS Developer',
      'Web Development',
      'Frontend Development',
      'Next Js',
      'Full Stack Web Development',
      'MERN Stack',
      'Laravel',
      'Firebase',
      'Tailwind CSS',
      'Vue js',
      'Wix',
      'SCSS',
      'Redux',
      'Ecommerce Website',
      'App Development',
    ],
    sales: [
      'Manejo de Eventos',
      'Entrada de Datos',
      'Telellamada',
      'Ventas',
      'Operaciones',
      'CRM',
      'Asistencia Virtual',
      'Servico al Cliente',
      'Traduccion',
      'Televentas',
    ],
    tech: [
      'NodeJS',
      'MongoDB',
      'Cloud Computing',
      'Python',
      'Inteligencia Aritficial',
      'Machine Learning',
      'Java',
      'C++',
      'C',
      'Github',
      'AWS',
      'NoSQL',
      'SQL',
      'Django',
      'Spring',
      'Software Testing',
      'Arquitectura de Software',
      'C#',
      'Seguridad Informatica',
      'Ciencia de Datos',
      'NLP',
      'SaaS',
      'Blockchain Development',
      'php',
      'DevOps',
      'Salesforce Development',
      'MySQL',
      'Computer Science',
      'Sistemas Embebidos',
      'Game Development',
      'Spring Boot',
      'Docker',
      'Typescript',
      'Web3',
      'PostgreSQL',
      'Solidity',
      'IoT',
      'Express.js',
      'Rest API',
      'Programacion Orientada a Objetos',
      'Soporte IT',
      'Jupyter Notebook',
      'Kubernetes',
      'Linux',
      'Web Scraping',
      'Tensorflow',
      'Deep Learning',
      'Biotecnologia',
  
  
  
    ],
  };
    

const Skills = ({navigation, route}: any) => {
    const [skills, setSkills] = useState<string[]>([]);

    const addSkill = (name: string) => {
        setSkills(prev => {
          const updatedSkills = [...prev];
    
          if (updatedSkills?.includes(name)) {
            // Si el nombre ya está en el arreglo, se elimina
            updatedSkills?.splice(updatedSkills.indexOf(name), 1);
          } else {
            // Si el nombre no está en el arreglo, se agrega
            updatedSkills.push(name);
          }
    
          return updatedSkills;
        })
      }
    return (
        <View style={{
            backgroundColor: '#121212',
            flex: 1,
        }}>
            <View style={{
                paddingHorizontal: 15,
                paddingVertical: 20,
                backgroundColor: '#fff',
                flex: 1,
                borderTopRightRadius: 30,
                borderTopLeftRadius: 30,
            }}>

                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: 15
                }}>

                    <Text style={{
                        fontWeight: '600',
                        fontSize: 18,
                        color: 'rgba(0,0,0,0.8)'
                    }}>Habilidades requeridas</Text>
                    <Text style={{
                        fontWeight: '400',
                        fontSize: 14,
                        color: 'rgba(0,0,0,0.8)'
                    }}>0/120</Text>
                </View>

                
                
      <ScrollView>
        <View
          style={{
            marginTop: 10,
            gap: 20,
            paddingHorizontal: 10,
          }}>
          <Text
            style={{
              color: 'rgba(0,0,0,0.8)',
              fontWeight: '600',
              fontSize: 20,
              textAlign: 'left',
            }}>
            Desarrollo Web y Móvil
          </Text>
          <View
            style={{
              flexDirection: 'row',
              gap: 10,
              flexWrap: 'wrap',
            }}>
            {skillsData.development.map(preference => (
              <TouchableOpacity
                key={preference}
                onPress={() => addSkill(preference)}
                style={{
                  backgroundColor: skills.includes(preference)
                    ? '#5368f5'
                    : 'rgba(0,0,0,0.1)',
                  borderRadius: 15,
                  padding: 5,
                  paddingHorizontal: 20
                }}>
                <Text
                  style={{
                    fontSize: 13,
                    color: skills.includes(preference)
                      ? 'rgba(0,0,0,1)'
                      : 'rgba(0,0,0,0.8)',
                  }}>
                  {preference}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          <Text
            style={{
              color: 'rgba(0,0,0,0.8)',
              fontWeight: '600',
              fontSize: 20,
              textAlign: 'left',
            }}>
            Ventas y Operaciones
          </Text>
          <View
            style={{
              flexDirection: 'row',
              gap: 10,
              flexWrap: 'wrap',
            }}>
            {skillsData.sales.map(preference => (
              <TouchableOpacity
                key={preference}
                onPress={() => addSkill(preference)}
                style={{
                  backgroundColor: skills.includes(preference)
                    ? '#5368f5'
                    : 'rgba(0,0,0,0.1)',
                  borderRadius: 15,
                  padding: 5,
                  paddingHorizontal: 20
                }}>
                <Text
                  style={{
                    fontSize: 13,
                    color: skills.includes(preference)
                      ? 'rgba(0,0,0,1)'
                      : 'rgba(0,0,0,0.8)',
                  }}>
                  {preference}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text
            style={{
              color: 'rgba(0,0,0,0.8)',
              fontWeight: '600',
              fontSize: 20,
              textAlign: 'left',
            }}>
            Tecnologia
          </Text>
          <View
            style={{
              flexDirection: 'row',
              gap: 10,
              flexWrap: 'wrap',
              marginBottom: 100,
            }}>
            {skillsData.tech.map(preference => (
              <TouchableOpacity
                key={preference}
                onPress={() => addSkill(preference)}
                style={{
                  backgroundColor: skills.includes(preference)
                    ? '#5368f5'
                    : 'rgba(0,0,0,0.1)',
                  borderRadius: 15,
                  padding: 5,
                  paddingHorizontal: 20
                }}>
                <Text
                     style={{
                      fontSize: 13,
                      color: skills.includes(preference)
                        ? 'rgba(0,0,0,1)'
                        : 'rgba(0,0,0,0.8)',
                    }}
                  key={preference}>
                  {preference}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: 'auto',
                    gap: 10
                }} >
                    <TouchableOpacity style={{
                        width: '40%',
                        borderWidth: 1,
                        borderColor: 'rgba(0,0,0,0.3)',
                        borderRadius: 50,
                        height: 40,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginTop: 20
                    }}>
                        <Text style={{
                            color: 'rgba(0,0,0,0.8)',
                            fontWeight: '500',
                            fontSize: 14
                        }}>Volver</Text>
                    </TouchableOpacity>

                <Button onPress={() => navigation.navigate('Role', { title: route.params.title, skills: skills })}  text='Rol ->'  style={{
                    width: '60%'
                }} />

</View>

            </View>

        </View>
    )
}

export default Skills