import { Component } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { BdviajesService } from 'src/app/services/bdviajes.service';
import { Viaje } from 'src/app/interfaces/viaje';

@Component({
  selector: 'app-lista-viajes',
  templateUrl: './lista-viajes.component.html',
  styleUrls: ['./lista-viajes.component.scss'],
})
export class ListaViajesComponent{
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
  constructor(private dataV : BdviajesService, private router : Router) { }
  ionViewWillEnter(){
    this.getViajes()
  }
  getViajes(){
    this.dataV.getViajes().then(viajes =>{
      this.viajes = viajes
      this.viajes.reverse();
    });
  }
  past(viaje:Viaje){
    this.viaje.startgeo.lat = viaje.startgeo.lat
      this.viaje.startgeo.lng = viaje.startgeo.lng
      this.viaje.endgeo.lat = viaje.endgeo.lat
      this.viaje.endgeo.lng = viaje.endgeo.lng
      let navigationExtras: NavigationExtras={
        state:{
          datoLatInit: this.viaje.startgeo.lat, 
          datoLngInit: this.viaje.startgeo.lng,
          datoLatEnd: this.viaje.endgeo.lat,
          datoLngEnd: this.viaje.endgeo.lng,
        }
      };
      this.router.navigate(['inicio/mapa'],navigationExtras);
  }
}
