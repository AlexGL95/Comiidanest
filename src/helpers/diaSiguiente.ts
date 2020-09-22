//Modules
import moment = require('moment');

export function diaSiguiente(fecha: string, date: string){
    let s = 0;
    let d1 = moment(fecha, 'MMM Do YY').add(1, 'days').weekday();
    if(d1===6){
        s = s+2;
    }

    date = moment(fecha, 'MMM Do YY').add(1+s, 'days').format('MMM Do YY');
}
