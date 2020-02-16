import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  constructor(
    public dialogo: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public text: string) { }

    closeDialog(): void {
      this.dialogo.close(false);
    }
    confirm(): void {
      this.dialogo.close(true);
    }

  ngOnInit() {
  }

}