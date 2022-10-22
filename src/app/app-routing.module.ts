import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactComponent } from './components/contact/contact.component';
import { DetailsComponent } from './components/details/details.component';
import { FormViviendasComponent } from './components/form-viviendas/form-viviendas.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { RoleGuard } from './guards/role.guard';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: HomeComponent },
  { path: 'viviendas/page/:page', component: HomeComponent },
  { path: 'detalle/:id', component: DetailsComponent },
  { path: 'form-viviendas', component:FormViviendasComponent },
  { path: 'form-viviendas/:id', component: FormViviendasComponent, canActivate: [AuthGuard, RoleGuard], data: {role: 'ROLE_ADMIN'} },
  { path: 'contacto', component: ContactComponent },
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: '/' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
