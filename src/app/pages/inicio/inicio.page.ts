import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage{
  dato:any;
  constructor(private activeroute: ActivatedRoute, private router: Router) {
    this.activeroute.queryParams.subscribe(params => {
      if(this.router.getCurrentNavigation().extras.state){
        this.dato = this.router.getCurrentNavigation().extras.state.dato;
      }
    })
  }
  segmentChanged(ev: any) {
    this.router.navigate(['inicio/'+ ev.detail.value])
  }
  nextSegment(pag: string) {
    this.router.navigate(['inicio/'+ pag])
  }
  salir(){
    this.router.navigate(['/login']);
  }
}
