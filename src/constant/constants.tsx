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
    icon: <Brush className="text-white " size={64} />,
    image: "/icons/brow-pencil_18817264.png",
  },
  {
    id: 2,
    title: "Ламінування брів + корекція",
    price: 500,
    icon: <Droplet className="text-white " size={64} />,
    image: "/icons/eyebrow_8530141.png",
  },
  {
    id: 3,
    title: "Корекція + фарбування",
    price: 400,
    icon: <Paintbrush className="text-white  " size={64} />,
    image: "/icons/tweezers_3461642.png",
  },
  {
    id: 4,
    title: "Фарбування брів (фарба/хна)",
    icon: <Palette className="text-white  " size={64} />,
    image: "/icons/eyebrow_8530141.png",
    description: "Фарбування брів (фарба — 200 грн / хна — 300 грн)",
  },
  {
    id: 5,
    title: "Корекція брів воскова",
    price: 200,
    icon: <Scissors className="text-white  " size={64} />,
    image: "/icons/tweezers_3461642.png",
  },
  {
    id: 6,
    title: "Освітлення брів",
    price: 400,
    icon: <SunMedium className="text-white  " size={64} />,
    image: "/icons/brow-pencil_18817264.png",
  },
];
