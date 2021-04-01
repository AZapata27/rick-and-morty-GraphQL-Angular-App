import {Injectable} from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Character } from '@shared/interfaces/data.interface';

const MY_FAVORITES = 'myFavorites';

@Injectable({
    providedIn: 'root'
})


export class LocalStorageService{

    private charactersFavoritesSubject = new BehaviorSubject<Character[]>(null);
        charactersFavorites$ = this.charactersFavoritesSubject.asObservable();



        constructor(){
            this.initialStorage();
        }

        private addToFavorite(character : Character):void{

                try {

                const currentsFavorites= this.getFavoritesCharacters();

                localStorage.setItem(MY_FAVORITES,JSON.stringify([...currentsFavorites, character]));
                this.charactersFavoritesSubject.next([...currentsFavorites, character]);
                    
                } catch (error) {
                    console.log('Error saving favorites from local storage', error);
                    alert(error);
                }
        }

        private removeFromFavorites(id : Number): void{

            try {

                const currentsFavorites= this.getFavoritesCharacters();

                const characterFiltered = currentsFavorites.filter(item=> item.id !== id);

                localStorage.setItem(MY_FAVORITES,JSON.stringify([...characterFiltered]));

                this.charactersFavoritesSubject.next([...characterFiltered]);
                
            } catch (error) {

                console.log('Error removing favorites from local storage', error);
                alert(error);
                
            }

        }

        addOrRemoveFavorite(character: Character):void{
            const {id}= character;
            const currentsFavorites= this.getFavoritesCharacters();
            const found = !!currentsFavorites.find((fav: Character)=> fav.id ===id);
            found ? this.removeFromFavorites(id) : this.addToFavorite(character);

        }



        getFavoritesCharacters():any{

            try {
                
                const charactersFavorites= JSON.parse(localStorage.getItem(MY_FAVORITES));
                this.charactersFavoritesSubject.next(charactersFavorites)
                return charactersFavorites;


            } catch (error) {
                console.log('Error getting favorites from local storage', error);
                
            }

        }



        private initialStorage():void{
            const currents= JSON.parse(localStorage.getItem(MY_FAVORITES))
            if(!currents){
                localStorage.setItem(MY_FAVORITES, JSON.stringify([]));
            }
            this.getFavoritesCharacters();
        }

}

