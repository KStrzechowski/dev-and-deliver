import { Inject, Injectable } from '@nestjs/common';
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';
import { FilmsDataAccessLayer } from './films.dal';
import { GetFilmParamsDto, GetFilmsQueryDto } from './dtos';
import { PeopleDataAccessLayer } from '../people/people.dal';
import { requestToKey } from 'src/helpers';
import { ResponseResource } from 'src/types';
import { Film } from './films.entity';

@Injectable()
export class FilmsService {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private readonly filmsDataAccessLayer: FilmsDataAccessLayer,
    private readonly peopleDataAccessLayer: PeopleDataAccessLayer,
  ) {}

  public async getFilms(
    query: GetFilmsQueryDto,
  ): Promise<ResponseResource<Film>[]> {
    const cacheKey = requestToKey('/films', query);
    const cacheResult = (await this.cacheManager.get(
      cacheKey,
    )) as ResponseResource<Film>[];
    if (cacheResult) {
      return cacheResult;
    }

    const { title } = query;

    const result = await this.filmsDataAccessLayer.getFilms(title);
    await this.cacheManager.set(cacheKey, result);

    return result;
  }

  public async getFilm(params: GetFilmParamsDto): Promise<Film> {
    const cacheKey = requestToKey('/films', params);
    const cacheResult = (await this.cacheManager.get(cacheKey)) as Film;
    if (cacheResult) {
      return cacheResult;
    }

    const { id } = params;

    const responseResource = await this.filmsDataAccessLayer.getFilm(id);
    await this.cacheManager.set(cacheKey, responseResource.properties);

    return responseResource.properties;
  }

  public async getWordsInOpenings() {
    const cacheKey = '/films/opening/words';
    const cacheResult = (await this.cacheManager.get(cacheKey)) as Film;
    if (cacheResult) {
      return cacheResult;
    }

    const films = await this.filmsDataAccessLayer.getFilms();

    const wordOccurences = new Map<string, number>();
    for (const film of films) {
      this.countWordOccurences(wordOccurences, film.properties.opening_crawl);
    }

    const result = Array.from(wordOccurences, ([word, occurence]) => ({
      word,
      occurence,
    }));
    await this.cacheManager.set(cacheKey, result);

    return result;
  }

  public async getMostPopularPeopleInOpenings() {
    const cacheKey = '/films/opening/people';
    const cacheResult = (await this.cacheManager.get(cacheKey)) as string[];
    if (cacheResult) {
      return cacheResult;
    }

    const films = await this.filmsDataAccessLayer.getFilms();

    let openings = '';
    for (const film of films) {
      openings += ' ' + film.properties.opening_crawl;
    }

    let result: string[] = [],
      maxOccurencesNumber = 0,
      page = 1,
      next;
    const limit = 10;

    // TODO - zrobić to asynchronicznie dla wszystkich stron na raz + podzielić na funkcje
    do {
      const peopleData = await this.peopleDataAccessLayer.getPeople(
        page,
        limit,
      );

      for (const person of peopleData.results) {
        const regex = new RegExp(person.name, 'g');
        const occurences = (openings.match(regex) || []).length;

        if (maxOccurencesNumber < occurences) {
          maxOccurencesNumber = occurences;
          result = [person.name];
        } else if (maxOccurencesNumber === occurences) {
          result.push(person.name);
        }
      }

      page++;
      next = peopleData.next;
    } while (next != null);

    await this.cacheManager.set(cacheKey, result);

    return result;
  }

  private countWordOccurences = (
    wordOccurences: Map<string, number>,
    text: string,
  ) => {
    const words = text.split(/[^a-zA-Z']+/).filter(Boolean);

    for (const word of words) {
      const lowerCaseWord = word.toLowerCase();
      const occurenceNumber = wordOccurences.get(lowerCaseWord) || 0;
      wordOccurences.set(lowerCaseWord, occurenceNumber + 1);
    }

    return wordOccurences;
  };
}
