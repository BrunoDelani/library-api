import { IsDefined, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateCategoryDto {
    @IsString()
    @IsNotEmpty()
    @IsDefined()
    @MaxLength(30, {
        message: 'Name category is too long.'
    })
    name: string;
}
