import { Component, OnInit } from '@angular/core';
import { IWisher, IWisherPair } from '../shared/data';

import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-data-generator',
  templateUrl: './data-generator.component.html',
  styleUrls: ['./data-generator.component.scss']
})
export class DataGeneratorComponent implements OnInit {
  wishers: IWisher[];
  wishersInput: string;
  wishersPairIds: number[];
  wishersPairs: IWisherPair[];
  wishersPairsInput: string;
  wishersPairsOutput: string;

  constructor(
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.http.get('/assets/wisher-list.json').subscribe((response: { data: IWisher[] }) => {
      this.wishers = response.data;
      this.wishersInput = this.wishers.map(item => item.name).join('\n');
    });
  }

  getRandomInt(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
  }

  generatePairs(ids: number[]): number[] {
    const idsCopy = [...ids];
    const res: number[] = [];
    idsCopy.forEach((i) => {
      const pairI = this.getRandomInt(i === 0 ? 1 : 0, ids.length);
      console.log(pairI)
      res.push(ids[pairI]);
      ids.splice(pairI, 1);
      console.log(ids)
    });
    return res;
  }

  generateCode(length: number): string {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  randomize(): void {
    this.wishersPairIds = this.generatePairs(
      [...this.wishers].map((w, i) => i)
    );
    console.log(this.wishersPairIds)
    this.wishersPairs = this.wishers.map((w, i) => {
      return {
        id: i,
        pairId: this.wishersPairIds[i],
        code: this.generateCode(7)
      };
    });
    this.wishersPairsInput = JSON.stringify(
      {
        data: this.wishersPairs
      }
    );
    this.wishersPairsOutput = this.wishersPairs.map((wp) => {
      return `${this.wishers.find((w, i) => i === wp.id).name} ${wp.code}`;
    }).join('\n');
  }
}
