import { Component } from '@angular/core';
import { HeaderComponent } from "../../components/header/header.component";
import { CardListComponent } from "../../components/card-list/card-list.component";
import { Card } from "../../shared/models/card";
import { ContentService } from '../../services/content.service';
import { FormControl } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, CardListComponent, ReactiveFormsModule],
  providers: [ContentService],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  filteredCards: Card[] = [];
  allCards: Card[] = [];
  searchControl = new FormControl('');

  constructor(private contentService: ContentService) {
    this.contentService.getCardList().subscribe(cards => {
      this.filteredCards = cards;
      this.allCards = cards;
    });
  }

  onSearchChange() {
    const searchTerm = this.searchControl.value?.toLowerCase() || '';
    this.filteredCards = this.allCards.filter(card => 
      card.title.toLowerCase().includes(searchTerm) || card.description.toLowerCase().includes(searchTerm)
    );
  }
}
