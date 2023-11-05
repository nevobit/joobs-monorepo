import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    header: {
        backgroundColor: '#121212',
        height: 30,
        paddingHorizontal: 15,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10
    },
    skill: {
        backgroundColor: 'rgba(0,0,0,.05)',
        borderRadius: 20,
        paddingHorizontal: 10,
        paddingVertical: 4,
        fontSize: 14,
        color: 'rgba(0,0,0,0.8)',
        fontWeight: '400'
    },
    lock: {
        backgroundColor: 'rgba(0,0,0,0.1)',
        borderRadius: 50,
        height: 70,
        width: 70,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: 'rgba(0,0,0,0.4)'
    },
    message: {
        fontSize: 14,
        fontWeight: '400',
        color: ' rgba(0,0,0,0.8)',
        textAlign: 'center',
        marginTop: 10
    },
    btn: {
        padding: 15,
        paddingTop: 0,
        backgroundColor: '#fff',
        marginTop: 'auto'
    },
    card: {
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 12,
        position: 'relative'
    },
    duration:{
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
        position: 'absolute',
        right: -15,
        top: -15,
        borderRadius: 12,
        padding: 10,
        borderTopStartRadius: 0,
        borderBottomEndRadius: 0,
    },
    text: {
        fontSize: 14,
        fontWeight: '400',
        color: 'rgba(0,0,0,0.8)',
        maxWidth: '80%'
    }
});

export default styles;