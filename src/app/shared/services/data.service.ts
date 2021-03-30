import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { BehaviorSubject } from 'rxjs';


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

  episodeSubject

  constructor() { }
}
