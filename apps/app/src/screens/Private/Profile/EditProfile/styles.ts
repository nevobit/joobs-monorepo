import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    camera: {
        position: 'absolute',
        bottom: 0,
        left: 70,
        backgroundColor: 'rgba(255, 255, 255, .9)',
        height: 30,
        width: 30,
        borderRadius: 60,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 5, // Para Android
        shadowColor: 'black', // Para iOS
        shadowOffset: { width: 0, height: 2 }, // Para iOS
        shadowOpacity: 0.3, // Para iOS
        shadowRadius: 4, // Para iOS
    }
});

export default styles;