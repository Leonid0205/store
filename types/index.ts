import { z } from "zod";
import { insertProductSchema } from "@/lib/validators";
import { Prisma } from "@prisma/client";

export type Product = z.infer<typeof insertProductSchema> & {
  id: string;
  rating: string | Prisma.Decimal;
  numReviews: number;
  createdAt: Date;
};
