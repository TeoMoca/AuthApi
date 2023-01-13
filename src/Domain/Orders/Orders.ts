export interface Orders {
    id: string, 
    userId: string, 
    facturation: string, 
    delivery: string
}

export class Orders implements Orders{
    constructor(
        public id:string, 
        public userId:string, 
        public facturation:string, 
        public delivery:string
    ){}
}