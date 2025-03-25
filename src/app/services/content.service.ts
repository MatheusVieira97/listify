import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environments';
import { Card } from '../shared/models/card';

@Injectable({
  providedIn: 'root'
})
export class ContentService {

  constructor(private http: HttpClient) { }

  getCardList(): Observable<Card[]> {
    return this.http.get<Card[]>(environment.CARD_LIST_URL);
  }
}
