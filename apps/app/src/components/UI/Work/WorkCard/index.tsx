import { View, Text } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/Ionicons'
import { DivisaFormater, fromNow } from '../../../../utils'
import translateToSpanish from '../../../../utils/frecuency-formater';

interface Props{
  name: string;
  type: string;
  title: string;
  money: number;
  created_at: string;
  remuneration: {
    value: number;
    frecuency: string;
  }
}
const WorkCard = ({ name, type, title, created_at, remuneration }: Props) => {

  return (
    
    <View style={{
      backgroundColor: '#fff',
      // height: 40,
      borderRadius: 10,
      padding: 15,
      marginBottom: 15,
    }}>
       <View style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 10,
        alignItems: 'flex-start',
      }}>
        <View style={{
          flexDirection: 'row',
          gap: 8
        }}>

        <View style={{
          backgroundColor: '#d5bffd',
          height: 30,
          width: 30,
          borderRadius: 50,
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <Text style={{
            fontWeight: '600',
            fontSize: 16,
            color: 'rgba(0,0,0,0.8)'
          }}>{name?.charAt(0)}</Text>
        </View>
        <View style={{
        }}>
          <Text style={{
            fontSize: 12,
            color: 'rgba(0,0,0,0.8)'
          }}>{name}</Text>
          <Text style={{
            fontSize: 12,
            color: 'rgba(0,0,0,0.8)'
          }}>{fromNow(created_at)}</Text>
        </View>
        </View>

      

        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: '#fff7e3',
          gap: 7,
          padding: 5,
          paddingHorizontal: 10,
          borderRadius: 20
        }}>
          <Text style={{
            color: 'rgba(0,0,0,.8)',
            fontSize: 12,
            fontWeight: '500'
          }}>{type}</Text>
        </View>
      </View>

      <Text style={{
        fontSize: 16,
        fontWeight: '500',
        color: 'rgba(0,0,0,0.8)',
        marginTop: 10,
        marginBottom: 20
      }}>{title}</Text>
      
      <View style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderTopWidth: 1,
        borderTopColor: 'rgba(0,0,0,0.1)',
        paddingTop: 8
      }}>
        <View style={{
          flexDirection: 'row',
          gap: 7,
          alignItems: 'center'
        }}>
          <Icon name='cash-outline' size={20} color='rgba(0,0,0,0.8)' />
          <Text style={{
            fontSize: 12,
            color: 'rgba(0,0,0,0.8)'
          }}>{DivisaFormater({value: remuneration?.value})} / {translateToSpanish(remuneration?.frecuency)}</Text>
        </View>

        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: 7
        }}>
          <Text style={{
            color: 'green'
          }}>Compartir</Text>
          <Icon name='logo-whatsapp' color='green' />
        </View>
      </View>
    </View>
  )
}

export default WorkCard