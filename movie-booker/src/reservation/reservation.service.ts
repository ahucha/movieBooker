import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Reservation } from './reservation.entity';
import { CreateReservationDto } from './dto/create-reservation.dto';

@Injectable()
export class ReservationService {
  constructor(
    @InjectRepository(Reservation)
    private readonly reservationRepository: Repository<Reservation>,
  ) {}

  async create(userId: number, dto: CreateReservationDto) {
    const startTime = new Date(dto.startTime);
    const endTime = new Date(startTime.getTime() + 2 * 60 * 60 * 1000);

    const conflicts = await this.reservationRepository.find({
      where: { userId },
    });

    const hasConflict = conflicts.some((reservation) => {
      const existingStart = new Date(reservation.startTime).getTime();
      const existingEnd = new Date(reservation.endTime).getTime();
      return startTime.getTime() < existingEnd && endTime.getTime() > existingStart;
    });

    if (hasConflict) {
      throw new BadRequestException(
        "Vous avez déjà une réservation sur ce créneau.",
      );
    }

    const newReservation = this.reservationRepository.create({
      userId,
      movieId: dto.movieId,
      startTime,
      endTime,
    });

    return this.reservationRepository.save(newReservation);
  }

  async findAll(userId: number) {
    return this.reservationRepository.find({
      where: { userId },
      order: { startTime: 'ASC' },
    });
  }

  async remove(userId: number, id: number) {
    const reservation = await this.reservationRepository.findOneBy({ id });

    if (!reservation || reservation.userId !== userId) {
      throw new BadRequestException("Réservation introuvable ou non autorisée.");
    }

    return this.reservationRepository.remove(reservation);
  }
}
