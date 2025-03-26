import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { ContentService } from './content.service';
import { environment } from '../../environments/environments';
import { Card, CardType } from '../shared/models/card';

describe('ContentService', () => {
  const MOCK_CARDS: Card[] = [
    {
      title: 'Card 1',
      description: 'Description 1',
      img: 'https://localhost:8000/image1.jpg',
      type: CardType.Paisagem,
    },
    {
      title: 'Card 2',
      description: 'Description 2',
      img: 'https://localhost:8000/image2.jpg',
      type: CardType.Flor,
    },
  ];

  let service: ContentService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ContentService,
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });
    service = TestBed.inject(ContentService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getCardList', () => {
    it('should get card list from API', (done) => {
      service.getCardList().subscribe({
        next: (cards) => {
          expect(cards).toEqual(MOCK_CARDS);
          done();
        },
        error: done.fail
      });

      const req = httpMock.expectOne(environment.CARD_LIST_URL);
      expect(req.request.method).toBe('GET');
      req.flush(MOCK_CARDS);
    });

    it('should handle API errors', (done) => {
      service.getCardList().subscribe({
        next: () => done.fail('Should have failed'),
        error: (error) => {
          expect(error.status).toBe(500);
          done();
        }
      });

      const req = httpMock.expectOne(environment.CARD_LIST_URL);
      req.flush('Server error', {
        status: 500,
        statusText: 'Internal Server Error',
      });
    });

    it('should return empty array when no cards exist', (done) => {
      service.getCardList().subscribe({
        next: (cards) => {
          expect(cards).toEqual([]);
          done();
        },
        error: done.fail
      });

      const req = httpMock.expectOne(environment.CARD_LIST_URL);
      req.flush([]);
    });
  });
});
