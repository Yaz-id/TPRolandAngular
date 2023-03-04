export class Student {
    constructor(
        public id :number | null= null,
        public firstMidName : string = "",
        public lastName : string = "",
        public enrollmentDate : string =  (new Date).toISOString().split('T')[0]
    ){}
}