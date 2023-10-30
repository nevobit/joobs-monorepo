import axios from "axios";
import { useState } from "react";
import { launchImageLibrary } from "react-native-image-picker";

export const useUploadImage = () => {
    const [photo, setPhoto] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const uploadImage = async (file: any) => {
        setIsLoading(true);
        const formData = new FormData();
        formData.append('image', file);

        try {
            const { data } = await axios.post('https://partiaf-api.xyz/api/v3/upload/image', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'api-key': 'a0341d0de71a21b122a134576803f9fea2e9841a307b4e26f9240ac2f7d363ff3018a17f2d7f3ecb5a9fe62327e4eaf306864ec741e6432aa50faaf9d92aa6bd'
                },
            });
            setPhoto(data.url);
            setIsLoading(false);
        } catch (error: any) {
            setIsLoading(false);
            setError(JSON.stringify(error.message))
            console.log(error)
        }
    };

    const getPhoto = () => {
        launchImageLibrary({
            mediaType: 'photo'
        }, (resp) => {
            if (resp.didCancel) return;
            if (!resp.assets) return;
            if (!resp.assets[0].uri) return;

            const file = { uri: resp.assets[0].uri, name: resp.assets[0].fileName, type: resp.assets[0].type };
            uploadImage(file);
        })
    }


    if (error.length > 0) {
        setTimeout(() => {
            setError('');
        }, 10000);
    }

    return {
        photo,
        isLoading,
        error, getPhoto
    }
}