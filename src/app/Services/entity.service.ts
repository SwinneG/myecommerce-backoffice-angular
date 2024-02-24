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

  searchDatasByPage(entityName: string, query: string, pageNumber: number = 1, pageLimit: number = 5) {
    return this.http.get(environment.apiUrl+entityName+"/search?query="+query+"&page="+pageNumber+"&size="+pageLimit)
  }

  getDatasById(entityName: string, id: number) {
    return this.http.get(environment.apiUrl+entityName+'/'+id)
  }

}
