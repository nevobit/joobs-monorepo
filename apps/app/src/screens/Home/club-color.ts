const colors: string[] = [
    'rgba(94, 53, 177, 0.3)', // Rosa claro
    'rgba(0, 121, 107, 0.3)', // Lila claro
    '#E6EE9C70', // Amarillo claro
    '#C5E1A550', // Lima claro
    '#A5D6A750', // Verde claro
    '#80CBC450', // Verde menta
    'rgba(230, 81, 0, 0.3)', // Azul claro
    'rgba(96, 125, 139, 0.3)', // Turquesa claro
    'rgba(0, 96, 100, 0.3)', // Azul cielo
    'rgba(40, 53, 147, 0.3)', // Lavanda
    '#C5E1A550', // Lima claro
    '#A5D6A750', // Verde claro
    '#80CBC450', // Verde m
  ];

export function getColorForClub(clubName: string): string {
    // Puedes ajustar esta lógica según tus necesidades específicas
    switch (clubName) {
      case 'Tech Club':
        return colors[6];
      case 'Diseño Club':
        return colors[2];
      // Agrega más casos según sea necesario
      default:
        return colors[0]; // Devuelve undefined si el nombre del club no coincide con ningún caso
    }
  }
  