export const fromNow = (d: any) => {
  
    const date = new Date(parseInt(d, 10));
    const currentDate = new Date();
    const timeDiff = currentDate.getTime() - date.getTime();
    const secondsDiff = Math.round(timeDiff / 1000);
    const minutesDiff = Math.round(secondsDiff / 60);
    const hoursDiff = Math.round(minutesDiff / 60);
    const daysDiff = Math.round(hoursDiff / 24);
    
    let formattedDate = '';
    if (daysDiff > 0) {
      formattedDate = `Hace ${daysDiff} ${daysDiff === 1 ? 'día' : 'días'}`;
    } else if (hoursDiff > 0) {
      formattedDate = `Hace ${hoursDiff} ${hoursDiff === 1 ? 'hora' : 'horas'}`;
    } else if (minutesDiff > 0) {
      formattedDate = `Hace ${minutesDiff} ${minutesDiff === 1 ? 'minuto' : 'minutos'}`;
    } else {
      formattedDate = `Hace ${secondsDiff} ${secondsDiff === 1 ? 'segundo' : 'segundos'}`;
    }
    
    return formattedDate;
    }