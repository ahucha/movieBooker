import { Test, TestingModule } from '@nestjs/testing';
import { ReservationService } from './reservation.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Reservation } from './reservation.entity';
import { Repository } from 'typeorm';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { BadRequestException } from '@nestjs/common';

describe('ReservationService', () => {
  let service: ReservationService;
  let repo: Repository<Reservation>;

  const mockRepo = {
    find: jest.fn(),
    findOneBy: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReservationService,
        {
          provide: getRepositoryToken(Reservation),
          useValue: mockRepo,
        },
      ],
    }).compile();

    service = module.get<ReservationService>(ReservationService);
    repo = module.get(getRepositoryToken(Reservation));
    jest.clearAllMocks();
  });

  it('should create a reservation if no conflict', async () => {
    const dto: CreateReservationDto = {
      movieId: 1,
      startTime: '2025-04-10T10:00:00.000Z',
    };

    mockRepo.find.mockResolvedValue([]);
    mockRepo.create.mockReturnValue({ ...dto, userId: 1 });
    mockRepo.save.mockResolvedValue({ id: 1, ...dto, userId: 1 });

    const result = await service.create(1, dto);
    expect(result).toHaveProperty('id');
    expect(mockRepo.save).toHaveBeenCalled();
  });

  it('should throw if reservation conflicts', async () => {
    const dto: CreateReservationDto = {
      movieId: 1,
      startTime: '2025-04-10T10:00:00.000Z',
    };

    const conflicting = {
      id: 1,
      userId: 1,
      movieId: 2,
      startTime: new Date('2025-04-10T09:30:00.000Z'),
      endTime: new Date('2025-04-10T11:30:00.000Z'),
    };

    mockRepo.find.mockResolvedValue([conflicting]);

    await expect(service.create(1, dto)).rejects.toThrow(BadRequestException);
  });
});
