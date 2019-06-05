import { Component, OnInit } from '@angular/core';
import { LingsService } from '../services/lings.service';
import { Lings } from '../models/Lings';

export interface Category {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-search-lib',
  templateUrl: './search-lib.component.html',
  styleUrls: ['./search-lib.component.css']
})
export class SearchLibComponent implements OnInit {

  categories: Category[] = [
    {value: 'code', viewValue: 'Código'},
    {value: 'description', viewValue: 'Descripción'},
    {value: 'f_name', viewValue: 'Nombre'},
    {value: 'function_user', viewValue: 'Usuario'},
    {value: 'tags', viewValue: 'Etiquetas'}
    
  ];

  public selectedCategory: string;
  public searchParameters: string;
  public lings: Lings[];

  /*
   Por usuario
b) Por descripción
c) Por código
d) Por etiqueta
e) Por nombre de función
  */
  constructor(private lingsService:LingsService) { }

  ngOnInit() {
  }

  realizarBusqueda(){

    console.log(this.searchParameters);
    console.log(this.selectedCategory);

    this.lingsService.LingsSearch(this.selectedCategory,this.searchParameters).subscribe((lings: Lings[])=>{
      this.lings = lings;
      console.log("LINGS OBTENIDAS");
      console.log(this.lings);
      console.log("LINGS OBTENIDAS");
    });

    console.log("ffff");
  }
  
}
