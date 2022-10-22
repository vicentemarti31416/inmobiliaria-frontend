import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { User } from '../models/user';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private _user: User;
  private _token: string;

  constructor(
    private httpClient: HttpClient,
    private router: Router
  ) { }

  login(user: User): Observable<any> {
    const urlEndpoint: string = 'http://localhost:8080/login';
    const httpHeaders: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic'
    });
    let params = new URLSearchParams();
    params.set('grant_type', 'password');
    params.set('username', user.username);
    params.set('password', user.password);
    return this.httpClient.post<any>(urlEndpoint, params.toString(), { headers: httpHeaders }).pipe(
      catchError(e => {
        user.username = '';
        user.password = '';
        Swal.fire('No se ha podido iniciar sesión', 'Credenciales incorrectos', 'error');
        return throwError(() => "Credenciales incorrectos");
      })
    );
  }

  guardarUsuario(accessToken: string): void {
    let payload = this.obtenerDatosToken(accessToken);
    this._user = new User();
    this._user.name = payload.name;
    this._user.username = payload.sub;
    this._user.roles = payload.roles;
    sessionStorage.setItem('user', JSON.stringify(this._user));
  }

  guardarToken(accessToken: string): void {
    this._token = accessToken;
    sessionStorage.setItem('token', accessToken);
  }

  obtenerDatosToken(accessToken: string): any {
    if (accessToken != null) {
      return JSON.parse(atob(accessToken.split('.')[1]));
    } else {
      return null;
    }
  }

  public get user(): User {
    if (this._user != null) {
      return this._user;
    } else if (this._user == null && sessionStorage.getItem('user') != null) {
      this._user = JSON.parse(sessionStorage.getItem('user')) as User;
      return this._user;
    }
    return new User();
  }
  
  
  public get token(): string {
    if (this._token != null) {
      return this._token;
    } else if (this._token == null && sessionStorage.getItem('token') != null) {
      this._token = sessionStorage.getItem('token');
      return this._token;
    }
    return null;
  }

  isAuthenticaded(): boolean {
    if (this.token != null && this.token.length > 0 && sessionStorage.getItem('token') != null) {
      return true;
    } else {
      return false;
    }
  }

  logout(): void {
    this._token = null;
    this._user = null;
    sessionStorage.clear();
    Swal.fire('Sesión cerrada correctamente', '', 'success');
    this.router.navigate(['/']);
  }

  hasRole(role: string): boolean {
    if (this.user.roles.includes(role)) {
      return true;
    } else {
      return false;
    }
  }

  isExpirado(): boolean {
    let payload = this.obtenerDatosToken(this.token);
    let timeNow = new Date().getTime() / 1000;
    if (timeNow > payload.exp) {
      return true;
    } else {
      return false;
    }
  }

}
