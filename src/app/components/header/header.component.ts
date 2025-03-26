import { Component } from '@angular/core';
import { DividerComponent } from '../divider/divider.component';

@Component({
  standalone: true,
  selector: 'app-header',
  imports: [DividerComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {}
