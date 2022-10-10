import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-paginador',
  templateUrl: './paginador.component.html',
  styleUrls: ['./paginador.component.scss']
})
export class PaginadorComponent implements OnInit {

  @Input() paginador: any;
  paginas: number[];

  constructor() { }

  ngOnInit(): void {
    if(this.paginador.totalPages !== undefined) {
      this.paginas = new Array(this.paginador.totalPages).fill(0).map((valor, indice) => indice + 1);
    }
  }

}
