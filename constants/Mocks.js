const services = [
  {
    id: 'reservations',
    name: 'Reservas',
    pageNavigation: 'ReservationScreen',
    badgeIos: 'calendar',
    badgeAndroid: 'calendar'
  },
  {
    id: 'vote',
    name: 'Votação',
    pageNavigation: '',
    badgeIos: 'check-square',
    badgeAndroid: 'check-square'
  },
  {
    id: 'buildingServices',
    name: 'Chamados Internos',
    pageNavigation: 'BuldingServicesScreen',
    badgeIos: 'zap',
    badgeAndroid: 'zap'
  },
  {
    id: 'newVisitors',
    name: 'Visitantes',
    pageNavigation: 'ResidentsListScreen',
    badgeIos: 'user-check',
    badgeAndroid: 'user-check'
  },
  {
    id: 'generalServices',
    name: 'Notificações',
    pageNavigation: 'NotificationScreen',
    badgeIos: 'package',
    badgeAndroid: 'package'
  },
  {
    id: 'finances',
    name: 'Financeiro',
    pageNavigation: '',
    badgeIos: 'dollar-sign',
    badgeAndroid: 'dollar-sign'
  }
];

const servicesHome = [
  {
    id: 'generalServices',
    name: 'Visitantes',
    pageNavigation: 'ResidentsListScreen',
    badgeIos: 'user-check',
    badgeAndroid: 'user-check',
    fontSize: 0
  },
  {
    id: 'vote',
    name: 'Votação',
    pageNavigation: '',
    badgeIos: 'check-square',
    badgeAndroid: 'check-square',
    fontSize: 0
  },
  {
    id: 'finances',
    name: 'Finanças',
    pageNavigation: '',
    badgeIos: 'dollar-sign',
    badgeAndroid: 'dollar-sign',
    fontSize: 5
  },
  {
    id: 'chat',
    name: 'Chat',
    pageNavigation: 'ChatScreen',
    badgeIos: 'mail',
    badgeAndroid: 'mail',
    fontSize: 20
  }
];

const profile = {
  username: 'react-ui-kit',
  location: 'Europe',
  email: 'contact@react-ui-kit.com',
  avatar: require('../assets/images/avatar.png'),
  budget: 1000,
  monthly_cap: 5000,
  notifications: true,
  newsletter: false,
  name: "Shirley Silva",
  apartament: "Apto 138 - Bloco C"
};

const residents = [
  {
    id: 1,
    fullName: "Hálex Tarouco Tomasi",
    cpfNumber: "030.295.970-08",
    dataNascimento: "22/11/1993",
    parentingGrade: "Filho",
    photoUrl: "https://www.officialcharts.com/media/656636/ed-sheeran-2019-press.jpg"
  },
  {
    id: 2,
    fullName: "Larissa Lima",
    cpfNumber: "030.295.970-08",
    dataNascimento: "26/12/1996",
    parentingGrade: "Filha",
    photoUrl: "https://www.biography.com/.image/t_share/MTQzMzAxNjY4MTE5NzgyOTgz/gettyimages-533588672jpg.jpg"
  },
  {
    id: 3,
    fullName: "Eduardo Facchiolli",
    cpfNumber: "030.295.970-08",
    dataNascimento: "22/11/1993",
    parentingGrade: "Esposa/Mãe",
    photoUrl: "https://www.biography.com/.image/t_share/MTQzMzAxNjY4MTE5NzgyOTgz/gettyimages-533588672jpg.jpg"
  },
  {
    id: 4,
    fullName: "Felipe Gonzales",
    cpfNumber: "030.295.970-08",
    dataNascimento: "22/11/1993",
    parentingGrade: "Filho",
    photoUrl: "https://www.biography.com/.image/t_share/MTQzMzAxNjY4MTE5NzgyOTgz/gettyimages-533588672jpg.jpg"
  },
  {
    id: 5,
    fullName: "Yuri Bueno",
    cpfNumber: "030.295.970-08",
    dataNascimento: "22/11/1993",
    parentingGrade: "Filho",
    photoUrl: "https://www.biography.com/.image/t_share/MTQzMzAxNjY4MTE5NzgyOTgz/gettyimages-533588672jpg.jpg"
  },
];

const avisos = [
  {
    id: 3,
    fullName: "Novo Síndico            Hálex Tarouco Tomasi",
    cpfNumber: "Roberto Alberto",
    dataNascimento: "22/10/2019",
    parentingGrade: "Filha",
    photoUrl: "https://www.officialcharts.com/media/656636/ed-sheeran-2019-press.jpg"
  },
  {
    id: 1,
    fullName: "Manutenção Elevador Bloco 1",
    cpfNumber: "Romeu Abner",
    dataNascimento: "22/09/2019",
    parentingGrade: "Filho",
    photoUrl: "https://static.wixstatic.com/media/7cb831_b8d5db348eb44278bb18c446a61d0e3c~mv2_d_3024_4032_s_4_2.jpg/v1/fill/w_1200,h_1600,al_c,q_90/file.jpg"
  },
  {
    id: 2,
    fullName: "Pintura Garagem 1S  Bloco 2",
    cpfNumber: "Shirley Cesario",
    dataNascimento: "22/10/2019",
    parentingGrade: "Filha",
    photoUrl: "https://diy.sndimg.com/content/dam/images/diy/fullset/2015/9/18/Original_Dylan-Eastman_Garage-Floor-roller-sprinkler.jpg.rend.hgtvcom.1280.960.suffix/1442580883654.jpeg"
  }
];

export {
  services,
  servicesHome,
  residents,
  avisos,
  profile
}