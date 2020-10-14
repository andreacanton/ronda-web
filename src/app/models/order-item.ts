import { Gender } from '../enums/gender';
import { ClothingType } from './clothing-type';

export interface OrderItem {
  type: ClothingType;
  size: string;
  gender: Gender;
  quantity: number;
  notes: string;
}
