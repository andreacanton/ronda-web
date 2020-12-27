import { OrderPhase } from '../enums/order-phase';

export interface OrderNote {
  phase: OrderPhase;
  body: string;
}
