export class BadGetAway {
  static render() {
    const errorPage = document.createElement('div');
    const errorMessage = document.createElement('h1');
    errorMessage.innerText = '404\nSorry, the page is not found';

    errorPage.classList.add('error-page');
    errorPage.append(errorMessage);

    return errorPage;
  }
}