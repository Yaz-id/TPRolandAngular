import { Component } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Joueur } from '../common/data/joueur';
import { JoueurService } from '../common/Service/joueur.service';
import { messageFromError } from '../common/util/util';
import { Nationalite } from '../common/data/nationalite';
import { Pays } from '../common/data/pays';
import { NationaliteService } from '../common/Service/nationalite.service';


@Component({
  selector: 'app-joueur',
  templateUrl: './joueur.component.html',
  styleUrls: ['./joueur.component.css']
})
export class JoueurComponent {
 joueurList : Joueur[] = []; //à afficher
  selectedJoueur : Joueur | null = null; 
  joueur = new Joueur() ; //à saisir dans un formulaire
  codePays : number=0;
  message = "";
 
  listePays : Pays[] =[]; 
  


  textSexe(codeSexe : number) : string {
    if (codeSexe == 0)
      return "homme";
    else
     return "femme";
  }

  constructor(public joueurService : JoueurService , public nationaliteService : NationaliteService){
    this.recupererPays();
    this.recupererJoueurs();
    

  }

  clone(obj : object){
    return JSON.parse(JSON.stringify(obj));
  }
  removeJoueurInArray(joueurs : Joueur[],joueur : Joueur){
    let delIndex=-1;
    for(let i =0;i<joueurs.length; i++){
        if(joueurs[i] == joueur){
            delIndex=i; break;
        }
    }
    if(delIndex>=0){
      joueurs.splice(delIndex,1);
    }
    
}

  onSelect(j:Joueur){
    this.selectedJoueur = j;
    //this.joueur = s; //référence directe : PAS BIEN , PAS BON COMPOERTEMENT
    this.joueur = this.clone(j); //this.joueur est une copie de s , BIEN ,  BON COMPOERTEMENT
  }

   selectionnerPaysSelonId(id: number){
    let pays : Pays = new Pays() ;
     for (let p of this.listePays) {
       if (p.id == id) 
       pays = p;
     }
    return pays ;
   }

  async onUpdate(){
    try{
      this.joueur.nationalite = this.selectionnerPaysSelonId(this.joueur.nationalite.id)
      this.joueur.nationaliteId = this.joueur.nationalite.id

      await firstValueFrom(this.joueurService.putJoueurs$(this.joueur));
      if(this.selectedJoueur!=null){
           this.selectedJoueur.prenom = this.joueur.prenom;
           this.selectedJoueur.nom = this.joueur.nom;
           this.selectedJoueur.dateNaissance = this.joueur.dateNaissance;
           this.selectedJoueur.nationalite = JSON.parse(JSON.stringify(this.joueur.nationalite));
           this.selectedJoueur.nationaliteId = this.joueur.nationaliteId;
           this.selectedJoueur.sexe = this.joueur.sexe;
      }
   }catch(err){
    this.message = messageFromError(<any> err , "echec update ");
    console.log("error:"+ this.message );
   }
  }

  onNew(){
    this.joueur = new Joueur();
    this.selectedJoueur = null;
   }

   async onAdd(){
    try{
      this.joueur.nationalite = this.selectionnerPaysSelonId(this.joueur.nationalite.id)
      this.joueur.nationaliteId = this.joueur.nationalite.id

      let addedJoueur = await firstValueFrom(this.joueurService.postJoueurs$(this.joueur));
      
      this.joueurList.push(addedJoueur);
      this.joueur.id= addedJoueur.id;
      this.selectedJoueur = addedJoueur;

   }catch(err){
    this.message = messageFromError(<any> err , "echec add/post ");
    console.log("error:"+ this.message );
   }
  }

  async onDelete(){
    let joueurDelete = 0;
    if(this.selectedJoueur==null || this.selectedJoueur.id==null) 
        return;
    else 
       joueurDelete = this.selectedJoueur.id;
    try{
      await firstValueFrom(this.joueurService.deleteJoueurs$(joueurDelete));
      this.removeJoueurInArray(this.joueurList,this.selectedJoueur);
      this.selectedJoueur=null;
     
   }catch(err){
     this.message = messageFromError(<any> err , "echec deleteJoueur ");
     console.log("error:"+ this.message );
   }
  }

  async recupererJoueurs(){
    try{
       this.joueurList = await firstValueFrom(this.joueurService.getAllJoueurs$());
    }catch(err){
      this.message = messageFromError(<any> err , "echec getAllJoueur ");
      console.log("error:"+ this.message );
    }
    
  }
  async recupererPays(){
    try{
       this.listePays = await firstValueFrom(this.nationaliteService.getAllPays$());
    }catch(err){
      this.message = messageFromError(<any> err , "echec getAllPays ");
      console.log("error:"+ this.message );
    }
  }
}
