import { FullNamePipe } from './full-name.pipe';
import { UserInterface } from '../../../core/services/authentication/models/user.interface';

describe('FullNamePipe', () => {
  let pipe: FullNamePipe;

  beforeEach(() => pipe = new FullNamePipe());

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should accept a single user', () => {
    const user = {
      first_name: 'Kirk',
      last_name: 'Davies'
    } as Partial<UserInterface>;

    expect(pipe.transform(user)).toBe('Kirk Davies');
  });

  it('should accept an array of users', () => {
    const users = [] as Partial<UserInterface>[];

    const user1 = {
      first_name: 'Kirk',
      last_name: 'Davies'
    } as Partial<UserInterface>;

    users.push(user1);

    const user2 = {
      first_name: 'Steve',
      last_name: 'Baker'
    } as Partial<UserInterface>;

    users.push(user2);

    expect(pipe.transform(users)).toBe('Kirk Davies, Steve Baker');
  });
});
