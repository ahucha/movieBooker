import {
    Controller,
    Post,
    Get,
    Delete,
    Param,
    Body,
    UseGuards,
    Request,
    ParseIntPipe,
  } from '@nestjs/common';
  import { ReservationService } from './reservation.service';
  import { CreateReservationDto } from './dto/create-reservation.dto';
  import { JwtAuthGuard } from '../auth/jwt-auth.guard';
  import { ApiBearerAuth, ApiTags, ApiOperation } from '@nestjs/swagger';
  
  @ApiTags('reservations')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Controller('reservations')
  export class ReservationController {
    constructor(private readonly reservationService: ReservationService) {}
  
    @Post()
    @ApiOperation({ summary: 'Créer une réservation' })
    create(@Body() dto: CreateReservationDto, @Request() req: any) {
      return this.reservationService.create(req.user.userId, dto);
    }
  
    @Get()
    @ApiOperation({ summary: "Lister des réservations" })
    findAll(@Request() req: any) {
      return this.reservationService.findAll(req.user.userId);
    }
  
    @Delete(':id')
    @ApiOperation({ summary: 'Supprimer une réservation' })
    remove(@Param('id', ParseIntPipe) id: number, @Request() req: any) {
      return this.reservationService.remove(req.user.userId, id);
    }
  }
  