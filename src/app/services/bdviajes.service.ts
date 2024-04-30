import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { ToastController } from '@ionic/angular';
import { Localidade } from '../interfaces/localidade';
import { Viaje } from '../interfaces/viaje';  
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class BdviajesService {

  localidade: Localidade[]=[];
  viaje: Viaje[]=[];
  User: User[]=[];
  estado: string;
  private _storage: Storage | null = null;
  constructor(private storage: Storage, private toastController: ToastController) { 
    this.init();
    this.cargarViajes();
  }
  async init(){
    const storage = await this.storage.create();
    this._storage = storage;
  }
  async cargarViajes(){
    const miViaje=await this.storage.get('viaje')
    if(miViaje){
      this.viaje=miViaje;
    }
  }

  getViajes(): Promise<Viaje[]>{
    return this.storage.get('viaje')
  };

  getUser(): Promise<User[]>{
    return this.storage.get('User')
  }

  guardarUser(user){
    this.User.unshift({
      id:user.id,
      usuario:user.usuario,
      contrasena:user.contrasena,
      email:user.email
    });
    this._storage.set('User',this.User)
    console.log("usuario creado ", this.User)
  }

  guardarViaje(navegacion){
    if(navegacion){
      this.viaje.unshift(
        {
          id:this.viaje.length,
          comienzo:navegacion.comienzo,
          destino:navegacion.destino,
          tarifa:navegacion.tarifa,
          usuario: navegacion.usuario,
          correo: navegacion.correo,
          startgeo:{
            lat:navegacion.startgeo.lat,
            lng:navegacion.startgeo.lng
          },
          endgeo:{
            lat:navegacion.endgeo.lat,
            lng:navegacion.endgeo.lng
          }
        }
      );
      this._storage.set('viaje', this.viaje)
      this.presentToast("Viaje creado con exito");
      console.log(this.viaje)
    }
    else{
      this.presentToast("Error al registrar viaje");
    }
  }

  eliminarDatos(id : number): Promise<Viaje>{
    return this.storage.get("viaje").then((viajes:Viaje[])=>{
      if (!viajes || viajes.length === 0){
        console.log("Nulo");
        return null;
      }

      let vi: Viaje[] = [];

      for (let i of viajes){
        if (i.id !== id){
          vi.push(i);
          console.log("Aca esta la i",i);
        }
      }

      return this.storage.set("viaje", vi)

    });
  }

  async presentToast(mensaje:string){
    const toast = await this.toastController.create({
      message:mensaje,
      position:'top',
      duration: 2000
    });
    toast.present();
  }
}
