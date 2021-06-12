import {Component, Input, OnInit} from '@angular/core';
import {Message, Question, WebsocketService, WsMessageType} from "../../services/websocket/websocket.service";

@Component({
  selector: 'app-ask-question',
  templateUrl: './ask-question.component.html',
  styleUrls: ['./ask-question.component.css']
})
export class AskQuestionComponent implements OnInit {
  token = <string>localStorage.getItem("token");
  username = <string>localStorage.getItem("username")
  @Input() targetUser: string;
  questionText = '';

  constructor(private websocketService: WebsocketService) {
  }

  ngOnInit(): void {
  }

  askQuestion(): void {
    const question = new Question();
    question.source = this.username;
    question.target = this.targetUser;
    question.question = this.questionText;
    this.websocketService.sendMessage(new Message(WsMessageType.QUESTION, this.token, question));
    this.targetUser = '';
  }

}
