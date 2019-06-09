import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Lings } from '../models/Lings';
import { LingsService } from '../services/lings.service';
import { MatDialog } from '@angular/material';
import { PageEvent } from "@angular/material/paginator";
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
  //Mat Paginator
  lengthLings: number = 0;
  lengthMyLings: number = 0;
  listLings: Lings[] = [];
  listMyLings: Lings[] = [];
  pageSize: number = 6;
  loading: boolean = true;
  loading_u: boolean = true;
  
  constructor(
    public lings_services: LingsService,
    public dialog: MatDialog,
    public authService: AuthService
  ) { 
    this.pageSize = LingsService.pageSize;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes["user"].currentValue != changes["user"].previousValue) {
      this.updateMyLings();
    }
  }

  setPageLings(evt:PageEvent): void {
    LingsService.pageIndex = evt.pageIndex;
    this.loading = true;
    this.lings_services.LingsAll(this.pageSize, evt.pageIndex * this.pageSize).then(() => {
      LingsService.allFns != [] ? this.loading = false : true;
    });
  }

  getLings(): Lings[] {
    this.loading = true;
    LingsService ? this.listLings = LingsService.allFns : [];
    this.listLings != [] ? this.loading = false : this.loading = true;
    return this.listLings;
  }

  getLengthLings(): number {
    LingsService ? this.lengthLings = LingsService.lengthFns : [];
    return this.lengthLings;
  }

  setPageMyLings(evt: PageEvent): void {
    LingsService.pageIndex = evt.pageIndex;
    this.loading_u = true;
    this.lings_services.LoadUserFns(this.user.uid, this.pageSize, evt.pageIndex * this.pageSize).then(() => {
      LingsService.userFns != [] ? this.loading_u = false : true;
    });
  }

  getMyLings(): Lings[] {
    LingsService ? this.listMyLings = LingsService.userFns : [];
    return this.listMyLings;
  }

  getLengthMyLings(): number {
    LingsService ? this.lengthMyLings = LingsService.lengthUserFns : [];
    return this.lengthMyLings;
  }

  updateMyLings() {
    if (this.user != undefined){
      this.loading_u = true;
      this.lings_services.LengthUser(this.user.uid);
      this.lings_services.LoadUserFns(this.user.uid, this.pageSize, 0).then(()=>{
        this.loading_u = false; 
      });
    }
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

    dialogRef.afterClosed();
  }

}
