import { Component, OnInit } from '@angular/core';
import { Cliente } from 'src/app/models/cliente';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  cliente: Cliente = new Cliente();

  constructor() { }

  ngOnInit(): void {
  }

  submit(): void {
    
  }

}
