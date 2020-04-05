import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { TicTacToeModule } from './tic-tac-toe';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    TicTacToeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
