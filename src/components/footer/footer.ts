export class Footer {
  render() {
    const footerElement = document.createElement('footer');
    footerElement.classList.add('footer');

    const rsLogo = document.createElement('a');
    rsLogo.classList.add('footer_rslogo');
    rsLogo.setAttribute('href', 'https://rs.school/');
    rsLogo.setAttribute('target', '_blank');
    const rslogoImg = document.createElement('img');
    rslogoImg.setAttribute('src', require('../../assets/rs_school_js.svg'));
    rslogoImg.setAttribute('alt', 'RSS logo');
    
    footerElement.classList.add('footer');

    const credentials = document.createElement('p');
    credentials.innerText = 'Sergei Prokopovich\nOlga' // ask full name
    const year = document.createElement('p');
    year.innerText = '© 2023'

    rsLogo.append(rslogoImg);
    footerElement.append(rsLogo);
    footerElement.append(credentials);
    footerElement.append(year);

    return footerElement;
  }
}