import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Vivienda } from 'src/app/models/vivienda';
import { ViviendaService } from 'src/app/services/vivienda.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  vivienda: Vivienda = new Vivienda();
  viviendas: Vivienda[] = [];
  paginador: any;

  constructor(private viviendaService: ViviendaService,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      let page: number = +params.get('page');
      if(!page) page = 0;
      this.viviendaService.getViviendasPageable(page).subscribe( response => {
        this.viviendas = response.content as Vivienda[];
        this.paginador = response;
      })
    })
  }

  buscarViviendas() {
    this.viviendaService.getViviendas().subscribe(viviendas => this.viviendas = viviendas);
  }

  limpiarFormulario(): void {
    this.vivienda.city = "";
    this.vivienda.street = "";
    this.vivienda.price = null;
    this.vivienda.meters = null;
    this.vivienda.bedrooms = null;
    this.vivienda.restrooms = null;
    this.buscarViviendas();
  }

}
