import {Component, Input, OnInit} from '@angular/core';
import {Message, Player, WebsocketService, WsMessageType} from "../../services/websocket/websocket.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-left-menu',
  templateUrl: './left-menu.component.html',
  styleUrls: ['./left-menu.component.css']
})
export class LeftMenuComponent implements OnInit {
  token: string;
  username: string;
  @Input() players: Player[];

  constructor(private websocketService: WebsocketService, private router: Router) {
  }

  ngOnInit(): void {
    this.token = <string>localStorage.getItem("token")
    this.username = <string>localStorage.getItem("username")
  }

}
