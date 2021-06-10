import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth/auth.service";
import {Message, Player, WebsocketService, WsMessageType} from "../../services/websocket/websocket.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-main-board',
  templateUrl: './main-board.component.html',
  styleUrls: ['./main-board.component.css']
})
export class MainBoardComponent implements OnInit {
  token: string;
  username: string;
  players: Player[];

  constructor(private authService: AuthService, private websocketService: WebsocketService, private router: Router) {
  }

  ngOnInit(): void {
    if (localStorage.getItem("token") === null || localStorage.getItem("username") === null) {
      this.router.navigate(['login']);
    }
    this.token = <string>localStorage.getItem("token")
    this.username = <string>localStorage.getItem("username")

    this.websocketService.currentInfoMessage.subscribe(info => {
      // todo proper info display
      console.log('INFORMATION: ', info);
    })
    this.websocketService.currentPlayerListMessage.subscribe(players => {
      this.players = players;
      console.log('renewed player list', players);
    });
    this.websocketService.sendMessage(new Message(WsMessageType.REGISTER, this.token, {}));
    this.websocketService.sendMessage(new Message(WsMessageType.CONNECTED, this.token, {}));
  }

  startGame(): void {
    this.websocketService.sendMessage(new Message(WsMessageType.STARTGAME,this.token, {}));
  }

  restartGame(): void {
    this.websocketService.sendMessage(new Message(WsMessageType.RESTART, this.token, {}))
  }
}
