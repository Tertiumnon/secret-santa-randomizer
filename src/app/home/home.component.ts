import { Component, OnInit } from '@angular/core';
import { IWisher, IWisherPair } from '../shared/data';

import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  code: string;
  wisherPairs: IWisherPair[];
  wishers: IWisher[];
  wisher: string;

  constructor(
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.http.get('/assets/wisher-pairs.json')
      .subscribe((response: { data: IWisherPair[] }) => {
        this.wisherPairs = response.data;
      });
    this.http.get('/assets/wisher-list.json')
      .subscribe((response: { data: IWisher[] }) => {
        this.wishers = response.data;
      });
  }

  getWisher(): void {
    const wisherPair = this.wisherPairs.find(w => w.code === this.code);
    const wisher = this.wishers.find((w, i) => i === wisherPair.pairId);
    this.wisher = wisher.name;
  }
}
