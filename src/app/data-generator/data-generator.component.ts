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

  generatePairIds(ids: number[]): number[] {
    const pairIds = [...ids].sort(() => 0.5 - Math.random());
    const res: number[] = [];
    const l = ids.length;
    for (let i = 0; i < l; i += 1) {
      if (ids[i] !== pairIds[pairIds.length - 1]) {
        res.push(pairIds.pop());
      } else {
        res.push(pairIds.shift());
      }
    }
    if (ids[ids.length - 1] === res[res.length - 1]) {
      return this.generatePairIds(ids);
    }
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
    this.wishersPairIds = this.generatePairIds(
      [...this.wishers].map((w, i) => i)
    );
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
