import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID, MaxLength, MinLength } from 'class-validator';

export class CreateProjectDto {
  @ApiProperty({ example: 'Payments API' })
  @IsString()
  @MinLength(1)
  @MaxLength(100)
  name!: string;

  @ApiProperty({ example: 'production' })
  @IsString()
  @MinLength(1)
  @MaxLength(50)
  environment!: string;

  @ApiProperty({ format: 'uuid' })
  @IsUUID()
  teamId!: string;
}