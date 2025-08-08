import { BeautyService } from "@/interfaces/BeautyService";

export const beautyServices: BeautyService[] = [
  {
    id: 1,
    title: "Комплекс ламінування / фарбування / корекція",
    price: 650,
    duration: 40,
  },
  {
    id: 2,
    title: "Ламінування брів + корекція",
    price: 500,
    duration: 30,
  },
  {
    id: 3,
    title: "Корекція + фарбування",
    price: 400,
    duration: 30,
  },
  {
    id: 4,
    title: "Фарбування брів хна",
    price: 300,
    duration: 20,
  },
  {
    id: 5,
    title: "Фарбування брів фарбою",
    price: 200,
    duration: 20,
  },
  {
    id: 6,
    title: "Корекція брів воскова",
    price: 200,
    duration: 10,
  },
  {
    id: 7,
    title: "Освітлення брів",
    price: 400,
    duration: 40,
  },
  {
    id: 8,
    title: "Макіяж Вечірній",
    price: 1100,
    duration: 60,
  },
  {
    id: 9,
    title: "Весільний макіяж",
    price: 1500,
    duration: 90,
  },
  {
    id: 10,
    title: "Денний легкий макіяж",
    price: 800,
    duration: 45,
  },
  {
    id: 11,
    title: "Накладні вії без макіяжу",
    price: 100,
    duration: 15,
  },
  {
    id: 12,
    title: "Ранній вихід",
    price: 200,
    duration: 0, // це надбавка, тому тривалість = 0
  },
];
