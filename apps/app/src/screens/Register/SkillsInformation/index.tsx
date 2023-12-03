import { View, Text, StatusBar, TouchableOpacity, ScrollView, SectionList } from 'react-native'
import React, { useState } from 'react'
import Field from '../../../components/Shared/Field'
import Input from '../../../components/Shared/Input'
import Button from '../../../components/Shared/Button'
import Icon from 'react-native-vector-icons/Ionicons'
import { Picker } from '@react-native-picker/picker';
import { saveUserInfo, signin } from '../../../store/features/auth'
import { useDispatch, useSelector } from 'react-redux'
import { useMutation } from '@apollo/client'
import { REGISTER_USER } from '../../../graphql/mutations'

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
  design: [
    'Diseño de moda',
    'Diseño grafico',
    'Illustrator',
    'Photoshop',
    'Canva',
    'Figma',
    'Adobe XD',
    'Webflow',
    'Interaction',
    'Diseño de Juegos',
    'UX Research',
    'Diseño UI',
    'Diseño UX',
    'Diseño de Producto',
    'Blender 3d',
    'SketchUP',
    'Revit',
    'Lumion',
    'UI/UX',
    'Unreal Engine',
    'SOLIDWORDS',
    'Maya',
    'Diseñador de Logo',
    'Lightroom',
    'Fusion 360',
    'CorelDRAW',
    'Miniatura Youtube',
    'Vray',
    'Wireframing',
    'Adobe Indesign',
    'Coraldraw',
    'Prototipado',
    'Ilustracion de Moda',
    'Rhinoceros 3D',
    'Diseño de Poster',
    'Diseño de paquetes',
    'User Research',
    'Diseño de Flyer'
  ],
  marketing: [
    'Content Writing',
    'Social Media Management',
    'Facebook Ads',
    'Google Ads',
    'Copywriting',
    'Influencer Marketing',
    'SEO',
    'Marketing Digital',
    'Creacion de contenido',
    'Digital Media Mamangement',
    'Email Marketing',
    'Marketing',
    'Performance Marketing',
    'Estrategia de Marca',
    'Marketing de Afiliados',
    'Social Media Marketing',
    'Instagram Ads',
    'Relaciones Publicas',
    'Social Media Analyst',
    'Instagram Page Manager',
    'Marketing de Producto',
    'Youtube Channel Manager',
    'Marketing de Contenido',
    'Publicidad'
  ],
  writing: [
    'Escritura de Guiones',
    'Mecanografía',
    'Escritura Científica',
    'Poesía',
    'Escritura de Articulos',
    'Copytyping',
    'Escritura optimizada para SEO',
    'Escritura Academica',
    'Escritura Creativa'
  ],
  finance: [
    'Hablar en Público',
    'Bolsa de Valores',
    'Finanzas',
    'Trading',
    'Estrategia de Negocios',
    'Liderazgo',
    'Análisis de Renta Variable',
    'Estadistica',
    'Inversión',
    'Shopify',
    'Desarrollo de Negocios',
    'Derecho (Leyes)',
    'Analista de Negocios',
    'Gestion',
    'MS Office',
    'MS Excel',
    'PowerPoint',
    'Manejo de Finanzas',
    'Analista Tecnico',
    'Ciencias Económicas',
    'Inglés Comunicativo',
    'Trabajo en equipo',
    'Gestion del Riesgo',
    'Options Trading',
    'Gestion del Tiempo',
    'Operaciones de RH',
    'PowerBI',
    'Investigación de Mercado',
    'Analsis de Datos'
  ],
  product: [
    'Analisis de Datos',
    'Psicologia',
    'Resolucion de Problemas',
    'Emprendimiento',
    'Google Analytics',
    'Product Growth',
    'Microsoft Word',
    'Tableu',
    'Estrategia de Producto',
    'Planificación de Presupuesto',
    'Estrategia de Precios',
    'Habilidades Interpersonales'
  ],
  video: [
    'Premier Pro',
    'Final Cut Pro',
    'iMovie',
    'Motion Graphics',
    'After Effects',
    'Edicion de Video',
    'Fotografia',
    'Instagram Reels',
    'Davince Resolve',
    'Videografia',
    'Edicion de Fotos',
    'Youtube Video',
    'Edicion de Audio',
    'Filmmaking',
    'Cinematografia',
    'VN',
    'Voz en Off'
  ]
};
  
