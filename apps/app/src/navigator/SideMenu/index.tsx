import { createDrawerNavigator } from '@react-navigation/drawer'
import { AppNavigator } from '../AppNavigator';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { useMyClubs } from '../../hooks';

const Drawer = createDrawerNavigator();

const SideMenu = () => {
    const navigation = useNavigation<any>();
    const { clubs } = useMyClubs();
    return (
        <Drawer.Navigator drawerContent={(props) => <View style={{
            backgroundColor: "#121212",
            flex: 1,
            padding: 20
        }}>
            <Text style={{
                color: "#fff",
                marginTop: 50,
                textTransform: "uppercase",
                fontSize: 15
            }} >Mis Clubs</Text>

            <ScrollView style={{
                marginTop: 20
            }}>
                {clubs?.map(({ id, name }: { id: string, name: string }) => (
                    <TouchableOpacity style={{
                        marginBottom: 20
                    }} key={id} onPress={() => navigation.navigate("Club", {id: id})} >

                     <Text style={{
                        color: "#fff",
                        fontSize: 16
                     }}> {name} </Text> 
                    </TouchableOpacity>

                ))}
            </ScrollView>

            <View style={{
                    marginTop: "auto",
                    marginBottom: 10,
                    gap: 20,
                    borderTopWidth: 1,
                    borderTopColor: "rgba(255,255,255,.3)",
                    paddingTop: 15
            }}>

              <TouchableOpacity style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 5,
            
            }}>
                <Icon name='bookmark-outline' color="#fff" size={22} />
                <Text style={{
                    color: "#fff",
                    fontSize: 15
                }}>Guardados</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate("MyDiscussions")} style={{
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
            </View>

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