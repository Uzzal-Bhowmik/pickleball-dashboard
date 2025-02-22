"use client";

import { Splide, SplideSlide } from "@splidejs/react-splide";
import { Flex } from "antd";
import Image from "next/image";
import { MapPin } from "lucide-react";
import { Star } from "lucide-react";
import hotelImage from "@/assets/images/hotels/1.jpg";
import apartmentImage from "@/assets/images/apartments/1.jpg";

// dummy data
const HighlightedProperties = [
  {
    type: "hotel",
    name: "Blue Nature",
    location: "Algeirs, Algeria",
    totalTransaction: 2241,
    image: hotelImage,
    rating: 5,
  },
  {
    type: "apartment",
    name: "3 Bedrooms Apartment for Rent",
    location: "Algeirs, Algeria",
    totalTransaction: 2190,
    image: apartmentImage,
    rating: 4.8,
  },
];

export default function HighlightedProperty() {
  return (
    <div className="w-full rounded-xl bg-white p-6 xl:w-1/2">
      <Splide
        aria-label="Highlighted Properties"
        options={{
          direction: "ttb",
          wheel: true,
          height: "40vh",
          arrows: false,
          autoplay: true,
          type: "loop",
          interval: 6000,
          speed: 800,
          easing: "ease",
        }}
        className="highlighted-properties w-full"
      >
        {HighlightedProperties.map((property, idx) => (
          <SplideSlide
            key={idx}
            className="flex-center-start max-h-[40vh] gap-x-5"
          >
            <Image
              src={property.image}
              alt={property.name}
              height={1200}
              width={1200}
              className="h-auto w-1/2 rounded-2xl object-cover object-center"
            />

            <div>
              <p className="font-medium capitalize text-gray-600">
                Highlighted Booked {property.type}
              </p>

              <h2 className="mb-1 mt-1 text-2xl font-bold">{property.name}</h2>

              <Flex
                align="center"
                justify="between"
                gap={20}
                className="w-full"
              >
                <h4 className="flex-center-start gap-1 text-lg text-gray-500">
                  <MapPin className="text-red-700" size={20} />
                  {property.location}
                </h4>

                <h3 className="flex-center-start gap-2">
                  <Star
                    className="fill-yellow-400 stroke-yellow-400"
                    size={20}
                  />
                  <span className="pt-1 font-semibold text-gray-500">
                    {property.rating}
                  </span>
                </h3>
              </Flex>

              <h1 className="mt-4 text-3xl font-semibold">
                ${property.totalTransaction}
              </h1>
              <p>Total transaction & activities in last month</p>
            </div>
          </SplideSlide>
        ))}
        <div className="splide__progress bg-green-400">
          <div className="splide__progress__bar" />
        </div>
      </Splide>
    </div>
  );
}
