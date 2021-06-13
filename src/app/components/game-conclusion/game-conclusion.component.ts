import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {GameConclusion} from "../../services/websocket/websocket.service";

@Component({
  selector: 'app-game-conclusion',
  templateUrl: './game-conclusion.component.html',
  styleUrls: ['./game-conclusion.component.css']
})
export class GameConclusionComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: GameConclusion) { }

  ngOnInit(): void {
  }

}
