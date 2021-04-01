import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { BehaviorSubject } from 'rxjs';
import { take, tap } from 'rxjs/operators';
import { Character, DataResponse, Episode } from '@shared/interfaces/data.interface';
import { LocalStorageService} from '@shared/services/localStorage.service';

const QUERY = gql`
  {
    episodes {
      results {
        name
        episode
      }
    }
    characters {
      results {
        id
        name
        status
        species
        gender
        image
      }
    }
  }
`;

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private episodesSubject = new BehaviorSubject<Episode[]>(null);
  episodes$ = this.episodesSubject.asObservable();

  private charactersSubject = new BehaviorSubject<Character[]>(null);
  characters$ = this.charactersSubject.asObservable();

  constructor(private apollo: Apollo,private localStorageService: LocalStorageService) {
    this.getDataApi();
  }

  private getDataApi(): void {
    this.apollo
      .watchQuery<DataResponse>({
        query: QUERY,
      })
      .valueChanges.pipe(
        take(1),
        tap(({ data }) => {
          const { characters, episodes } = data;
          this.episodesSubject.next(episodes.results);
          this.parseCharactersData(characters.results);
        })
      )
      .subscribe();
  }



    private parseCharactersData(characters: Character[]):void{

      const currentsFavorite = this.localStorageService.getFavoritesCharacters();
      const newData= characters.map(character=>{

          const found = !!currentsFavorite.find ((fav:Character)=>fav.id===character.id);

          return {...character, isFavorite: found};
      });

      this.charactersSubject.next(newData);
    }










}
