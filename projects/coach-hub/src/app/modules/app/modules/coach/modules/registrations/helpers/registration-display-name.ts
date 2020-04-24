import { RegistrationInterface } from '../models/registration.interface';
import { FullNamePipe } from '../../../../../../../shared/pipes/full-name/full-name.pipe';

const fullNamePipe = new FullNamePipe();

export function registrationDisplayName(item: RegistrationInterface) {
    return fullNamePipe.transform(item);
}
