// у BeautyService.ts
import { ReactNode } from "react";

export interface BeautyService {
  id: number;
  title: string;
  titleTwo?: string;
  price?: number;
  priceTwo?: number;
  icon?: ReactNode;
  image?: string;
  description?: string;
}
