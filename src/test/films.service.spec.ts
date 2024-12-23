import { Test, TestingModule } from '@nestjs/testing';
import hash from 'object-hash';
// import { Film } from '../modules/films/films.entity';
import { FilmsService } from '../modules/films/films.service';
import { FilmsDataAccessLayer } from '../modules/films/films.dal';
import { PeopleDataAccessLayer } from '../modules/people/people.dal';
// import { GetFilmParamsDto, GetFilmsQueryDto } from '../modules/films/dtos';

describe('FilmsService', () => {
  const mockFilmsDAL = {
    getFilms: jest.fn(),
    getFilm: jest.fn(),
  };

  const mockPeopleDAL = {
    getPeople: jest.fn(),
  };

  const mockCache = {
    get: jest.fn(),
    set: jest.fn(),
  };

  beforeEach(async () => {
    jest.clearAllMocks();
  });

  const createTestingModule = async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FilmsService,
        { provide: FilmsDataAccessLayer, useValue: mockFilmsDAL },
        { provide: PeopleDataAccessLayer, useValue: mockPeopleDAL },
        { provide: 'CACHE_MANAGER', useValue: mockCache },
      ],
    }).compile();
    return module.get<FilmsService>(FilmsService);
  };

  describe('getFilms', () => {
    it('should call get method from Cache Manager once', async () => {
      const filmsService = await createTestingModule();

      await filmsService.getFilms({});

      expect(mockCache.get).toHaveBeenCalledTimes(1);
    });

    it('should call get method from Cache Manager with valid key', async () => {
      const filmsService = await createTestingModule();

      const mockQuery = {
        title: 'mockFilmTitle',
      };
      const mockKey = `/films@${hash.sha1(mockQuery)}`;

      await filmsService.getFilms(mockQuery);

      expect(mockCache.get).toHaveBeenCalledWith(mockKey);
    });

    it('should return cached value when it is not null', async () => {
      const filmsService = await createTestingModule();

      const mockFilms = [
        {
          properties: ['mock'],
          description: 'mockDescription',
          _id: 'mockId',
          uid: 'mockUid',
          __v: 1,
        },
      ];

      mockCache.get.mockResolvedValue(mockFilms);

      const result = await filmsService.getFilms({});

      expect(result).toEqual(mockFilms);
    });

    it('should call getFilms method from FilmsDataAccessLayer once with valid title query when cache returns null', async () => {
      const filmsService = await createTestingModule();

      const mockQuery = {
        title: 'mockFilmTitle',
      };

      mockCache.get.mockResolvedValue(null);

      await filmsService.getFilms(mockQuery);

      expect(mockFilmsDAL.getFilms).toHaveBeenCalledTimes(1);
      expect(mockFilmsDAL.getFilms).toHaveBeenCalledWith(mockQuery.title);
    });

    it('should call set method from Cache Manager once with valid key and films data', async () => {
      const filmsService = await createTestingModule();

      const mockQuery = {
        title: 'mockFilmTitle',
      };
      const mockKey = `/films@${hash.sha1(mockQuery)}`;
      mockCache.get.mockResolvedValue(null);

      const mockFilms = [
        {
          properties: ['mock'],
          description: 'mockDescription',
          _id: 'mockId',
          uid: 'mockUid',
          __v: 1,
        },
      ];
      mockFilmsDAL.getFilms.mockResolvedValue(mockFilms);

      await filmsService.getFilms(mockQuery);

      expect(mockCache.set).toHaveBeenCalledWith(mockKey, mockFilms);
    });

    it('should return films data', async () => {
      const filmsService = await createTestingModule();

      mockCache.get.mockResolvedValue(null);

      const mockFilms = [
        {
          properties: ['mock'],
          description: 'mockDescription',
          _id: 'mockId',
          uid: 'mockUid',
          __v: 1,
        },
      ];
      mockFilmsDAL.getFilms.mockResolvedValue(mockFilms);

      const result = await filmsService.getFilms({});

      expect(result).toEqual(mockFilms);
    });
  });

  describe('getWordsInOpenings', () => {
    it('should call get method from Cache Manager once with valid key', async () => {
      const filmsService = await createTestingModule();

      const mockKey = '/films/opening/words';
      const mockWordOccurences = [{ word: 'MockWord', occurence: 1 }];
      mockCache.get.mockResolvedValue(mockWordOccurences);

      const result = await filmsService.getWordsInOpenings();

      expect(mockCache.get).toHaveBeenCalledTimes(1);
      expect(mockCache.get).toHaveBeenCalledWith(mockKey);
      expect(result).toEqual(mockWordOccurences);
    });

    it('should return cached value when it is not null', async () => {
      const filmsService = await createTestingModule();

      const mockWordOccurences = [{ word: 'MockWord', occurence: 1 }];
      mockCache.get.mockResolvedValue(mockWordOccurences);

      const result = await filmsService.getWordsInOpenings();

      expect(result).toEqual(mockWordOccurences);
    });

    it('should call set method from Cache Manager with valid key and obtained result', async () => {
      const filmsService = await createTestingModule();

      const mockKey = '/films/opening/words';
      const mockOpenings = [
        {
          properties: {
            opening_crawl: 'Word word word text word a',
          },
        },
        {
          properties: {
            opening_crawl: 'Text mock a',
          },
        },
      ];

      mockCache.get.mockResolvedValue(null);
      mockFilmsDAL.getFilms.mockResolvedValue(mockOpenings);

      const result = await filmsService.getWordsInOpenings();

      expect(mockCache.set).toHaveBeenCalledWith(mockKey, result);
    });

    it('should return valid result for specified film openings', async () => {
      const filmsService = await createTestingModule();

      const mockOpenings = [
        {
          properties: {
            opening_crawl: 'Word word word text word a',
          },
        },
        {
          properties: {
            opening_crawl: 'Text mock a',
          },
        },
      ];
      const expectedResult = [
        { word: 'text', occurence: 2 },
        { word: 'word', occurence: 4 },
        { word: 'a', occurence: 2 },
        { word: 'mock', occurence: 1 },
      ];

      mockCache.get.mockResolvedValue(null);
      mockFilmsDAL.getFilms.mockResolvedValue(mockOpenings);

      const result = await filmsService.getWordsInOpenings();
      expect(result.sort((a, b) => (a.word < b.word ? -1 : 1))).toEqual(
        expectedResult.sort((a, b) => (a.word < b.word ? -1 : 1)),
      );
    });
  });

  describe('getMostPopularPeopleInOpenings', () => {
    it('should call get method from Cache Manager once with valid key', async () => {
      const filmsService = await createTestingModule();

      const mockKey = '/films/opening/people';
      const mockWordOccurences = [{ word: 'MockWord', occurence: 1 }];
      mockCache.get.mockResolvedValue(mockWordOccurences);

      await filmsService.getMostPopularPeopleInOpenings();

      expect(mockCache.get).toHaveBeenCalledTimes(1);
      expect(mockCache.get).toHaveBeenCalledWith(mockKey);
    });

    it('should return cached value when it is not null', async () => {
      const filmsService = await createTestingModule();

      const mockWordOccurences = [{ word: 'MockWord', occurence: 1 }];
      mockCache.get.mockResolvedValue(mockWordOccurences);

      const result = await filmsService.getMostPopularPeopleInOpenings();

      expect(result).toEqual(mockWordOccurences);
    });

    it('should call getPeople method from PeopleDataAccessLayer until "next" parameter equals null (2 times)', async () => {
      const filmsService = await createTestingModule();

      const mockFirstPeopleResult = {
        next: 'yes',
        results: [
          {
            name: 'Luke Skywalker',
          },
          {
            name: 'Dooku',
          },
          {
            name: 'Grievous',
          },
        ],
      };
      const mockSecondPeopleResult = {
        next: null,
        results: [
          {
            name: 'Padme',
          },
        ],
      };

      mockCache.get.mockResolvedValue(null);
      mockPeopleDAL.getPeople.mockImplementationOnce(
        () => mockFirstPeopleResult,
      );
      mockPeopleDAL.getPeople.mockImplementationOnce(
        () => mockSecondPeopleResult,
      );

      await filmsService.getMostPopularPeopleInOpenings();

      expect(mockPeopleDAL.getPeople).toHaveBeenCalledTimes(2);
    });

    it('should call set method from Cache Manager with valid params and return character names with most occurences', async () => {
      const filmsService = await createTestingModule();

      const mockKey = '/films/opening/people';
      const mockOpenings = [
        {
          properties: {
            opening_crawl: 'Luke Skywalker Padme Dooku Luke \rSkywalker',
          },
        },
        {
          properties: {
            opening_crawl: 'Padme Dooku',
          },
        },
      ];
      const mockFirstPeopleResult = {
        next: 'yes',
        results: [
          {
            name: 'Luke Skywalker',
          },
          {
            name: 'Dooku',
          },
          {
            name: 'Grievous',
          },
        ],
      };
      const mockSecondPeopleResult = {
        next: null,
        results: [
          {
            name: 'Padme',
          },
        ],
      };
      const expectedResult = ['Padme', 'Dooku'].sort((a, b) =>
        a < b ? -1 : 1,
      );

      mockCache.get.mockResolvedValue(null);
      mockFilmsDAL.getFilms.mockResolvedValue(mockOpenings);
      mockPeopleDAL.getPeople.mockImplementationOnce(
        () => mockFirstPeopleResult,
      );
      mockPeopleDAL.getPeople.mockImplementationOnce(
        () => mockSecondPeopleResult,
      );

      const result = await filmsService.getMostPopularPeopleInOpenings();
      const sortedResult = [...result].sort((a, b) => (a < b ? -1 : 1));

      expect(mockCache.set).toHaveBeenCalledWith(mockKey, result);
      expect(sortedResult).toEqual(expectedResult);
    });
  });
});
