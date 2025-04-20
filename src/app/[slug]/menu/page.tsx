import { db } from "@/lib/prisma";
import Image from "next/image";
import { notFound } from "next/navigation";

interface RestaurantMenuPageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ consumptionMethod: string }>;
}

const isConsumptionMethodValid = (consumptionMethod: string) => {
  return ["DINE_IN", "TAKEAWAY"].includes(consumptionMethod.toUpperCase());
};

const RestaurantMenuPage = async ({
  params,
  searchParams,
}: RestaurantMenuPageProps) => {
  const { slug } = await params;
  const { consumptionMethod } = await searchParams;

  if (!isConsumptionMethodValid(consumptionMethod)) {
    return notFound();
  }
  const restaurant = await db.restaurant.findUnique({ where: { slug } });
  if (!restaurant) {
    return notFound();
  }

  return (
    <div>
      <div className="relative h-[250px] w-full">
        <Image
          src={restaurant?.coverImageUrl}
          fill
          alt={restaurant.name}
          className="object-cover"
        />
      </div>
    </div>
  );
};

export default RestaurantMenuPage;
