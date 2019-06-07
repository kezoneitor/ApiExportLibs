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
  ) {
  }

  ngOnInit() {
    //this.readAll();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes["user"].currentValue != changes["user"].previousValue) {
      this.updateMyLings();
    }
  }
  getMyLings() {
    return LingsService ? LingsService.userFns : [];
  }
  updateMyLings() {
    if (this.user != undefined){
      this.lings_services.LoadUserFns(this.user.uid);
    }
    /*
    this.myLings = [];
    if (this.user !== undefined) {
      this.lings_services.LoadUserFns(this.user.uid).subscribe({
        next: result => {
          this.myLings = result;
        }, error: error => {
          console.error(error);
        }
      });
    }
    */
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
    });

  }
  getLings(): Lings[] {
    return LingsService ? LingsService.allFns : [];
  }
}
/*
  readAll() {
    this.lings_services.LingsAll().subscribe((res: Lings[]) => {
      SearchLibComponent.lings = res;
      this.myListLings();
    });
  }
*/
