import {Component, Input, OnInit} from '@angular/core';
import {
  Message,
  Player,
  Suspect,
  SuspectAction,
  WebsocketService,
  WsMessageType
} from "../../services/websocket/websocket.service";
import {Router} from "@angular/router";

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

  constructor(private websocketService: WebsocketService, private router: Router) {
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
    if (suspectedPlayer.suspecting.includes(this.username)) {
      suspect.action = SuspectAction.SET;
    } else {
      suspect.action = SuspectAction.REMOVE;
    }
    this.websocketService.sendMessage(new Message(WsMessageType.SUSPECT, this.token, suspect))
  }
}
