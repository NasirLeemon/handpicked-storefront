import type { StaticImageData } from "next/image";

import cherryKurti from "@/public/images/products/strep cherry kurti.png";
import peacockGreen from "@/public/images/products/peacock green.png";
import blueCoords from "@/public/images/products/blue coords.png";
import redVelvet from "@/public/images/products/red velvet georgette.png";

export type HeroSlide = {
  image: StaticImageData;
  alt: string;
  label: string;
};

export const heroSlides: HeroSlide[] = [
  {
    image: cherryKurti,
    alt: "Woman wearing the Strep Cherry Kurti by Handpicked",
    label: "Cherry Edit",
  },
  {
    image: peacockGreen,
    alt: "Peacock Green three-piece outfit from Handpicked",
    label: "Soft Festive",
  },
  {
    image: blueCoords,
    alt: "Blue co-ords set from Handpicked",
    label: "Everyday Co-ords",
  },
  {
    image: redVelvet,
    alt: "Red Velvet Georgette outfit from Handpicked",
    label: "Occasion Wear",
  },
];