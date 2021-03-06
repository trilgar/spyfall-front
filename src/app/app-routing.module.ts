import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MainBoardComponent} from "./components/main-board/main-board.component";
import {LoginComponent} from "./components/login/login.component";
import {QuestionComponent} from "./components/question/question.component";

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'game-board', component: MainBoardComponent},
  {path:'question', component: QuestionComponent},
  {path: '**', redirectTo:'login'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
