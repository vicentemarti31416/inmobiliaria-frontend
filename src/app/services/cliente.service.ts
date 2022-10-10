import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, Observable, switchAll, throwError } from 'rxjs';
import { Cliente } from '../models/cliente';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private urlEndpoint: string = 'http://localhost:8080/clientes/';
  private httpHeaders: HttpHeaders = new HttpHeaders({'Content-Type':'application/json'});

  constructor(private httpClient: HttpClient, private router: Router) { }

  public getCliente(cliente: Cliente): Observable<Cliente> {
    return this.httpClient.get<Cliente>(`${this.urlEndpoint}/${cliente.id}`).pipe(
      catchError((error: Response) => {
        this.isNoAutorizado(error);
        return throwError(() => new Error('No tienes autorización para acceder a este recurso'));
      })
    );
  }

  public getClientes(): Observable<Cliente[]> {
    return this.httpClient.get<Cliente[]>(this.urlEndpoint);
  }

  public getClientesPageable(page: number): Observable<any> {
    return this.httpClient.get<any>(`${this.urlEndpoint}page/${page}`).pipe(
      map((response: any) => {
        response.content as Cliente[];
        return response;
      })
    );
  }

  public addCliente(cliente: Cliente): Observable<Cliente> {
    return this.httpClient.post<Cliente>(this.urlEndpoint, cliente, {headers: this.httpHeaders}).pipe(
      catchError((error) => {
        if(this.isNoAutorizado(error)) return throwError(() => new Error('No tienes autorización para acceder a este cliente'));
        if(error.status === 400) return throwError(() => new Error('Los dátos introducidos no son válidos'));
        Swal.fire('No ha podido crearse el cliente', 'Error al crear el cliente', 'error');
        return throwError(() => new Error('Error al crear el cliente'));
      })
    );
  }

  public updateCliente(cliente: Cliente): Observable<Cliente> {
    return this.httpClient.put<Cliente>(`${this.urlEndpoint}/${cliente.lastname}`, cliente, {headers: this.httpHeaders}).pipe(
      catchError(e => {
        if(this.isNoAutorizado(e)) return throwError(() => new Error('No tienes autorización para actualizar este cliente'));
        if(e.status === 400) return throwError(() => new Error('Los datos introducidos no son válidos'));
        Swal.fire('No ha sido posible actualizar el cliente', 'Error al actualizar el cliente', 'error');
        return throwError(() => new Error('Error al actualizar el cliente'))
      })
    );
  }

  public deleteCliente(cliente: Cliente): Observable<void> {
    return this.httpClient.delete<void>(`${this.urlEndpoint}/${cliente.id}`).pipe(
      catchError(e => {
        if(this.isNoAutorizado(e)) return throwError(() => new Error('No tienes autorización para eliminar a este cliente'));
        if(e.status === 400) return throwError(() => new Error('Los datos introducidos no son válidos'));
        Swal.fire('No ha sido posible eliminar el cliente', 'Error al eliminar el cliente', 'error');
        return throwError(() => new Error('Error al eliminar el cliente'));
      })
    );
  }

  private isNoAutorizado(e): boolean {
    if (e.status == 401 || e == 403) {
      this.router.navigate(['/login'])
      return true;
    } else {
      return false;
    }
  }

}
