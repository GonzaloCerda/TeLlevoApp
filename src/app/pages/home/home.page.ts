import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage {
  get email() {
    return this.formularioRecuperar.get('email');
  }

  public mensajeError = {
    email: [
      { type: 'required', message: 'Email es requerido' },
      { type: 'pattern', message: 'Ingrese un email válido' }
    ]
  };

  formularioRecuperar = this.formBuilder.group({
    email: [
      '',
      [
        Validators.required,
        Validators.pattern(
          '^[a-z0-9!#$%&*+/=?^_`{|}~-]+(?:.[a-z0-9!#$%&*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$'
        )
      ]
    ]
  });

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Se ha enviado a '+this.formularioRecuperar.value.email,
      duration: 2000
    });
    toast.present();
  }

  constructor(private formBuilder: FormBuilder, private router:Router, private toastController:ToastController) {}

  public submit() {
    console.log(this.formularioRecuperar.valid);
    console.log(this.formularioRecuperar.value.email);

    let navigationExtras: NavigationExtras={
      state:{email: this.formularioRecuperar.value.email}
    };
    this.presentToast();
    this.router.navigate(['/login'],navigationExtras);
  }

}
