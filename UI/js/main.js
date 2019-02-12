let isOpened = true;

const controlNavigation = () => {
  const sideNav = document.getElementById('mySidenav');
  const mainContainer = document.getElementById('main');

  sideNav.style.width = !isOpened ? '250px' : '0';
  mainContainer.style.marginLeft = !isOpened ? '250px' : '0';
  mainContainer.style.transition = 'margin-left .5s';

  isOpened = !isOpened;
};
