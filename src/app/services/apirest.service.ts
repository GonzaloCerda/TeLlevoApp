import { Injectable } from '@angular/core';
import  {  HttpClient,  HttpHeaders,  HttpErrorResponse  }  from '@angular/common/http';
import { retry, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class APIRestService {
  httpOptions = { 
    headers: new HttpHeaders({ 
      'Content-Type': 'application/json', 
      'Access-Control-Allow-Origin' :'*' 
    }) 
  } 
  apiURL = 'https://my-json-server.typicode.com/gonzalocerda/jsonapi';
  // consola local host estando sobre el proyecto : json-server -H [ip] .\apiRest.json 
  constructor(private http:HttpClient){}
  getLocalidades():Observable<any>{ 
    return this.http.get(this.apiURL+'/localidades/').pipe( 
      retry(3) 
    ); 
  }
  getLocalidadesById(id):Observable<any>{ 
    return this.http.get(this.apiURL+'/localidades/'+id).pipe( 
      retry(3) 
    ); 
  }
  getUser():Observable<any>{ 
    return this.http.get(this.apiURL+'/users/').pipe( 
      retry(3) 
    ); 
  }
  getUserById(id):Observable<any>{ 
    return this.http.get(this.apiURL+'/users/'+id).pipe( 
      retry(3) 
    ); 
  }
}
