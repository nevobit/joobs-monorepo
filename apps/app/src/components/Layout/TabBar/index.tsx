/* eslint-disable @typescript-eslint/no-unused-vars */
import {BottomTabBarProps} from '@react-navigation/bottom-tabs';
import React from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Animated,
  Image,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';

const TabBar = ({state, navigation}: BottomTabBarProps) => {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingTop: 10,
        paddingBottom: insets.bottom + 10,
        paddingLeft: insets.left,
        paddingRight: insets.right,
        position: 'relative',
        backgroundColor: '#fff',
      }}>
      {state.routes.map((route, index) => {
        const focused = state.index === index;
        const isActions = route.name === 'Partiaf';
        let itemColor = 'rgba(0, 0, 0,0.)';

        let iconName = '';
        let tabName = '';
        switch (route.name) {
          case 'Home':
            iconName = focused ? 'home-sharp' : 'home-outline';
            tabName = 'Inicio'
            itemColor = !focused ? 'rgba(0, 0, 0,0.8)' :'#5169f6'
            break;
          case 'Projects':
            iconName = focused ? 'grid' : 'grid-outline';
            tabName = 'Proyectos'
            itemColor = !focused ? 'rgba(0, 0, 0,0.8)' :'#5169f6'
            break;
          case 'Work':
            iconName = focused ? 'briefcase' : 'briefcase-outline';
            tabName = 'Trabajo'
            itemColor = !focused ? 'rgba(0, 0, 0,0.8)' :'#5169f6'
            break;
          case 'Events':
            iconName = focused ? 'calendar-sharp' : 'calendar-outline';
            tabName = 'Eventos'
            itemColor = !focused ? 'rgba(0, 0, 0,0.8)' :'#5169f6'
            break;
          case 'Profile':
            iconName = focused ? 'person' : 'person-outline';
            tabName = 'Perfil'
            itemColor = !focused ? 'rgba(0, 0, 0,0.8)' :'#5169f6'
            break; 
          default:
            break;
        }

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });
          if (!focused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <Animated.View key={route.name}>
            <TouchableOpacity onPress={onPress}>
                <View style={{
                  alignItems: 'center',
                  }}>                  
                    <Icon name={iconName} size={22} color={itemColor} />
                </View>
                <Text style={{
                  fontSize: 12,
                  color: itemColor
                }}>{tabName}</Text>
            </TouchableOpacity>
          </Animated.View>
        );
      })}
    </View>
  );
};

export default TabBar;