type Colores = {
    [key: string]: string
};

const Difficulty = (difficulty: string): string => {
    const colors: Colores = {
        Facil: "rgba(152, 251, 152, 0.6)", 
        Intermedio: "rgba(247, 254, 46, 0.6)",
        Moderada: "rgba(247, 254, 46, 0.6)", 
        Dificil: "rgba(255, 182, 193, 0.6)", 
        'Difícil': "rgba(255, 182, 193, 0.6)"
    };

    return colors[difficulty];
}


export default Difficulty;