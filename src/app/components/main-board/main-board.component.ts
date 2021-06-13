import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth/auth.service";
import {
  GameCardDto, GameConclusion,
  Message,
  Player,
  WebsocketService,
  WsMessageType
} from "../../services/websocket/websocket.service";
import {Router} from "@angular/router";
import {take} from "rxjs/operators";
import {GuessLocationComponent} from "../guess-location/guess-location.component";
import {MatDialog} from "@angular/material/dialog";
import {SpyBustedComponent} from "../spy-busted/spy-busted.component";
import {GameConclusionComponent} from "../game-conclusion/game-conclusion.component";

@Component({
  selector: 'app-main-board',
  templateUrl: './main-board.component.html',
  styleUrls: ['./main-board.component.css']
})
export class MainBoardComponent implements OnInit {
  token: string;
  username: string;
  players: Player[];
  hostname: string;
  questionGranted: string;
  currentLocation: GameCardDto;

  constructor(private authService: AuthService, private websocketService: WebsocketService, private router: Router, private dialog: MatDialog) {
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
    });
    this.websocketService.currentGameCardMessage.subscribe(gameCard => {
      this.currentLocation = gameCard;
    });
    this.websocketService.currentPlayerListMessage.subscribe(players => {
      this.players = players;
      console.log('renewed player list', players);
    });
    this.websocketService.currentQuestionGrantedMessage.subscribe(granted => this.questionGranted = granted);
    this.websocketService.currentHostMessage.pipe(take(1)).subscribe(host => this.hostname = host);
    this.websocketService.currentSpyBustedMessage.subscribe(message => {
      const dialogRef = this.dialog.open(SpyBustedComponent, {
        data: {location: this.currentLocation.gameCard.name, message: message}
      });
      dialogRef.afterClosed().subscribe(locationName => {
        if(locationName!=null && locationName.length > 0 && this.currentLocation.gameCard.name === 'шпион'){
          this.websocketService.sendMessage(new Message(WsMessageType.GUESSLOCATION, this.token, locationName));
        }
      });
    });

    this.websocketService.currentConclusionMessage.subscribe(conclusion => {
      this.dialog.open(GameConclusionComponent, {
        data: conclusion
      });
    })


    this.websocketService.sendMessage(new Message(WsMessageType.REGISTER, this.token, {}));
    this.websocketService.sendMessage(new Message(WsMessageType.CONNECTED, this.token, {}));
    this.websocketService.sendMessage(new Message(WsMessageType.GETHOST, this.token, {}));
    this.websocketService.sendMessage(new Message(WsMessageType.GETLOCATION, this.token, {}));
  }

  startGame(): void {
    this.websocketService.sendMessage(new Message(WsMessageType.STARTGAME, this.token, {}));
  }

  restartGame(): void {
    this.websocketService.sendMessage(new Message(WsMessageType.RESTART, this.token, {}))
  }
}
