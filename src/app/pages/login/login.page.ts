import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { APIRestService } from 'src/app/services/apirest.service';
import { BdviajesService } from 'src/app/services/bdviajes.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  email:any;
  dato:string;
  users:any;
  user: any={
    id: null,
    usuario: "",
    contrasena: "",
    email: ""
  };

  get usuario() {
    return this.formularioRecuperar.get('usuario');
  }
  get contrasena() {
    return this.formularioRecuperar.get('contrasena');
  }

  public mensajeError = {
    usuario: [
      { type: 'required', message: 'Usuario es requerido' },
    ],
    contrasena: [
      { type: 'required', message: 'Contraseña es requerido' },
    ]
  };

  formularioRecuperar = this.formBuilder.group({
    usuario: ['',[Validators.required]],
    contrasena: ['',[Validators.required]]
  });


  constructor(private formBuilder: FormBuilder, private activeRouter : ActivatedRoute, private router : Router, private api : APIRestService, private bdviaje : BdviajesService) {
    this.activeRouter.queryParams.subscribe(params=>{
      if(this.router.getCurrentNavigation().extras.state){
        this.email = this.router.getCurrentNavigation().extras.state.email;
      }
    });
  }

  ionViewWillEnter(){
    this.getUser()
  }
  getUser(){
    this.api.getUser().subscribe((data)=>{
      this.users=data;
    });
  }

  public toRecover() {
    this.router.navigate(['/home']);
  }

  public submit() {
    for (let i of this.users){
      if (i.id !== this.user.id){
        if(i.usuario == this.formularioRecuperar.value.usuario && i.contrasena == this.formularioRecuperar.value.contrasena){
          let navigationExtras: NavigationExtras={
            state:{
              dato: this.dato
            }
          };
          this.bdviaje.guardarUser(i)
          this.router.navigate(['/inicio/inicio'],navigationExtras);
        }
      }
    }
  }
}



