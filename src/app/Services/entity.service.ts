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


  getDatas(entityName: string, query: string, pageNumber: number = 1, pageLimit: number = 5) {
    return this.http.get(environment.apiUrl+entityName+"?query="+query+"&page="+pageNumber+"&size="+pageLimit)
  }

  getDatasById(entityName: string, id: number) {
    return this.http.get(environment.apiUrl+entityName+'/'+id)
  }

  addData(entityName: string, data: any){
    return this.http.post(environment.apiUrl+entityName, data)
  }

  updateData(entityName: string, entityId: number, data: any) {
    return this.http.put(environment.apiUrl+entityName+'/'+entityId, data)
  }

  deleteData(entityName: string, entityId: number) {
    return this.http.delete(environment.apiUrl+entityName+'/'+entityId)
  }

}
