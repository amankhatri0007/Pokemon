import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class Util {

  constructor() {}
  routeData:any;
  
  //set data in memory
  set(data){
    this.routeData = data
  }

  //get data from memory
  get(){
    return this.routeData;
  }

}
