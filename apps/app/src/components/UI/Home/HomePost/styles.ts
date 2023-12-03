import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
      backgroundColor: '#fff',
      padding: 15,
      borderRadius: 5,
      marginBottom: 15,
    },
    profileContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      gap: 10,
      alignItems: 'flex-start',
    },
    profileInfo: {
      flexDirection: 'row',
      gap: 8,
    },
    profileName: {
      fontSize: 14,
      fontWeight: '600',
      color: 'rgba(0,0,0,0.8)',
    },
    profileDate: {
        fontSize: 12,
        color: 'rgba(0,0,0,0.8)',
      },
      clubContainer: {
        flexDirection: 'row',
        alignItems: 'center',
      
        gap: 7,
        padding: 5,
        paddingHorizontal: 10,
        borderRadius: 20,
      },
      clubText: {
        color: 'rgba(0,0,0,.8)',
        fontSize: 12,
        fontWeight: '500',
      },
      postTitle: {
        fontSize: 16,
        fontWeight: '500',
        color: 'rgba(0,0,0,0.8)',
        marginTop: 10,
        marginBottom: 8,
      },
      postText: {
        fontSize: 15,
        fontWeight: '400',
        color: 'rgba(0,0,0,0.6)',
        marginBottom: 15,
      },
      postImage: {
        flex: 1,
        width: '100%',
        height: 300,
        resizeMode: 'contain',
      },
      postFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderTopWidth: 1,
        borderTopColor: 'rgba(0,0,0,0.1)',
        paddingTop: 10,
        paddingHorizontal: 5,
      },
      likeContainer: {
        flexDirection: 'row',
        gap: 20,
      },
      likeButton: {
        flexDirection: 'row',
        gap: 5,
        alignItems: 'center',
      },
      dislikeButton: {
        flexDirection: 'row',
        gap: 5,
        alignItems: 'center',
        transform: [{ rotate: '180deg' }],
      },
      likeCount: {
        fontSize: 14,
        color: 'rgba(0,0,0,0.8)',
      },
      commentContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 7,
      },
      commentCount: {
        fontSize: 14,
        color: 'rgba(0,0,0,0.8)',
      },
      shareButton: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 7,
      },    
});

export default styles;