const services = [
  {
    id: 'reservations',
    name: 'Reservas',
    pageNavigation: 'ReservationScreen',
    badgeIos: 'md-calendar',
    badgeAndroid: 'md-calendar'
  },
  {
    id: 'vote',
    name: 'Votação',
    pageNavigation: '',
    badgeIos: 'md-checkmark-circle',
    badgeAndroid: 'md-calendar'
  },
  {
    id: 'newHomes',
    name: 'Cadastrar',
    pageNavigation: 'person-add',
    badgeIos: 'md-person-add',
    badgeAndroid: 'md-calendar'
  },
  {
    id: 'generalServices',
    name: 'Serviços',
    pageNavigation: '',
    badgeIos: 'md-flash',
    badgeAndroid: 'md-calendar'
  }
];

const servicesHome = [
  {
    id: 'generalServices',
    name: 'Serviços',
    pageNavigation: '',
    badgeIos: 'md-flash',
    badgeAndroid: 'md-calendar'
  },
  {
    id: 'vote',
    name: 'Votação',
    pageNavigation: '',
    badgeIos: 'md-checkmark-circle',
    badgeAndroid: 'md-calendar'
  },
  {
    id: 'finances',
    name: 'Finanças',
    pageNavigation: '',
    badgeIos: 'logo-usd',
    badgeAndroid: 'logo-usd'
  },
  {
    id: 'chat',
    name: 'Chat',
    pageNavigation: '',
    badgeIos: 'md-mail',
    badgeAndroid: 'md-mail'
  }
];

export {
  services,
  servicesHome
}