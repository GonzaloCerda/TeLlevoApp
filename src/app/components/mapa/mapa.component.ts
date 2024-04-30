import { Component } from '@angular/core';
import { ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import emailjs, { EmailJSResponseStatus } from 'emailjs-com';
declare var google: any;

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.scss'],
})
export class MapaComponent{
  map: any;
  inicial: any;
  //ubicacion inicial
  latitudinicial: any;
  longitudinicial: any;
  locationinicial: any;
  //ubicacion final
  latitudfinal: any;
  longitudfinal: any;
  locationfinal: any;
  
  @ViewChild('map', {read: ElementRef, static: false}) mapRef: ElementRef;

  constructor(private router : Router, private activeRouter : ActivatedRoute) {
    this.activeRouter.queryParams.subscribe(params=>{
      if(this.router.getCurrentNavigation().extras.state){
        this.latitudinicial = this.router.getCurrentNavigation().extras.state.datoLatInit;
        this.longitudinicial = this.router.getCurrentNavigation().extras.state.datoLngInit;
        this.latitudfinal = this.router.getCurrentNavigation().extras.state.datoLatEnd;
        this.longitudfinal = this.router.getCurrentNavigation().extras.state.datoLngEnd;
      }
    });
  }
  ionViewWillEnter(){
    if(!this.latitudinicial){
      this.showMap(this.inicial = new google.maps.LatLng( -33.4513, -70.6653));
    }
    else{
      this.crearRuta();
    }
  }


  sendEmail(e: Event) {
    e.preventDefault();
    emailjs.sendForm('gmail', 'template_3l6pd2n', e.target as HTMLFormElement, 'user_tVxoJk3ad1ITo6mMgytlA')
      .then((result: EmailJSResponseStatus) => {
        console.log(result.text);
      }, (error) => {
        console.log(error.text);
      });
  }

  showMap(location){
    const options = {
      center: location,
      zoom: 12,
      disableDefaultUI: true
    }
    this.map = new google.maps.Map(this.mapRef.nativeElement, options);
  }
  crearRuta(){
    this.locationinicial = new google.maps.LatLng(this.latitudinicial, this.longitudinicial);
    this.locationfinal = new google.maps.LatLng(this.latitudfinal, this.longitudfinal);
    this.showMap(this.locationinicial);
    const flightPlanCoordinates = [
      { lat: this.latitudinicial, lng: this.longitudinicial },
      { lat: this.latitudfinal, lng: this.longitudfinal },
    ];
    const flightPath = new google.maps.Polyline({
      path: flightPlanCoordinates,
      geodesic: true,
      strokeColor: "#FF0000",
      strokeOpacity: 1.0,
      strokeWeight: 2,
    });
    new google.maps.Marker({
      position: this.locationinicial,
      map: this.map,
      title: "Comienzo",
      label:"Inicio",
    });
    new google.maps.Marker({
      position: this.locationfinal,
      map: this.map,
      title: "Final",
      label:"Fin",
    });
    flightPath.setMap(this.map);
  }
}
