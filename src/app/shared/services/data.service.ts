import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { BehaviorSubject } from 'rxjs';
import { take, tap } from'rxjs/operators';


const QUERY= gql`
{
  characters{
    episodes{
      results{
        name
        episode
      }
    }
    results {
      name
      status
      species
      gender
      origin{
        name
      }
      location{
        name
      }
      image
    }
  }
}
`;


@Injectable({
  providedIn: 'root'
})
export class DataService {

  private episodeSubject = new BehaviorSubject<any[]>(null);
  episodes$ = this.episodeSubject.asObservable();

  private charactersSubject = new BehaviorSubject<any[]>(null);
  characters$ = this.charactersSubject.asObservable();


  
  constructor(private apollo: Apollo) { 

    this.getDataApi();
  }



  private getDataApi():void{
    this.apollo.watchQuery<any>({
      query: QUERY
    }).valueChanges.pipe(
        take(1),
        tap(res=>{
          console.log(res);
          
        })
    ).subscribe();
  }
}
