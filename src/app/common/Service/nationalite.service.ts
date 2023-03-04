import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pays } from '../data/pays';

@Injectable({
  providedIn: 'root'
})
export class NationaliteService {

   //private _apiBaseUrl ="http://localhost:8282/devise-api";  //appel direct sans reverse- proxy
 private _apiBaseUrl ="/api/Pays"; //appel indirect via reverse-proxy 
 // necissite ng serve --proxy-config proxy.conf.json
   constructor(private _http : HttpClient){}
 
   public getAllPays$() : Observable<Pays[]>{ 
     return this._http.get<Pays[]>(this._apiBaseUrl);

  
}
}