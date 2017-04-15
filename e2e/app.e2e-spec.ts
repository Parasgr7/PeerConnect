import { PeerConnectPage } from './app.po';

describe('peer-connect App', () => {
  let page: PeerConnectPage;

  beforeEach(() => {
    page = new PeerConnectPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
