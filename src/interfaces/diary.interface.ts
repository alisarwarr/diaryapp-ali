export interface diary {
    title       : string;
    privacy     : 'private' | 'public';
    notes       : string;
    id          : number;
    userId      : number;
    createdDate : any;
    createdTime : any;
}