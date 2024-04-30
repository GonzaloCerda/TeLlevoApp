import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get('/');
  }

  navigateToInicio() {
    return browser.get('/inicio/inicio');
  }

  getCardTitle() {
    return element(by.css('ion-card-header ion-title')).getText();
  }

  getTopTitle(){
    return element(by.css('ion-toolbar ion-title')).getText();
  }

  getClickButtonHeader(){
    return element(by.css('ion-header ion-button[id="salir"]')).click();
  }

  getClickButton(){
    return element(by.css('ion-col ion-button')).click();
  }

  getClickButtondiv(){
    return element(by.css('div ion-button')).click();
  }

  getClickButtonRecover(){
    return element(by.css('ion-item a')).click();
  }
  
  getClickButtonSeg2(){
    return element(by.css('ion-footer ion-segment-button[value="lista-viajes"]')).click();
  }
  getClickButtonSeg3(){
    return element(by.css('ion-footer ion-segment-button[value="mapa"]')).click();
  }
  getClickButtonSeg4(){
    return element(by.css('ion-footer ion-segment-button[value="crear-viajes"]')).click();
  }

  setFormInputuse(text){
    return element(by.css('ion-input[id="usuario"]  input')).sendKeys(text);
  }
  setFormInputpass(text){
    return element(by.css('ion-input[id="contrasena"]  input')).sendKeys(text);
  }
  setFormInputemail(text){
    return element(by.css('ion-input[id="email"]  input')).sendKeys(text);
  }

  esperar(){
    browser.driver.sleep(500);
  }

  quieto(){
    browser.driver.sleep(5000);
  }

// navegar por las 4 pestañas
// validar volver a login


}
