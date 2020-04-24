import * as moment from 'moment';

export function serverDate(clientDate) {
  const date = moment(clientDate);
  return date.format('YYYY-MM-DD');
}
