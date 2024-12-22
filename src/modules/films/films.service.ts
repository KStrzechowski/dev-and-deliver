import { Injectable } from '@nestjs/common';
import { FilmsDataAccessLayer } from './films.dal';
import { GetFilmParamsDto, GetFilmsQueryDto } from './dtos';
import { PeopleDataAccessLayer } from '../people/people.dal';

@Injectable()
export class FilmsService {
  constructor(
    private readonly filmsDataAccessLayer: FilmsDataAccessLayer,
    private readonly peopleDataAccessLayer: PeopleDataAccessLayer,
  ) {}

  public async getFilms(query: GetFilmsQueryDto) {
    const { title } = query;

    return await this.filmsDataAccessLayer.getFilms(title);
  }

  public async getFilm(params: GetFilmParamsDto) {
    const { id } = params;

    return await this.filmsDataAccessLayer.getFilm(id);
  }

  public async getWordsInOpenings() {
    const films = await this.filmsDataAccessLayer.getFilms();

    const wordOccurences = new Map<string, number>();
    for (const film of films) {
      this.countWordOccurences(wordOccurences, film.properties.opening_crawl);
    }

    return Array.from(wordOccurences, ([word, occurence]) => ({
      word,
      occurence,
    }));
  }

  public async getMostPopularPeopleInOpenings() {
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
