interface Dictionary {
    [key: string]: string;
}

const dictionary: Dictionary = {
    monthly: 'Mensual',
    project: 'Por proyecto'
    // Agrega más palabras según sea necesario
};

function translateToSpanish(text: string): string {
    // Convertir a minúsculas para asegurar que las claves estén en minúsculas
    const lowerText = text?.toLowerCase();

    // Buscar la palabra en el diccionario
    if (lowerText in dictionary) {
        return dictionary[lowerText];
    } else {
        // Si la palabra no se encuentra en el diccionario, devuelve el texto original
        return text;
    }
}

export default translateToSpanish;