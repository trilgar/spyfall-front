import {Component, Input, OnInit} from '@angular/core';
import {
  Answer,
  GameCardDto,
  Message,
  QuestionDto,
  WebsocketService,
  WsMessageType
} from "../../services/websocket/websocket.service";
import {environment} from "../../../environments/environment";
import {GuessLocationComponent} from "../guess-location/guess-location.component";
import {MatDialog} from "@angular/material/dialog";
import {QuestionComponent} from "../question/question.component";

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
  spyGuessLocation: string | null;
  token = <string>localStorage.getItem("token");

  constructor(private websocketService: WebsocketService, private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.websocketService.currentQuestionMessage.subscribe(questionDto => {
      this.currentQuestion = questionDto;
      if (questionDto.question.target === this.username) {
        this.answerQuestion(questionDto);
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

  answerQuestion(questionDto: QuestionDto): void {
    const dialogRef = this.dialog.open(QuestionComponent, {
      data: questionDto
    });
    let answerMessage ='';
    dialogRef.afterClosed().subscribe(result => {
      console.log('Answer text: ', result);
      answerMessage = result;
      const answer = new Answer();
      answer.question = this.currentQuestion.question.question;
      answer.answer = answerMessage;
      this.websocketService.sendMessage(new Message(WsMessageType.ANSWER, this.token, answer))
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

  getMapLink(number: number): string {
    return environment.restUrl + "/api/images/map"
  }

  guessLocation(): void {
    const dialogRef = this.dialog.open(GuessLocationComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.spyGuessLocation = result;
      if (this.spyGuessLocation != null) {
        this.websocketService.sendMessage(new Message(WsMessageType.GUESSLOCATION, this.token, this.spyGuessLocation));
      }
    });
  }
}
