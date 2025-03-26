import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { CardListComponent } from '../../components/card-list/card-list.component';
import { Card } from '../../shared/models/card';
import { ContentService } from '../../services/content.service';
import { FormControl } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, CardListComponent, ReactiveFormsModule],
  providers: [ContentService],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  filteredCards: Card[] = [];
  allCards: Card[] = [];
  searchControl = new FormControl('');

  constructor(private contentService: ContentService) {}

  ngOnInit(): void {
    this.contentService.getCardList().subscribe((cards: Card[]) => {
      this.allCards = cards;
      this.filteredCards = cards;
    });
  }

  onSearchChange() {
    const searchTerm = this.searchControl.value?.toLowerCase() || '';
    this.filteredCards = this.allCards.filter(
      (card) =>
        card.title.toLowerCase().includes(searchTerm) ||
        card.description.toLowerCase().includes(searchTerm),
    );
  }

  onDeleteCard(cardToDelete: Card) {
    this.allCards = this.allCards.filter((card) => card !== cardToDelete);
    this.filteredCards = this.filteredCards.filter(
      (card) => card !== cardToDelete,
    );
  }
}
