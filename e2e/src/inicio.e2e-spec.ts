import { AppPage } from './app.po';

describe('Inicio Aplicacion :', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });
  
  it('Mostrar la pantalla de inicio luego de logeo', async () => {
    await page.navigateTo();
    await page.setFormInputuse('GONZALO');
    await page.setFormInputpass('2341');
    page.esperar();
    await page.getClickButton();
    page.esperar();
    expect(page.getTopTitle()).toContain("inicio");
  });

  it('Volver al login', async () => {
    await page.navigateToInicio();
    await page.getClickButtonHeader();
    page.esperar();
    expect(await page.getTopTitle()).toContain('Iniciar Sesión');
  });

  it('navegar a lista de viajes', async () => {
    await page.navigateToInicio();
    await page.getClickButtonSeg2();
    page.esperar();
    expect(await page.getTopTitle()).toContain('Lista viajes');
  });

  it('navegar a mapa', async () => {
    await page.navigateToInicio();
    await page.getClickButtonSeg3();
    page.esperar();
    expect(await page.getTopTitle()).toContain('Mapas');
  });

  it('navegar a crear viaje', async () => {
    await page.navigateToInicio();
    await page.getClickButtonSeg4();
    page.esperar();
    expect(await page.getTopTitle()).toContain('Crear viajes');
  });
});