import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CrearViajesComponent } from 'src/app/components/crear-viajes/crear-viajes.component';
import { InicioComponent } from 'src/app/components/inicio/inicio.component';
import { ListaViajesComponent } from 'src/app/components/lista-viajes/lista-viajes.component';
import { MapaComponent } from 'src/app/components/mapa/mapa.component';

import { InicioPage } from './inicio.page';

const routes: Routes = [
  {
    path: '',
    component: InicioPage,
    children : [
      {
        path: 'lista-viajes',
        component: ListaViajesComponent
      },
      {
        path: 'inicio',
        component: InicioComponent
      },
      {
        path: 'mapa',
        component: MapaComponent
      },
      {
        path: 'crear-viajes',
        component: CrearViajesComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InicioPageRoutingModule {}
