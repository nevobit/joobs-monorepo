import { Alert, Linking, Platform } from "react-native";

const sendWhatsApp = (message: string) => {
    let msg = message;
    let phoneWithCountryCode = "573226589914";
    let mobile =
      Platform.OS == "ios" ? phoneWithCountryCode : "+" + phoneWithCountryCode;
    if (mobile) {
      if (msg) {
        let url = "whatsapp://send?text=" + msg + "&phone=" + mobile;
        Linking.openURL(url)
          .then(data => {
            console.log("WhatsApp Opened");
          })
          .catch(() => {
            Alert.alert("Asegurate de tener whatsapp instalado");
          });
      } else {
        // alert("Please insert message to send");
      }
    } else {
    //   alert("Please insert mobile no");
    }
  };

  export default sendWhatsApp;