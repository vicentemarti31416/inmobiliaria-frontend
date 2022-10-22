import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { LoginService } from '../services/login.service';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(
    private loginService: LoginService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
      if(!this.loginService.isAuthenticaded()) {
        Swal.fire('Recurso protegido', 'Tiene que estar autenticado para acceder a este recurso', 'warning');
        this.router.navigate(['/login']);
        return false;
      }
      let role = route.data['role'] as string;
      if (this.loginService.hasRole(role)) {
        return true;
      } else {
        Swal.fire('Permiso insuficiente', 'No tienes permisos para acceder a este recurso', 'warning');
        this.router.navigate(['/']);
        return false;
      }
  }
  
}
