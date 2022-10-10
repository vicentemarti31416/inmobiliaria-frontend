import { Component, OnInit } from '@angular/core';
import { Vivienda } from 'src/app/models/vivienda';
import { Router, ActivatedRoute } from '@angular/router';
import { ViviendaService } from 'src/app/services/vivienda.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  vivienda: Vivienda;

  constructor(
    private viviendaService: ViviendaService,
    private router: Router, 
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      let id: number = +params['id'];
      if(id) this.viviendaService.getVivienda(id).subscribe(vivienda => {
        this.vivienda = vivienda;
      })
    })
  }

}
