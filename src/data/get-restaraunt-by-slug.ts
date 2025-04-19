import { db } from "@/lib/prisma";

export const getRestauranyBySlug = async (slug: string) => {
  const restaurant = await db.restaurant.findUnique({ where: { slug: slug } });
  return restaurant;
};
