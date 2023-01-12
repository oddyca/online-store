export class BadGetAway {
  static render() {
    const errorPage = document.createElement('div');
    const errorMessageFirst = document.createElement('h1');
    errorMessageFirst.innerText = '404';
    const errorMessageSecond = document.createElement('h1');
    errorMessageSecond.innerHTML = 'Sorry, the page is not found'

    errorPage.classList.add('error-page');
    errorMessageFirst.classList.add('error_first-line');
    errorMessageSecond.classList.add('error_second-line');
    errorPage.append(errorMessageFirst);
    errorPage.append(errorMessageSecond);

    return errorPage;
  }
}