const SkillsInformation = ({ navigation, params }: any) => {
    const [skills, setSkills] = useState<string[]>([]);
  
    const { userInfo } = useSelector((state: any) => state.auth);
    const [register, {loading, error}] = useMutation(REGISTER_USER);

    const dispatch = useDispatch();

    const onSubmit = async (e: any) => {
        e.preventDefault();
        try {

          const { data } = await register({
            variables: {
              data: {
              name: userInfo.name,
              email: userInfo.email,
              phone: userInfo.phone,
              photo: userInfo.photo,
              gender: userInfo.gender,
              born_date: userInfo.born_date,
              location: userInfo.location,
              skills
            }
            }
          });

          dispatch(signin({token: data.userRegister.token}));
        } catch (err) {
          console.log(err);
        }
      };

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
            backgroundColor: '#5368f5',
            flex: 1,
        }}>
            <StatusBar backgroundColor='#5368f5' />
            <Text style={{
                color: '#fff',
                fontWeight: '400',
                fontSize: 16,
                marginTop: 20,
                paddingHorizontal: 15
            }}>Ahora {userInfo.name} 🌟</Text>
            <Text style={{
                color: '#fff',
                fontWeight: '600',
                fontSize: 18,
                marginTop: 5,
                paddingHorizontal: 15

            }}>Selecciona tus habilidades</Text>

            <View style={{
                backgroundColor: '#fff',
                flex: 1,
                borderTopEndRadius: 20,
                borderTopStartRadius: 20,
                marginTop: 25,
                paddingHorizontal: 15,
            }}>

      <ScrollView>
        <View
          style={{
            marginTop: 35,
            gap: 20,
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
                      ? 'rgba(255,255,255,1)'
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
                      ? 'rgba(255,255,255,1)'
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
                        ? 'rgba(255,255,255,1)'
                        : 'rgba(0,0,0,0.8)',
                    }}
                  key={preference}>
                  {preference}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          <Text style={{
              color: 'rgba(0,0,0,0.8)',
              fontWeight: '600',
              fontSize: 20,
              textAlign: 'left',
            }}>
          Diseño
          </Text>
          <View
            style={{
              flexDirection: 'row',
              gap: 10,
              flexWrap: 'wrap',
            }}>
            {skillsData.design.map(preference => (
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
                        ? 'rgba(255,255,255,1)'
                        : 'rgba(0,0,0,0.8)',
                    }}
                  key={preference}>
                  {preference}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          <Text style={{
              color: 'rgba(0,0,0,0.8)',
              fontWeight: '600',
              fontSize: 20,
              textAlign: 'left',
            }}>
          Marketing
          </Text>
          <View
            style={{
              flexDirection: 'row',
              gap: 10,
              flexWrap: 'wrap',
            }}>
            {skillsData.marketing.map(preference => (
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
                        ? 'rgba(255,255,255,1)'
                        : 'rgba(0,0,0,0.8)',
                    }}
                  key={preference}>
                  {preference}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          <Text style={{
              color: 'rgba(0,0,0,0.8)',
              fontWeight: '600',
              fontSize: 20,
              textAlign: 'left',
            }}>
          Escritura
          </Text>
          <View
            style={{
              flexDirection: 'row',
              gap: 10,
              flexWrap: 'wrap',
            }}>
            {skillsData.writing.map(preference => (
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
                        ? 'rgba(255,255,255,1)'
                        : 'rgba(0,0,0,0.8)',
                    }}
                  key={preference}>
                  {preference}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          <Text style={{
              color: 'rgba(0,0,0,0.8)',
              fontWeight: '600',
              fontSize: 20,
              textAlign: 'left',
            }}>
          Finanzas y Negocios
          </Text>
          <View
            style={{
              flexDirection: 'row',
              gap: 10,
              flexWrap: 'wrap',
            }}>
            {skillsData.finance.map(preference => (
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
                        ? 'rgba(255,255,255,1)'
                        : 'rgba(0,0,0,0.8)',
                    }}
                  key={preference}>
                  {preference}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          <Text style={{
              color: 'rgba(0,0,0,0.8)',
              fontWeight: '600',
              fontSize: 20,
              textAlign: 'left',
            }}>
          Producto
          </Text>
          <View
            style={{
              flexDirection: 'row',
              gap: 10,
              flexWrap: 'wrap',
            }}>
            {skillsData.product.map(preference => (
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
                        ? 'rgba(255,255,255,1)'
                        : 'rgba(0,0,0,0.8)',
                    }}
                  key={preference}>
                  {preference}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          <Text style={{
              color: 'rgba(0,0,0,0.8)',
              fontWeight: '600',
              fontSize: 20,
              textAlign: 'left',
            }}>
            Video
          </Text>
          <View
            style={{
              flexDirection: 'row',
              gap: 10,
              flexWrap: 'wrap',
              marginBottom: 50,
            }}>
            {skillsData.video.map(preference => (
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
                        ? 'rgba(255,255,255,1)'
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
                 <Button loading={loading}  disabled={skills.length < 3} onPress={onSubmit} style={{
                    marginTop: 'auto',
                    marginBottom: 30
                }} text='Continuar ->' /> 
            </View>
        </View>
    )
}

export default SkillsInformation