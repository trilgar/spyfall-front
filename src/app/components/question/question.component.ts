import {Component, Input, OnInit} from '@angular/core';
import {
  Answer,
  Message,
  QuestionDto,
  WebsocketService,
  WsMessageType
} from "../../services/websocket/websocket.service";

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {
  @Input() questionDto: QuestionDto;
  answerText = '';
  token: string;

  constructor(private websocketService: WebsocketService) {
  }

  ngOnInit(): void {
    this.token = <string>localStorage.getItem("token");
    // this.questionDto = {
    //   message: "you`ve been asked the question/ answer as you want",
    //   question: {
    //     source: 'trilgar',
    //     target: 'tebe',
    //     question: 'hello, how are you actually? Question message here'
    //
    //   }
    // }
  }

  sendAnswer(): void {
    const answer = new Answer();
    answer.question = this.questionDto.question.question;
    answer.answer = this.answerText;
    this.websocketService.sendMessage(new Message(WsMessageType.ANSWER, this.token, answer))
  }
}
