import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { ContentService } from './content.service';
import { environment } from '../../environments/environments';

describe('ContentService', () => {
  const MOCK_CARDS = [
    {
      id: 1,
      title: 'Card 1',
      description: "Description 1",
      image: "https://localhost/8000",
      type: "card",
    },
    {
      id: 2,
      title: 'Card 2',
      description: "Description 2",
      image: "https://localhost/8000",
      type: "card",
    }
  ];

  let service: ContentService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ContentService,
        provideHttpClient(),
        provideHttpClientTesting()
      ]
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
    it('should get card list from API', () => {
      service.getCardList().subscribe(cards => {
        expect(cards).toEqual(MOCK_CARDS);
      });

      const req = httpMock.expectOne(environment.CARD_LIST_URL);
      expect(req.request.method).toBe('GET');
      req.flush(MOCK_CARDS);
    });

    it('should handle API errors', () => {
      service.getCardList().subscribe({
        error: (error) => {
          expect(error.status).toBe(500);
        }
      });

      const req = httpMock.expectOne(environment.CARD_LIST_URL);
      req.flush('Server error', {
        status: 500,
        statusText: 'Internal Server Error'
      });
    });

    it('should return empty array when no cards exist', () => {
      service.getCardList().subscribe(cards => {
        expect(cards).toEqual([]);
      });

      const req = httpMock.expectOne(environment.CARD_LIST_URL);
      req.flush([]);
    })
  });
});
