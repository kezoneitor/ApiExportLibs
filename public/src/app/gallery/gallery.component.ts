import { Component, OnInit } from '@angular/core';
import { Lings } from '../models/Lings';
import { LingsService } from '../services/lings.service';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {
  private listLings: Lings[];
  constructor(
    public lings_services: LingsService
  ) { }

  ngOnInit() {
    this.readAll();
  }

  readAll(){
    this.lings_services.LingsAll().subscribe((res: Lings[]) => {
      this.listLings = res;
      console.log(this.listLings);
    })
  }

}
