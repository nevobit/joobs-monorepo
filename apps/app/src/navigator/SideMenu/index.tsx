import { createDrawerNavigator } from '@react-navigation/drawer'
import { AppNavigator } from '../AppNavigator';
import { Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const Drawer = createDrawerNavigator();

const SideMenu = () => {
    const navigation = useNavigation();
    return (
        <Drawer.Navigator drawerContent={(props) => <View style={{
            backgroundColor: "#121212",
            flex: 1,
            padding: 20
        }}>

            <TouchableOpacity style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 5,
                marginTop: "auto",
                marginBottom: 20
            }}>
                <Icon name='person-outline' color="#fff" size={22} />
                <Text style={{
                    color: "#fff",
                    fontSize: 15
                }}>Mis Discusiones</Text>
            </TouchableOpacity>
        </View>} >
            <Drawer.Screen  
            

            options={{
            headerShown: false,
            drawerType: "slide"
          }} name='Init' component={AppNavigator} />
        </Drawer.Navigator>
    )
} 

export default SideMenu;