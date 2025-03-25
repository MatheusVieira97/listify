import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Card } from '../../shared/models/card';
import { CardComponent } from '../card/card.component';

@Component({
  selector: 'app-card-list',
  standalone: true,
  imports: [CommonModule, CardComponent],
  templateUrl: './card-list.component.html',
  styleUrl: './card-list.component.scss'
})
export class CardListComponent {
  @Input() cards: Card[] = [];
}
