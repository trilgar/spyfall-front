import {Component, Inject, Input, OnInit} from '@angular/core';
import {
  Message,
  Question,
  QuestionDto,
  WebsocketService,
  WsMessageType
} from "../../services/websocket/websocket.service";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";

@Component({
  selector: 'app-ask-question',
  templateUrl: './ask-question.component.html',
  styleUrls: ['./ask-question.component.css']
})
export class AskQuestionComponent implements OnInit {
  token = <string>localStorage.getItem("token");
  username = <string>localStorage.getItem("username")
  targetUser: string;
  questionText = '';

  constructor(private websocketService: WebsocketService, @Inject(MAT_DIALOG_DATA) public data: string) {
  }

  ngOnInit(): void {
  }


}
