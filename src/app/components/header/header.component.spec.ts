import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { DividerComponent } from '../divider/divider.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderComponent, DividerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render header with correct role and aria-label', () => {
    const header = fixture.nativeElement.querySelector('header');
    expect(header.getAttribute('role')).toBe('banner');
    expect(header.getAttribute('aria-label')).toBe('Site header');
  });

  it('should render logo image with correct attributes', () => {
    const img = fixture.nativeElement.querySelector('.header__logo-image');
    expect(img.getAttribute('src')).toBe('logo.png');
    expect(img.getAttribute('alt')).toBe('Listify Logo');
    expect(img.getAttribute('loading')).toBe('eager');
    expect(img.getAttribute('aria-hidden')).toBe('false');
  });

  it('should render correct title text', () => {
    const titleElement = fixture.nativeElement.querySelector('.header__title-app');
    expect(titleElement.textContent).toBe('Teste de Desenvolvedor Front-End - Anota AI');
  });

  it('should render correct name text', () => {
    const nameElement = fixture.nativeElement.querySelector('.header__title-name');
    expect(nameElement.textContent.trim()).toContain('Matheus Soares Vieira');
  });

  it('should include divider components with correct sizes', () => {
    const dividers = fixture.nativeElement.querySelectorAll('app-divider');
    expect(dividers.length).toBe(2);
    expect(dividers[0].getAttribute('size')).toBe('small');
    expect(dividers[1].getAttribute('size')).toBe('medium');
  });

  it('should have correct tabindex on title elements', () => {
    const titleApp = fixture.nativeElement.querySelector('.header__title-app');
    const titleName = fixture.nativeElement.querySelector('.header__title-name');
    expect(titleApp.getAttribute('tabindex')).toBe('0');
    expect(titleName.getAttribute('tabindex')).toBe('0');
  });
});
