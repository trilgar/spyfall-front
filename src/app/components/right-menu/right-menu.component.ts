import {Component, Input, OnInit} from '@angular/core';
import {Answer, GameCardDto, QuestionDto, WebsocketService} from "../../services/websocket/websocket.service";
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-right-menu',
  templateUrl: './right-menu.component.html',
  styleUrls: ['./right-menu.component.css']
})
export class RightMenuComponent implements OnInit {
  @Input() currentLocation: GameCardDto;
  currentQuestion: QuestionDto;
  previousQuestion: QuestionDto;
  currentAnswer: Answer;
  previousAnswer: Answer;
  pendingQuestion = false;

  constructor(private websocketService: WebsocketService) {
  }

  ngOnInit(): void {
    this.websocketService.currentQuestionMessage.subscribe(questionDto => {
      this.previousQuestion = this.currentQuestion;
      this.currentQuestion = questionDto;
      if (questionDto.message !== '') {
        this.pendingQuestion = true;
      }
    });
    this.websocketService.currentAnswerMessage.subscribe(answer => {
      this.previousAnswer = this.currentAnswer;
      this.currentAnswer = answer;
      this.pendingQuestion = false;
    });
  }

  getFullImgLink(shortLink: string): string {
    return environment.restUrl + '/' + shortLink;
  }
}
