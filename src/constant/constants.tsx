import { BeautyService } from "@/interfaces/BeautyService";
import {
  Brush,
  Droplet,
  Paintbrush,
  Palette,
  Scissors,
  SunMedium,
} from "lucide-react";

export const beautyServices: BeautyService[] = [
  {
    id: 1,
    title: "Комплекс ламінування / фарбування / корекція",
    price: 650,
  },
  {
    id: 2,
    title: "Ламінування брів + корекція",
    price: 500,
  },
  {
    id: 3,
    title: "Корекція + фарбування",
    price: 400,
  },
  {
    id: 4,
    title: "Фарбування брів хна",
    price: 300,
  },
  {
    id: 123,
    title: "Фарбування брів фарбою",
    price: 200,
  },
  {
    id: 5,
    title: "Корекція брів воскова",
    price: 200,
  },
  {
    id: 6,
    title: "Освітлення брів",
    price: 400,
  },
];
