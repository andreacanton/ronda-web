import { OrderPhase } from '../enums/order-phase';
import { OrderStatus } from '../enums/order-status';
import { Tour } from '../enums/tour';
import { OrderItem } from './order-item';
import { OrderNote } from './order-note';
import { Recipient } from './recipient';

export interface Order {
  identifier: number;
  recipient: Recipient;
  tour: Tour;
  stop: string;
  status: OrderStatus;
  items: OrderItem[];
  notes: OrderNote[];
}
