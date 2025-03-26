import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { ContentService } from '../../services/content.service';
import { of } from 'rxjs';
import { Card, CardType } from '../../shared/models/card';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let contentService: jasmine.SpyObj<ContentService>;

  const mockCards: Card[] = [
    {
      title: 'Test Card 1',
      description: 'Description 1',
      img: 'test1.jpg',
      type: CardType.Paisagem
    },
    {
      title: 'Test Card 2',
      description: 'Description 2',
      img: 'test2.jpg',
      type: CardType.Flor
    }
  ];

  beforeEach(async () => {
    const contentServiceSpy = jasmine.createSpyObj('ContentService', ['getCardList']);
    contentServiceSpy.getCardList.and.returnValue(of(mockCards));

    await TestBed.configureTestingModule({
      imports: [HomeComponent],
      providers: [
        { provide: ContentService, useValue: contentServiceSpy },
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    }).compileComponents();

    contentService = TestBed.inject(ContentService) as jasmine.SpyObj<ContentService>;
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should filter cards based on search term', fakeAsync(() => {
    component.allCards = mockCards;
    component.searchControl.setValue('Test Card 1');
    component.onSearchChange();
    tick();
    expect(component.filteredCards.length).toBe(1);
    expect(component.filteredCards[0]).toEqual(mockCards[0]);
  }));

  it('should delete card', () => {
    component.allCards = [...mockCards];
    component.filteredCards = [...mockCards];
    const cardToDelete = mockCards[0];
    
    component.onDeleteCard(cardToDelete);
    
    expect(component.allCards).not.toContain(cardToDelete);
    expect(component.filteredCards).not.toContain(cardToDelete);
  });
});
