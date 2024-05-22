import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EntityService {

  constructor(
    private http: HttpClient
  ) {}


  getDatas(entityName: string, query: string, pageNumber: number = 1, pageLimit: number = -1) {
    return this.http.get(environment.apiUrl+entityName+"?query="+query+"&page="+pageNumber+"&size="+pageLimit)
  }

  getDatasById(entityName: string, id: number) {
    return this.http.get(environment.apiUrl+entityName+'/'+id)
  }

  addData(entityName: string, data: any){
    return this.http.post(environment.apiUrl+entityName, data).pipe(catchError(this.handleError))
  }

  updateData(entityName: string, entityId: number, data: any) {
    return this.http.put(environment.apiUrl+entityName+'/'+entityId, data).pipe(catchError(this.handleError))
  }

//   updateDataCarEquipment(entityName: string, carId: number, equipmentId: number, data: any) {
//     return this.http.put(environment.apiUrl+entityName+'/'+carId+'/'+equipmentId, data).pipe(catchError(this.handleError))
//   }

  deleteData(entityName: string, entityId: number) {
    return this.http.delete(environment.apiUrl+entityName+'/'+entityId)
  }

  deleteDataCarEquipment(entityName: string, carId: number, equipmentId: number){
    return this.http.delete(environment.apiUrl+entityName+'/'+carId+'/'+equipmentId);
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage:any
    if (error.status === 400) {
       errorMessage = error.error.message
    }
    else {
        errorMessage = `Le serveur a retourné le code ${error.error.status} : ${error.error.statusText}`;
    }
    return throwError(() => new Error(errorMessage));
  }

}
