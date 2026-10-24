import { ApiProperty } from '@nestjs/swagger';
import { ServerStatus } from '@prisma/client';
import {
  IsEnum,
  IsIP,
  IsInt,
  IsString,
  IsUUID,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export class CreateServerDto {
  @ApiProperty({ example: 'AWS' })
  @IsString()
  @MinLength(1)
  @MaxLength(50)
  provider!: string;

  @ApiProperty({ example: 'us-east-1' })
  @IsString()
  @MinLength(1)
  @MaxLength(100)
  region!: string;

  @ApiProperty({ minimum: 1, example: 4 })
  @IsInt()
  @Min(1)
  cpu!: number;

  @ApiProperty({ minimum: 1, example: 16 })
  @IsInt()
  @Min(1)
  ram!: number;

  @ApiProperty({ minimum: 1, example: 100 })
  @IsInt()
  @Min(1)
  storage!: number;

  @ApiProperty({ example: '192.168.1.10' })
  @IsIP()
  ip!: string;

  @ApiProperty({ enum: ServerStatus })
  @IsEnum(ServerStatus)
  status!: ServerStatus;

  @ApiProperty({ format: 'uuid' })
  @IsUUID()
  projectId!: string;
}