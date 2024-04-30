import { Component } from '@angular/core';
import { APIRestService } from 'src/app/services/apirest.service';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Localidade } from 'src/app/interfaces/localidade';
import { BdviajesService } from 'src/app/services/bdviajes.service';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-crear-viajes',
  templateUrl: './crear-viajes.component.html',
  styleUrls: ['./crear-viajes.component.scss'],
})
export class CrearViajesComponent{
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
  users:any;
  user: any={
    id: null,
    usuario: "",
    email: "",
    contrasena: ""
  }

  get desde() {
    return this.formularioRecuperar.get('desde');
  }
  get destino() {
    return this.formularioRecuperar.get('destino');
  }
  get tarifa() {
    return this.formularioRecuperar.get('tarifa');
  }

  public mensajeError = {
    desde: [
      { type: 'required', message: 'Seleccione una ubicación' },
    ],
    destino: [
      { type: 'required', message: 'Seleccione una destino' },
    ],
    tarifa: [
      { type: 'required', message: 'Ingrese una tarifa' },
      { type: 'max', message: 'tarifa no puede exceder los $2000'}
    ]
  };

  formularioRecuperar = this.formBuilder.group({
    desde: [
      '',
      [
        Validators.required
      ]
    ],
    destino: [
      '',
      [
        Validators.required
      ]
    ],
    tarifa: [
      '',
      [
        Validators.required, Validators.max(2000)
      ]
    ]
  });

  localidades:any;
  localidad: Localidade[]=[];

  //tu ubicacion
  tulatitud: any;
  tulongitud: any;
  tulocation: any;
  constructor(private dataV : BdviajesService, private api : APIRestService, private geolocation : Geolocation, private formBuilder: FormBuilder) { }
  
  ionViewWillEnter(){
    this.getLocalidades();
    this.getUsuario();
  }
  getLocalidades(){
    this.api.getLocalidades().subscribe((data)=>{
      this.localidades=data;
      this.localidades.reverse();
    });
  }

  getLocation(){
    this.geolocation.getCurrentPosition().then((resp) => {
      this.viaje.startgeo.lat = resp.coords.latitude
      this.viaje.startgeo.lng = resp.coords.longitude
     }).catch((error) => {  
       console.log('Error getting location', error);
     });
  }

  getUsuario(){
    this.dataV.getUser().then(data =>{
      this.users = data
      console.log(this.users)
    });
  }

  guardarViajes(){
    this.api.getLocalidadesById(this.viaje.comienzo).subscribe((data)=>{
      this.viaje.comienzo=data.nombre;
      this.viaje.startgeo.lat=data.geo.lat;
      this.viaje.startgeo.lng=data.geo.lng;
      this.api.getLocalidadesById(this.viaje.destino).subscribe((data)=>{
        this.viaje.destino=data.nombre;
        this.viaje.endgeo.lat=data.geo.lat;
        this.viaje.endgeo.lng=data.geo.lng;
        this.dataV.guardarViaje(this.viaje);
      });
    });
  }

  guardarViajesGeolocal(){
    this.viaje.comienzo="Lugar Conductor"
    this.api.getLocalidadesById(this.viaje.destino).subscribe((data)=>{
      this.viaje.destino=data.nombre;
      this.viaje.endgeo.lat=data.geo.lat;
      this.viaje.endgeo.lng=data.geo.lng;
      this.dataV.guardarViaje(this.viaje);
    });
  }
}
