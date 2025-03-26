import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CardComponent } from './card.component';
import { Card, CardType } from '../../shared/models/card';

describe('CardComponent', () => {
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;
  const mockCard: Card = {
    title: 'Test Card',
    description: 'Test Description',
    img: 'test-image.jpg',
    type: CardType.Paisagem
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CardComponent);
    component = fixture.componentInstance;
    component.card = mockCard;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display card title', () => {
    const titleElement = fixture.nativeElement.querySelector('.card__title');
    expect(titleElement.textContent).toBe(mockCard.title);
  });

  it('should display card description', () => {
    const descriptionElement = fixture.nativeElement.querySelector('.card__description');
    expect(descriptionElement.textContent).toBe(mockCard.description);
  });

  it('should display card image with correct src and alt', () => {
    const imageElement = fixture.nativeElement.querySelector('.card__image img');
    expect(imageElement.src).toContain(mockCard.img);
    expect(imageElement.alt).toBe(mockCard.title);
  });

  it('should display correct badge type', () => {
    const badgeElement = fixture.nativeElement.querySelector('.card__badge');
    expect(badgeElement.textContent).toBe(CardType[mockCard.type]);
    expect(badgeElement.classList).toContain(CardType[mockCard.type].toLowerCase());
  });

  it('should emit deleteCard event when delete button is clicked', () => {
    const spy = jasmine.createSpy();
    component.deleteCard.subscribe(spy);

    const deleteButton = fixture.nativeElement.querySelector('.card__delete-btn');
    deleteButton.click();

    expect(spy).toHaveBeenCalled();
  });
});
