import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NetworkService {

  constructor(private http:HttpClient) {}

  //Generic method for Http Get Request
  get(url):Observable<any>{
    return this.http.get(url); 
  }

}
