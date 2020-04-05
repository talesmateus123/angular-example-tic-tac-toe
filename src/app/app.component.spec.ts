import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { TicTacToeModule } from './tic-tac-toe';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        TicTacToeModule
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  }));

 
});
