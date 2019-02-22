import sp1Image from '../media/temp/sp1.jpeg';
import sp2Image from '../media/temp/sp2.jpeg';
import sp3Image from '../media/temp/sp3.jpeg';
import sp4Image from '../media/temp/sp4.jpeg';
import sp5Image from '../media/temp/sp5.jpeg';

var DataFake={};

DataFake.productList = [
  {
    id: 1,
    name: 'BLACK OFF THE',
    description: 'As far as I recall from my experience, this error usually appears when you are trying to update something in your render method, which is prohibited.' ,

    price: '124$',
    material: 'Material silk',
    color: 'RoyalBlue',
    image: sp1Image 
  }, 
  { 
    id: 2,
    name: 'CONTRAST EMBRO',
    description: 'As far as I recall from my experience, this error usually appears when you are trying to update something in your render method, which is prohibited.' +

    'Verify that it is not happening in your app.' +
    
    'UPD: Try creating a function above the render method that calls this.props.login instead of doing it inside mapDispatchToProps. And add your the login action creator instead of mapDispatchToProps as a second argument to the connect function.',
    price: '121$',
    material: 'Material leather',
    color: 'SeaGreen',
    image: sp2Image
  },
  { 
    id: 3,
    name: 'CONTRAST EMBRO',
    description: 'As far as I recall from my experience, this error usually appears when you are trying to update something in your render method, which is prohibited.' +

    'Verify that it is not happening in your app.' +
    
    'UPD: Try creating a function above the render method that calls this.props.login instead of doing it inside mapDispatchToProps. And add your the login action creator instead of mapDispatchToProps as a second argument to the connect function.',
    price: '121$',
    material: 'Material leather',
    color: 'Gainsboro',
    image: sp3Image
  },
  { 
    id: 4,
    name: 'CONTRAST EMBRO',
    description: 'As far as I recall from my experience, this error usually appears when you are trying to update something in your render method, which is prohibited.' +

    'Verify that it is not happening in your app.' +
    
    'UPD: Try creating a function above the render method that calls this.props.login instead of doing it inside mapDispatchToProps. And add your the login action creator instead of mapDispatchToProps as a second argument to the connect function.',
    price: '121$',
    material: 'Material leather',
    color: 'RoyalBlue',
    image: sp4Image
  },
  { 
    id: 5,
    name: 'CONTRAST EMBRO',
    description: 'As far as I recall from my experience, this error usually appears when you are trying to update something in your render method, which is prohibited.' +

    'Verify that it is not happening in your app.' +
    
    'UPD: Try creating a function above the render method that calls this.props.login instead of doing it inside mapDispatchToProps. And add your the login action creator instead of mapDispatchToProps as a second argument to the connect function.',
    price: '121$',
    material: 'Material leather',
    color: 'Khaki',
    image: sp5Image
  }
];

DataFake.userInfo = {
  name: 'Nguyen Van Bon',
  email: 'nguyennhatbon07t1@gmail.com',
  address: 'K27/14 Dinh Tien Hoang, Da Nang',
  phone: '(+84) 0973882445'
};

DataFake.orderHistory = [
  {
    id: 1,
    date_order: '2017-04-19 08:30:13',
    status: 'Completed',
    total: '392$'
  },
  {
    id: 2,
    date_order: '2017-04-19 08:30:39',
    status: 'Completed',
    total: '107$'
  },
  {
    id: 3,
    date_order: '2017-04-20 08:30:39',
    status: 'Pending',
    total: '134$'
  },
  {
    id: 4,
    date_order: '2017-04-21 08:30:39',
    status: 'Pending',
    total: '127$'
  },
  {
    id: 5,
    date_order: '2017-04-22 08:30:39',
    status: 'Pending',
    total: '307$'
  },
];

module.exports = DataFake;