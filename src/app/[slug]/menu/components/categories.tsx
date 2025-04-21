import { Restaurant } from "@prisma/client";
import { ClockIcon } from "lucide-react";
import Image from "next/image";

interface RestaurantCategoriesProps {
  restaurant: Restaurant;
}

const RestaurantCategories = ({ restaurant }: RestaurantCategoriesProps) => {
  return (
    <div className="relative z-50 mt-[-1.5rem] rounded-t-3xl border bg-white">
      <div className="flex items-center gap-3 p-5">
        <Image
          alt={restaurant.name}
          src={restaurant.avatarImageUrl}
          height={45}
          width={45}
        />
        <div>
          <h2 className="text-lg font-semibold">{restaurant.name}</h2>
          <p className="text-xs opacity-55">{restaurant.description}</p>
        </div>
      </div>
      <div className="flex items-center gap-1 text-xs text-green-500">
        <ClockIcon size={12} />
        <p>Aberto!</p>
      </div>
    </div>
  );
};

export default RestaurantCategories;
