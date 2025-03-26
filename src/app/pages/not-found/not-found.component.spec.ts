import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterLink, provideRouter } from '@angular/router';
import { By } from '@angular/platform-browser';
import { NotFoundComponent } from './not-found.component';

describe('NotFoundComponent', () => {
  let component: NotFoundComponent;
  let fixture: ComponentFixture<NotFoundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotFoundComponent, RouterLink],
      providers: [provideRouter([])]
    }).compileComponents();

    fixture = TestBed.createComponent(NotFoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display 404 title', () => {
    const titleElement = fixture.debugElement.query(By.css('.not-found__title'));
    expect(titleElement.nativeElement.textContent).toBe('404');
  });

  it('should display error message subtitle', () => {
    const subtitleElement = fixture.debugElement.query(By.css('.not-found__subtitle'));
    expect(subtitleElement.nativeElement.textContent).toBe('Página não encontrada');
  });

  it('should display error message text', () => {
    const textElement = fixture.debugElement.query(By.css('.not-found__text'));
    expect(textElement.nativeElement.textContent).toBe('A página que você está procurando não existe ou foi movida.');
  });

  it('should have link to home page', () => {
    const linkElement = fixture.debugElement.query(By.css('.not-found__link'));
    expect(linkElement.attributes['routerLink']).toBe('/');
    expect(linkElement.nativeElement.textContent).toBe('Voltar para a página inicial');
  });
});
