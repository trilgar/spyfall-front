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
  username = <string>localStorage.getItem("username");

  constructor(private websocketService: WebsocketService) {
  }

  ngOnInit(): void {
    this.websocketService.currentQuestionMessage.subscribe(questionDto => {
      this.currentQuestion = questionDto;
      if (questionDto.question.target === this.username) {
        this.pendingQuestion = true;
      }
    });
    this.websocketService.currentAnswerMessage.subscribe(answer => {
      this.previousQuestion = this.currentQuestion;
      this.currentQuestion.message = 'erase';
      this.previousAnswer = this.currentAnswer;
      this.currentAnswer = answer;
      this.pendingQuestion = false;

      console.log('CURRENT ANSWER: ', this.currentAnswer);
      console.log('PREVIOUS QUESTION: ', this.previousQuestion);

    });
  }

  getFullImgLink(shortLink: string): string {
    return environment.restUrl + '/' + shortLink;
  }

  determineLocation(name: string): string {
    if (name === 'шпион') {
      return 'неизвестна';
    }
    return name;
  }

  getMapLink(number: number):string {
    return environment.restUrl+"/api/images/map"
  }
}
