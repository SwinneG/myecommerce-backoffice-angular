import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EntityService {

  constructor(
    private http: HttpClient
  ) {}


  getDatas(entityName: string) {
    return this.http.get(environment.apiUrl+entityName)
  }

  getDatasByPage(entityName: string, pageNumber: number = 1, pageLimit: number = 5) {
    return this.http.get(environment.apiUrl+entityName+"/by/page?page="+pageNumber+"&size="+pageLimit)
  }

}