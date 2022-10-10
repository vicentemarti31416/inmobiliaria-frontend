import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Vivienda } from 'src/app/models/vivienda';
import { ViviendaService } from 'src/app/services/vivienda.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-viviendas',
  templateUrl: './form-viviendas.component.html',
  styleUrls: ['./form-viviendas.component.scss']
})
export class FormViviendasComponent implements OnInit {

  vivienda: Vivienda = new Vivienda();
  fotoSeleccionada: File;

  constructor(
    private viviendaService: ViviendaService, 
    private router: Router,
    private activatedRoute: ActivatedRoute) { 
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      let id: number = +params['id'];
      if(id) this.viviendaService.getVivienda(id).subscribe(vivienda => {
        this.vivienda = vivienda;
      })
    })
  }

  submit(): void {
    this.viviendaService.addVivienda(this.vivienda).subscribe(vivienda => {
      this.router.navigate(['/']);
    })
  }

  seleccionarFoto(event: any): void {
    this.fotoSeleccionada = event.target.files[0];
    if (this.fotoSeleccionada.name.endsWith('xcf') == true || this.fotoSeleccionada.type.indexOf('image') < 0) {
      Swal.fire('Error al seleccionar la foto', 'Debe seleccionar un archivo de tipo imágen', 'error')
      this.fotoSeleccionada = null;
    }
  }

  public crearConFoto(): void {
    this.viviendaService.addViviendaWithPhoto(this.vivienda, this.fotoSeleccionada).subscribe(vivienda => {
      Swal.fire('Vivienda creada correctamente', '', 'success');
      this.router.navigate(['/']);
      }  
    )
  }

  public editarConFoto(): void {
    this.viviendaService.updateViviendaWithPhoto(this.vivienda, this.fotoSeleccionada).subscribe(vivienda => {
      Swal.fire('Vivienda actualizada correctamente', '', 'success');
      this.router.navigate(['/']);
    })
  }

}
