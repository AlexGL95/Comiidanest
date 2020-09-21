import moment = require('moment');
export function diaSiguiente(k: number, s:number){
    let d1 = moment().add(k+1+s, 'days').weekday();
    if(d1===6){
        s = s+2;
    }

    let d4 = moment().add(k+1+s, 'days').format('MMM Do YY');
}
