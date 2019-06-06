import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Lings } from '../models/Lings';
import { LingsService } from '../services/lings.service';
import { MatDialog } from '@angular/material';
import { FunctionViewComponent, functionData } from '../function-view/function-view.component';
import { AuthService } from "../auth/auth.service";
import { MUser } from "../models/mUser";

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnChanges {
  public listLings: Lings[];
  public myLings: Lings[];
  editor: functionData = {
    name: "",
    desc: "",
    code: "",
    fullcode: "",
    tags: "",
    params: "",
    deps: {},
    id: ""
  }
  @Input('user') user: MUser;
  
  constructor(
    public lings_services: LingsService,
    public dialog: MatDialog,
    public authService: AuthService
  ) { }

  ngOnInit() {
    this.readAll();
  }

  ngOnChanges() {
    if (this.listLings !== undefined){
      this.myListLings();
    }
  }

  myListLings(): void {
    this.myLings = [];
    if (this.user !== undefined) {
      this.listLings.forEach(ling => {
        if (ling.function_user === this.user.uid) {
          this.myLings.push(ling);
        }
      });
    }
  }

  readAll() {
    this.lings_services.LingsAll().subscribe((res: Lings[]) => {
      this.listLings = res;
      this.myListLings();
    });
  }

  view(id: string): void {
    this.editor = {
      name: "",
      desc: "",
      code: "",
      fullcode: "",
      tags: "",
      params: "",
      deps: {},
      id: id
    }
    const dialogRef = this.dialog.open(FunctionViewComponent, {
      width: '50vw',
      data: this.editor
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(console.log(result));
    });
  }
}
