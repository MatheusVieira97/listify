import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CardListComponent } from './card-list.component';
import { Card, CardType } from '../../shared/models/card';

describe('CardListComponent', () => {
  let component: CardListComponent;
  let fixture: ComponentFixture<CardListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CardListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with empty cards array', () => {
    expect(component.cards).toEqual([]);
  });

  it('should emit deleteCard event when onDeleteCard is called', () => {
    const testCard: Card = {
      title: 'Test Card',
      description: 'Test Description',
      img: 'test.jpg',
      type: CardType.Paisagem
    };
    component.cards = [testCard];
    
    let emittedCard: Card | undefined;
    component.deleteCard.subscribe((card: Card) => {
      emittedCard = card;
    });

    component.onDeleteCard(testCard);
    expect(emittedCard).toEqual(testCard);
  });
});
