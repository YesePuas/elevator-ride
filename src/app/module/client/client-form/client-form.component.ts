import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'app-client-form',
  templateUrl: './client-form.component.html',
  styleUrls: ['./client-form.component.scss'],
})
export class ClientFormComponent implements OnInit {
  @Input() myObject: any;
  @Input() action: any;

  public clientForm = new FormGroup({
    nombre: new FormControl('', Validators.required),
    cedula: new FormControl('', Validators.required),
    telefono: new FormControl('', Validators.required),
    direccion: new FormControl('', Validators.required),
  });

  constructor(protected dialogRef: NbDialogRef<ClientFormComponent>) {}

  ngOnInit(): void {
    if (this.action) {
      console.log('Voy a realiar alguna action', this.action);
      console.log('context', this.myObject);
      this.clientForm.patchValue(this.myObject);
      if (this.action == 'detail') {
        this.clientForm.disable();
      }
    }
  }

  public onSubmit() {
    if (this.action === 'edit') {
      console.log('Para editar la información');
    }
    if (!this.action) {
      console.log('Para guardar la información');
    }
  }

  public close() {
    this.dialogRef.close();
  }
}
