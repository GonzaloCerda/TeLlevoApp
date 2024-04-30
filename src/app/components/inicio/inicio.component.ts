import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { BdviajesService } from 'src/app/services/bdviajes.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss'],
})
export class InicioComponent{
  viajes:any;
  viaje:any={
    id:null,
    comienzo:"",
    destino:"", 
    tarifa:"",
    usuario:"",
    correo:"",
    startgeo: {
      lat: "",
      lng: ""
    },
    endgeo: {
      lat: "",
      lng: ""
    }
  };
  dato:any;
  constructor(private activeroute: ActivatedRoute, private router: Router, private dataV : BdviajesService, private toast : ToastController) {
    this.activeroute.queryParams.subscribe(params => {
      if(this.router.getCurrentNavigation().extras.state){
        this.dato = this.router.getCurrentNavigation().extras.state.dato;
      }
    })
  }
  ionViewWillEnter(){
    this.getViajes();
  }
  getViajes(){
    this.dataV.getViajes().then(viajes =>{
      this.viajes = viajes
      this.viajes.reverse();
    });
  }

  async toastEliminado() {
    const toast = await this.toast.create({
      message: 'Viaje Eliminado.',
      duration: 1000,
      position: 'top'
    });
    toast.present();
  }
  eliminarViajes(id){
    console.log(id)
    this.dataV.eliminarDatos(id);
  }

  salir(){
    this.router.navigate(['/login']);
  }

}
