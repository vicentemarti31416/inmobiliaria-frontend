import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { ClienteService } from './services/cliente.service';
import { ViviendaService } from './services/vivienda.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaginadorComponent } from './components/paginador/paginador.component';
import { DetailsComponent } from './components/details/details.component';
import { FooterComponent } from './components/footer/footer.component';
import { FormViviendasComponent } from './components/form-viviendas/form-viviendas.component';
import { FormUsuariosComponent } from './components/form-usuarios/form-usuarios.component';
import { ContactComponent } from './components/contact/contact.component';
import { LoginComponent } from './components/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    PaginadorComponent,
    DetailsComponent,
    FooterComponent,
    FormViviendasComponent,
    FormUsuariosComponent,
    ContactComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    ClienteService,
    ViviendaService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
