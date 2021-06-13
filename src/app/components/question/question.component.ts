import {Component, Inject, Input, OnInit} from '@angular/core';
import {
  Answer,
  Message,
  QuestionDto,
  WebsocketService,
  WsMessageType
} from "../../services/websocket/websocket.service";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {
  questionDto: QuestionDto;
  answerText = '';
  token: string;

  constructor(private websocketService: WebsocketService, @Inject(MAT_DIALOG_DATA) public data: QuestionDto) {
  }

  ngOnInit(): void {
    this.token = <string>localStorage.getItem("token");
  }

}
