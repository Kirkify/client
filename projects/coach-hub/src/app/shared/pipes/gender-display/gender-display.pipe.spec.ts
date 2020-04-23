import { TimeFromNowPipe } from './time-from-now.pipe';
import * as moment from 'moment';

describe('TimeFromNowPipe', () => {
  let pipe: TimeFromNowPipe;

  beforeEach(() => pipe = new TimeFromNowPipe());

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('calculate time from yesterday', () => {
    const yesterday = moment.utc().subtract(24, 'hours').format();
    expect(pipe.transform(yesterday)).toBe('a day ago');
  });

  it('calculate time from one week ago', () => {
    const yesterday = moment.utc().subtract(7, 'days').format();
    expect(pipe.transform(yesterday)).toBe('7 days ago');
  });

  it('calculate time from one week ago', () => {
    const yesterday = moment.utc().subtract(40, 'days').format();
    expect(pipe.transform(yesterday)).toBe('a month ago');
  });

  it('calculate time from one year ago', () => {
    const yesterday = moment.utc().subtract(1, 'year').format();
    expect(pipe.transform(yesterday)).toBe('a year ago');
  });
});
