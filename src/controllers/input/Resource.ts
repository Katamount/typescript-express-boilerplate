import { IsDefined, IsOptional, IsString, IsNotEmpty } from 'class-validator';
import { Input } from './Input';

export class ResourcePost extends Input {
    @IsDefined()
    @IsString()
    @IsNotEmpty()
    public name: string;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    public description: string;

    constructor(name:string, description:string) {
        super()
        this.name = name;
        this.description = description;
    }
}

export class ResourceGet extends Input {
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    public name: string;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    public description: string;

    constructor(name:string, description:string) {
        super()
        this.name = name;
        this.description = description;
    }
}