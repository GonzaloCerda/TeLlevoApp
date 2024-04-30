import { AppPage } from './app.po';

describe('Login Aplicacion :', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('Mostrar la pantalla de login', async () => {
    await page.navigateTo();
    expect(await page.getCardTitle()).toContain('Iniciar Sesión');
  });

  it('Validar recuperar contraseña', async () => {
    await page.navigateTo();
    await page.getClickButtonRecover();
    page.esperar();
    await page.setFormInputemail('gonz.cerda@duocuc.cl');
    await page.getClickButtondiv();
    page.esperar();
    expect(await page.getCardTitle()).toContain('Iniciar Sesión');
  });

  it('Validar bloqueo de inicio con campos obligatorios (fallo esperado)', async () => {
    await page.navigateTo();
    await page.getClickButton();
    expect(await page.getCardTitle()).toContain('Iniciar Sesión');
  });

});
