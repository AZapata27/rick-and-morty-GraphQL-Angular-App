import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '@shared/services/localStorage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  charactersFavorites$= this.localStorageService.charactersFavorites$;

  constructor(private localStorageService: LocalStorageService) { }



  ngOnInit(): void {
  }

}
