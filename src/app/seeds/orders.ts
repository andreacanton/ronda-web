import { Gender } from '../data/enums/gender';
import { OrderStatus } from '../data/enums/order-status';
import { Tour } from '../data/enums/tour';
import { Order } from '../data/schema/order';
import { recipients } from './recipients';

export const orders: Order[] = [
  {
    identifier: 1,
    recipient: recipients[0],
    tour: Tour.Due,
    stop: 'Rifugio 2',
    status: OrderStatus.Inserted,
    items: [
      {
        type: 'Maglietta',
        size: 'M',
        gender: Gender.Male,
        quantity: 1,
        notes: '',
      },
      {
        type: 'Scarpa',
        size: '44',
        gender: Gender.Male,
        quantity: 1,
        notes: '',
      },
    ],
    notes: [],
  },
];
