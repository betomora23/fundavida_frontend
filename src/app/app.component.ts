import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Matricula } from './models/matricula';
import { MatriculaService } from './services/matricula.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'fundavida-app';



  constructor() { }

  ngOnInit() {

  }




}
