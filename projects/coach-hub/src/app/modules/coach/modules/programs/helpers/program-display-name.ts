import { ProgramInterface } from '../../../../app/models/program.interface';

export function programDisplayName(item: ProgramInterface) {
    return item.program_title;
}
