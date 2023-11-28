import Share from "react-native-share";

const share = async (title: string) => {
    const options = {
      message: `Hey!, mira esta oportunidad para ${title}`,
      url: 'https://joobs.lat'
    }

    try {
      await Share.open(options)
    } catch (e) {
      console.log(e);
      // Alert.alert('No se puede compartir', String(e))
    }

}

export default share;