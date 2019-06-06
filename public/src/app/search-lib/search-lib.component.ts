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
<<<<<<< HEAD
    {value: 'code', viewValue: 'Código'},
    {value: 'description', viewValue: 'Descripción'},
    {value: 'f_name', viewValue: 'Nombre'},
    {value: 'displayname', viewValue: 'Usuario'},
    {value: 'tags', viewValue: 'Etiquetas'}
    
=======
    { value: 'code', viewValue: 'Código' },
    { value: 'description', viewValue: 'Descripción' },
    { value: 'f_name', viewValue: 'Nombre' },
    { value: 'function_user', viewValue: 'Usuario' },
    { value: 'tags', viewValue: 'Etiquetas' }

>>>>>>> 830cd6dd92c6ad356d2b0a80666cb0907d7f6ba6
  ];

  public selectedCategory: string;
  public searchParameters: string;
  public static lings: Lings[];

  /*
   Por usuario
b) Por descripción
c) Por código
d) Por etiqueta
e) Por nombre de función
  */
  constructor(private lingsService: LingsService) {
    SearchLibComponent.lings = [];
    this.lingsService.LingsAll().subscribe({
      next: result => {
        SearchLibComponent.lings = result;
      },
      error: error => {
        console.log(error);
      }
    });
  }

  ngOnInit() {
  }

  realizarBusqueda() {

    console.log(this.searchParameters);
    console.log(this.selectedCategory);

    this.lingsService.LingsSearch(this.selectedCategory, this.searchParameters).subscribe((lings: Lings[]) => {
      SearchLibComponent.lings = lings;
      console.log("LINGS OBTENIDAS");
      console.log(SearchLibComponent.lings);
      console.log("LINGS OBTENIDAS");
    });

    console.log("ffff");
  }

}
