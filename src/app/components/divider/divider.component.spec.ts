import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DividerComponent } from './divider.component';

describe('DividerComponent', () => {
  let component: DividerComponent;
  let fixture: ComponentFixture<DividerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DividerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DividerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have default size as small', () => {
    expect(component.size).toBe('small');
  });

  it('should set custom size when input is provided', () => {
    component.size = 'medium';
    fixture.detectChanges();
    const hrElement = fixture.nativeElement.querySelector('hr');
    expect(hrElement.className).toContain('divider__medium');
  });

  it('should render hr element with correct class based on size', () => {
    const hrElement = fixture.nativeElement.querySelector('hr');
    expect(hrElement.className).toContain('divider__small');
    
    component.size = 'medium';
    fixture.detectChanges();
    expect(hrElement.className).toContain('divider__medium');
  });

  it('should have proper CSS classes for divider container', () => {
    const dividerElement = fixture.nativeElement.querySelector('.divider');
    expect(dividerElement).toBeTruthy();
  });
});
