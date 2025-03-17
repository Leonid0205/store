import { z } from "zod";
import {
  cartItemSchema,
  insertCartSchema,
  insertProductSchema,
} from "@/lib/validators";
import { Prisma } from "@prisma/client";

export type Product = z.infer<typeof insertProductSchema> & {
  id: string;
  rating: string | Prisma.Decimal;
  numReviews: number;
  createdAt: Date;
};

export type Cart = z.infer<typeof insertCartSchema>;
export type CartItem = z.infer<typeof cartItemSchema>;
