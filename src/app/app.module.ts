import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainBoardComponent } from './components/main-board/main-board.component';
import {HttpClientModule} from "@angular/common/http";
import {RouterModule} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import { LoginComponent } from './components/login/login.component';
import { LeftMenuComponent } from './components/left-menu/left-menu.component';
import { RightMenuComponent } from './components/right-menu/right-menu.component';
import { QuestionComponent } from './components/question/question.component';
import { AskQuestionComponent } from './components/ask-question/ask-question.component';
import {MatDialogModule} from '@angular/material/dialog';
import { GuessLocationComponent } from './components/guess-location/guess-location.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { SpyBustedComponent } from './components/spy-busted/spy-busted.component';
import { GameConclusionComponent } from './components/game-conclusion/game-conclusion.component';
@NgModule({
  declarations: [
    AppComponent,
    MainBoardComponent,
    LoginComponent,
    LeftMenuComponent,
    RightMenuComponent,
    QuestionComponent,
    AskQuestionComponent,
    GuessLocationComponent,
    SpyBustedComponent,
    GameConclusionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [GuessLocationComponent,QuestionComponent,AskQuestionComponent, SpyBustedComponent, GameConclusionComponent]
})
export class AppModule { }
