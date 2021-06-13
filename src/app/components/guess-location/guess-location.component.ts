import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-guess-location',
  templateUrl: './guess-location.component.html',
  styleUrls: ['./guess-location.component.css']
})
export class GuessLocationComponent implements OnInit {
  locationName: string = '';

  constructor() { }

  ngOnInit(): void {
  }

}
