import { IsDateString, IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateReservationDto {
  @ApiProperty({ example: 550 })
  @IsInt()
  movieId: number;

  @ApiProperty({ example: '2025-04-10T18:00:00.000Z' })
  @IsDateString()
  startTime: string;
}
