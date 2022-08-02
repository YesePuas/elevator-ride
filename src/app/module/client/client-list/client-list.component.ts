import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { NbDialogService } from '@nebular/theme';
import { User } from 'src/app/core/interfaces/user';
import { ClientFormComponent } from '../client-form/client-form.component';

interface TreeNode<T> {
  data: T;
  children?: TreeNode<T>[];
  expanded?: boolean;
}

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.scss'],
})
export class ClientListComponent implements OnInit {
  defaultColumns = ['nombre', 'cedula', 'telefono', 'direccion'];
  customColumn = 'action';
  allColumns = [this.customColumn, ...this.defaultColumns];

  constructor(private router: Router, private dialogService: NbDialogService) {}

  ngOnInit(): void {}

  data: TreeNode<User>[] = [
    {
      data: {
        id: '2',
        nombre: 'Projects',
        cedula: '1.8 MB',
        telefono: '5',
        direccion: 'dir',
      },
    },
    {
      data: {
        id: '2',
        nombre: 'Reports',
        cedula: 'dir',
        telefono: '400 KB',
        direccion: 'Carrera 3b',
      },
    },
    {
      data: {
        id: '2',
        nombre: 'Other',
        cedula: 'dir',
        telefono: '109 MB',
        direccion: 'Calle 15',
      },
    },
    {
      data: {
        id: '2',
        nombre: 'Projects',
        cedula: '1.8 MB',
        telefono: '5',
        direccion: 'dir',
      },
    },
    {
      data: {
        id: '2',
        nombre: 'Reports',
        cedula: 'dir',
        telefono: '400 KB',
        direccion: 'Carrera 3b',
      },
    },
    {
      data: {
        id: '2',
        nombre: 'Other',
        cedula: 'dir',
        telefono: '109 MB',
        direccion: 'Calle 15',
      },
    },
    {
      data: {
        id: '2',
        nombre: 'Projects',
        cedula: '1.8 MB',
        telefono: '5',
        direccion: 'dir',
      },
    },
    {
      data: {
        id: '2',
        nombre: 'Reports',
        cedula: 'dir',
        telefono: '400 KB',
        direccion: 'Carrera 3b',
      },
    },
    {
      data: {
        id: '2',
        nombre: 'Other',
        cedula: 'dir',
        telefono: '109 MB',
        direccion: 'Calle 15',
      },
    },
  ];

  public prueba(data: any) {
    console.log(data);
  }

  public addClient() {
    this.openDialog();
  }

  public goToDetail(data: any) {
    this.openDialog(data, 'detail');
  }

  public goToEdit(data: any) {
    this.openDialog(data, 'edit');
  }

  public openDialog(object?: User, action?: string) {
    this.dialogService
      .open(ClientFormComponent, {
        context: {
          myObject: object,
          action: action,
        },
      })
      .onClose.subscribe((result) => {
        console.log('Esto llego', result);
      });
  }

  public goToDelete(dialog: TemplateRef<any>) {
    this.dialogService.open(dialog, {
      context: '¿Estás seguro que deseas eliminar un cliente?',
    });
  }

  public confirm(approve: any, ref: any) {
    if (approve) {
      console.log('Se procede a eliminar');
    } else {
      console.log('No pasa nada ');
    }
    ref.close();
  }
}
