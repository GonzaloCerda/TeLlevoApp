import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { InicioPageRoutingModule } from './inicio-routing.module';

import { InicioPage } from './inicio.page';
import { CrearViajesComponent } from 'src/app/components/crear-viajes/crear-viajes.component';
import { ListaViajesComponent } from 'src/app/components/lista-viajes/lista-viajes.component';
import { MapaComponent } from 'src/app/components/mapa/mapa.component';
import { InicioComponent } from 'src/app/components/inicio/inicio.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    InicioPageRoutingModule
  ],
  declarations: [InicioPage, CrearViajesComponent, ListaViajesComponent, MapaComponent, InicioComponent]
})
export class InicioPageModule {}
