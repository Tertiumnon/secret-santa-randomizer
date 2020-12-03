import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  wishers: string[];
  wishersInput: string;
  wishersPairs: string[];
  wishersPairsInput: string;

  randomize(): void {
    this.wishers = this.wishersInput.split('\n');
    this.wishersPairs = [...this.wishers]
      .map((w, i) => String(i + 1))
      .sort(() => Math.random() - 0.5);
    this.wishersPairsInput = this.wishersPairs.join('\n');
  }

}
