import {Component, Input, OnInit} from '@angular/core';
import {
  Message,
  Player, Question,
  Suspect,
  SuspectAction,
  WebsocketService,
  WsMessageType
} from "../../services/websocket/websocket.service";
import {Router} from "@angular/router";
import {GuessLocationComponent} from "../guess-location/guess-location.component";
import {MatDialog} from "@angular/material/dialog";
import {AskQuestionComponent} from "../ask-question/ask-question.component";

@Component({
  selector: 'app-left-menu',
  templateUrl: './left-menu.component.html',
  styleUrls: ['./left-menu.component.css']
})
export class LeftMenuComponent implements OnInit {
  token: string;
  username: string;
  @Input() questionGranted: string;
  @Input() players: Player[];

  targetUser = '';

  constructor(private websocketService: WebsocketService, private router: Router, private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.token = <string>localStorage.getItem("token");
    this.username = <string>localStorage.getItem("username");
    this.websocketService.currentQuestionMessage.subscribe(questionDto => {
      if (questionDto.question.source === this.username) {
        this.targetUser = '';
      }
    })
  }

  suspect(suspected: string): void {
    const suspectedPlayer = this.players.find(player => {
      return player.username === suspected;
    });
    if (suspectedPlayer == null) {
      return;
    }
    const suspect = new Suspect();
    suspect.suspected = suspected;
    suspect.suspecting = this.username;
    if (!suspectedPlayer.suspecting.includes(this.username)) {
      suspect.suspectAction = SuspectAction.SET;
    } else {
      console.log(suspectedPlayer.suspecting);
      suspect.suspectAction = SuspectAction.REMOVE;
    }
    this.websocketService.sendMessage(new Message(WsMessageType.SUSPECT, this.token, suspect))
  }

  askQuestion(username: string) {
    const dialogRef = this.dialog.open(AskQuestionComponent, {
      data: username
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      const question = new Question();
      question.source = this.username;
      question.target = username;
      question.question = result;
      this.websocketService.sendMessage(new Message(WsMessageType.QUESTION, this.token, question));
    });
  }
}
