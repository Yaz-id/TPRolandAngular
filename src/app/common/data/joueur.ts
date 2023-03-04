import { Nationalite } from "./nationalite";


export class Joueur {
    
    constructor(
        public id :number=0,
        public prenom : string = "",
        public nom : string = "",
        public nationalite : Nationalite = new Nationalite(),
        public dateNaissance : string =  (new Date).toISOString().split('T')[0],
        public nationaliteId : number = 0,
        public sexe : number= 0,
        public photoUrl : string=""

    ){}
}

 
   
    
   
   