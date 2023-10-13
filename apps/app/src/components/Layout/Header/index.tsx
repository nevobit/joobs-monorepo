import { View, Text, StatusBar, TouchableOpacity } from 'react-native'
import React from 'react'
import styles from './styles'
import Icon  from 'react-native-vector-icons/Ionicons'

interface Props{
    title: string
}

const Header = ({title}: Props) => {
  return (
    <View style={{
        backgroundColor: '#121212',
        padding: 10,
        paddingBottom: 15
    }}>
        <StatusBar backgroundColor='#121212' barStyle='light-content' />
      <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>

      <Text style={styles.title}>{title}</Text>
        <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 15
        }}>
            <TouchableOpacity>
                <Icon name='logo-whatsapp' size={24} color='#fff' />            
            </TouchableOpacity>

            <TouchableOpacity>
                <Icon name='notifications-outline' size={24} color='#fff' />            
            </TouchableOpacity>

            <TouchableOpacity>
                <Icon name='chatbubble-outline' size={24} color='#fff' />            
            </TouchableOpacity>


        </View>
      </View>

    </View>
  )
}

export default Header;