import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, Observable, throwError } from 'rxjs';
import { Vivienda } from '../models/vivienda';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class ViviendaService {

  private urlEndpoint: string = 'http://localhost:8080/viviendas';
  private httpHeaders: HttpHeaders = new HttpHeaders({'Content-Type':'application/json'});

  constructor(private httpClient: HttpClient, private router: Router) { }

  public getVivienda(id: number): Observable<Vivienda> {
    return this.httpClient.get<Vivienda>(`${this.urlEndpoint}/${id}`).pipe(
      catchError(e => {
        if(this.isNoAutorizado(e)) return throwError(() => new Error('No tienes autorización para acceder a este recurso'));
        if(e.status === 400) return throwError(() => new Error('Los datos introducidos no son válidos'));
        Swal.fire('No es posible obtener la vivienda', 'Error al obtener la vivienda', 'error');
        return throwError(() => new Error('Error al obtener la vivienda'));
      })
    );
  }

  public getViviendas(): Observable<Vivienda[]> {
    return this.httpClient.get<Vivienda[]>(this.urlEndpoint + "/");
  }

  public getViviendasPageable(page: number): Observable<any> {
    return this.httpClient.get<any>(this.urlEndpoint + '/page/' + page).pipe(
      map((response: any) => {
        (response.content as Vivienda[]);
        return response;
      })
    );
  }

  public addVivienda(vivienda: Vivienda): Observable<Vivienda> {
    console.log(vivienda);
    return this.httpClient.post<Vivienda>(`${this.urlEndpoint}/`, vivienda, {headers: this.httpHeaders}).pipe(
      catchError(e => {
        if(this.isNoAutorizado(e)) return throwError(() => new Error('No estás autorizado para añadir esta vivienda'));
        if(e.status === 400) return throwError(() => new Error('Los daton introducidos no son válidos'));
        Swal.fire('No ha sido posible añadir la vivienda', 'Error al añadir la vivienda', 'error');
        return throwError(() => new Error('Error al añadir la vivienda'));
      })
    );
  }

  public addViviendaWithPhoto(vivienda: Vivienda, archivo: File): Observable<Vivienda> {
    const formData: FormData = new FormData();
    formData.append('archivo', archivo);
    formData.append('price', vivienda.price + '');
    formData.append('meters', vivienda.meters + '');
    formData.append('city', vivienda.city);
    formData.append('street', vivienda.street);
    formData.append('bedrooms', vivienda.bedrooms + '');
    formData.append('restrooms', vivienda.restrooms + '');
    return this.httpClient.post<Vivienda>(this.urlEndpoint + "/photo", formData).pipe(
      catchError(e => {
        if(this.isNoAutorizado(e)) return throwError(() => new Error('No estás autorizado para añadir esta vivienda'));
        if(e.status === 400) return throwError(() => new Error('Los daton introducidos no son válidos'));
        Swal.fire('No ha sido posible añadir la vivienda', 'Error al añadir la vivienda', 'error');
        return throwError(() => new Error('Error al añadir la vivienda'));
      })
    );
  }

  public updateVivienda(vivienda: Vivienda): Observable<Vivienda> {
    return this.httpClient.put<Vivienda>(`${this.urlEndpoint}/${vivienda.id}`, vivienda, {headers: this.httpHeaders}).pipe(
      catchError(e => {
        if(this.isNoAutorizado(e)) return throwError(() => new Error('No estás autorizado para actualizar esta vivienda'));
        if(e.status === 400) return throwError(() => new Error('Los datos introducidos no son válidos'));
        Swal.fire('No ha sido posible actualizar la vivienda', 'Error al actualizar la vivienda', 'error');
        return throwError(() => new Error('Error al actualizar la vivienda'));
      })
    );
  }

  public updateViviendaWithPhoto(vivienda: Vivienda, archivo: File): Observable<Vivienda> {
    const formData: FormData = new FormData();
    formData.append('archivo', archivo);
    formData.append('price', vivienda.price + '');
    formData.append('meters', vivienda.meters + '');
    formData.append('city', vivienda.city);
    formData.append('street', vivienda.street);
    formData.append('bedrooms', vivienda.bedrooms + '');
    formData.append('restrooms', vivienda.restrooms + '');
    return this.httpClient.put<Vivienda>(`${this.urlEndpoint}/photo/${vivienda.id}`, formData).pipe(
      catchError(e => {
        if(this.isNoAutorizado(e)) return throwError(() => new Error('No estás autorizado para actualizar esta vivienda'));
        if(e.status === 400) return throwError(() => new Error('Los datos introducidos no son válidos'));
        Swal.fire('No ha sido posible actualizar la vivienda', 'Error al actualizar la vivienda', 'error');
        return throwError(() => new Error('Error al actualizar la vivienda'));
      })
    );
  }

  public deleteVivienda(vivienda: Vivienda): Observable<void> {
    return this.httpClient.delete<void>(`${this.urlEndpoint}/${vivienda.id}`).pipe(
      catchError(e => {
        if(this.isNoAutorizado(e)) return throwError(() => new Error('No estás autorizado para eliminar esta vivienda'));
        if(e.status === 400) return throwError(() => new Error('Los datos introducidos no son válidos'));
        Swal.fire('No ha sido posible eliminar la vivienda', 'Error al eliminar la vivienda', 'error');
        return throwError(() => new Error('Error al eliminar la vivienda'));
      })
    );
  }

  private isNoAutorizado(e): boolean {
    if(e.status === 401 || e.status === 403) {
      this.router.navigate(['/login']);
      return true;
    } else {
      return false
    }
  }

}
