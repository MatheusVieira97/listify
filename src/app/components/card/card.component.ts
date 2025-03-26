import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Card } from '../../shared/models/card';
import { CardType } from '../../shared/models/card';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent {
  @Input() card!: Card;
  @Output() deleteCard = new EventEmitter<void>();
  protected CardType = CardType;
}
