import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { LoginService } from 'src/app/services/login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  user: User = new User();

  constructor(
    private loginService: LoginService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  loguin(): void {
    if (this.user.username == (null || '') || this.user.password == (null || '')) {
      Swal.fire('Error de login', 'Los campos no pueden estar vacíos', 'error');
      return;
    }
    this.loginService.login(this.user).subscribe(response => {
      let payload = JSON.parse(atob(response.access_token.split(".")['1']))
      console.log(payload);
      this.loginService.guardarUsuario(response.access_token);
      this.loginService.guardarToken(response.access_token);
      this.router.navigate(['/']);
      Swal.fire('Inicio de sesión correcto', `Bienvenido, ${payload.sub}`, 'success');
    })
  }

}
