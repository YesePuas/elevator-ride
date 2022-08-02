import cli from '@angular/cli';
import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  addDoc,
  doc,
  collectionData,
  deleteDoc,
  updateDoc,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { User } from 'src/app/core/interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  constructor(private firestore: Firestore) {}

  public addClient(client: User) {
    const clientRef = collection(this.firestore, 'clientes');
    return addDoc(clientRef, client);
  }

  public getClient(): Observable<User[]> {
    const clientRef = collection(this.firestore, 'clientes');
    return collectionData(clientRef, { idField: 'id' }) as Observable<User[]>;
  }

  public delectClient(client: User) {
    const clientDocRef = doc(this.firestore, `clientes/${client.id}`);
    return deleteDoc(clientDocRef);
  }

  public editClient(client: User) {
    const clientUpdateRef = doc(this.firestore, `clientes/${client.id}`);
    return updateDoc(clientUpdateRef, {
      nombre: client.nombre,
      cedula: client.cedula,
      telefono: client.telefono,
      direccion: client.direccion,
    });
  }
}
