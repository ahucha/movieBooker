import { Controller, Get, Query } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { ApiTags, ApiQuery, ApiOperation } from '@nestjs/swagger';

@ApiTags('movies')
@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get()
  @ApiOperation({ summary: 'Récupérer une liste de films (depuis TMDB)' })
  @ApiQuery({ name: 'page', required: false, type: Number, example: 1 })
  @ApiQuery({ name: 'search', required: false, type: String, example: 'Batman' })
  @ApiQuery({ name: 'sort', required: false, type: String, example: 'release_date.desc' })
  getMovies(
    @Query('page') page?: number,
    @Query('search') search?: string,
    @Query('sort') sort?: string,
  ) {
    return this.moviesService.getMovies({ page, search, sort });
  }
}
