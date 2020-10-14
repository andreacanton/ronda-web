import { Gender } from '../enums/gender';

export interface OrderItem {
  type: string;
  size: string;
  gender: Gender;
  quantity: number;
  notes: string;
}
