import { AppPage } from './app.po';

describe('CrearViaje :', () => {
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
});