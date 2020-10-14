import { Gender } from '../enums/gender';
import { OrderStatus } from '../enums/order-status';
import { Tour } from '../enums/tour';
import { Order } from '../models/order';
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
