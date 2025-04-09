import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class MoviesService {
  private readonly apiKey: string;
  private readonly baseUrl: string;

  constructor(
    private readonly http: HttpService,
    private readonly config: ConfigService,
  ) {
    this.apiKey = this.config.get<string>('TMDB_API_KEY') as string;
    this.baseUrl = this.config.get<string>('TMDB_API_URL') as string;
  }

  async getMovies(params: { page?: number; search?: string; sort?: string }) {
    const { page = 1, search, sort } = params;
  
    const endpoint = search ? 'search/movie' : 'discover/movie';
    const url = `${this.baseUrl}/${endpoint}`;
  
    const queryParams: Record<string, any> = {
      api_key: this.apiKey,
      language: 'fr-FR',
      page,
    };
  
    if (search) {
      queryParams.query = search;
    } else if (sort) {
      queryParams.sort_by = sort;
    }
  
    const response$ = this.http.get(url, { params: queryParams });
    const { data } = await lastValueFrom(response$);
    return data;
  }
}
