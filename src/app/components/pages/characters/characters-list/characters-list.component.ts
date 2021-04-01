import { DOCUMENT } from '@angular/common';
import { Component, HostListener, Inject, Input, OnInit } from '@angular/core';
import { inject } from '@angular/core/testing';
import { DataService } from '@app/shared/services/data.service';
import { LocalStorageService } from '@app/shared/services/localStorage.service';

@Component({
  selector: 'app-characters-list',
  templateUrl: './characters-list.component.html',
  
  styleUrls: ['./characters-list.component.scss']
})
export class CharactersListComponent implements OnInit {
 

  characters$ = this.dataService.characters$;
  showButton =false;
  private pageNum= 2;
  private scrollHeight=500;

  constructor ( @Inject(DOCUMENT) private document : Document,private dataService: DataService,private localStorageService : LocalStorageService) { }

  @HostListener('window:scroll')

  onWindowScroll():void{
  
    const yOffSet= window.pageYOffset;
    const scrollTop= this.document.documentElement.scrollTop;
    this.showButton = (yOffSet|| scrollTop)>this.scrollHeight;

  }

    onScrollTop():void{
      this.document.documentElement.scrollTop=0;


    }

    onScrollDown():void{

      

      this.dataService.getCharacterByPage(this.pageNum);
      this.pageNum++;
      

    }

    ngOnInit(){

    }

}
