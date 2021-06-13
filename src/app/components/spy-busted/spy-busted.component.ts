import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {QuestionDto} from "../../services/websocket/websocket.service";

@Component({
  selector: 'app-spy-busted',
  templateUrl: './spy-busted.component.html',
  styleUrls: ['./spy-busted.component.css']
})
export class SpyBustedComponent implements OnInit {
  locationName: string = '';

  constructor(@Inject(MAT_DIALOG_DATA) public data: {location: string, message: string}) { }

  ngOnInit(): void {
  }

}
