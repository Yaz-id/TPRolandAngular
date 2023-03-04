import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Joueur } from '../data/joueur';

@Injectable({
  providedIn: 'root'
})
export class JoueurService {

   private _apiBaseUrl ="/api/Joueurs";

  constructor(private _http : HttpClient) { }

  public getAllJoueurs$() : Observable<Joueur[]>{
    return this._http.get<Joueur[]>(this._apiBaseUrl);

 }

  public putJoueurs$(joueur : Joueur ):Observable<any>{
    let url = this._apiBaseUrl + "/" + joueur.id;
    return this._http.put<any>(url,joueur);
}

  


public deleteJoueurs$(idJoueur :number):Observable<void>{
  let url = this._apiBaseUrl + "/" + idJoueur;
  return this._http.delete<void>(url);
}

public postJoueurs$(joueur : Joueur):Observable<Joueur>{
  let url = this._apiBaseUrl ;
  return this._http.post<Joueur>(url,joueur);
}
}
