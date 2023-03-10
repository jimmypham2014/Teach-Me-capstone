
const getDate = (date, type=false, ) => {

    // newDate = new Date(newDate.getTime() + newDate.getTimezoneOffset() * 60000)
    if (!String(date).includes('-')){
      date = new Date(date)
    }else{
      if(typeof date != 'object'){
        date = new Date([date, "00:00"])
      }
    }

    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "June",
      "July",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    let day;
    let month;

    if ( type == true){
      day = date.getUTCDate();
      month = date.getUTCMonth();
    }else{
      day = date.getDate();
      month = date.getMonth();
    }
    const year = date.getFullYear();
    // if (day < 10) day = `0${day}`
    let result = `${months[month]} ${day}, ${year}`;

    return result
};

export default getDate;