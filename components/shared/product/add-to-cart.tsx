"use client";

import { Cart, CartItem } from "@/types";
import { useRouter } from "next/navigation";
import { Loader, Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { addItemToCart, removeItemFromCart } from "@/lib/actions/cart.actions";
import { toast } from "sonner";
import { useTransition } from "react";

const AddToCart = ({ item, cart }: { item: CartItem; cart?: Cart }) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const handleAddToCart = async () => {
    startTransition(async () => {
      const res = await addItemToCart(item);
      if (!res?.success) {
        toast.error(res?.message);
        return;
      }

      toast(`${res.message}`, {
        closeButton: true,
        action: (
          <Button
            onClick={() => router.push("/cart")}
            className="bg-primary text-white hover:bg-gray-800"
          >
            Go To Cart
          </Button>
        ),
      });
    });
  };
  const handleremoveFromCart = async () => {
    startTransition(async () => {
      const res = await removeItemFromCart(item.productId);
      toast(`${res.message}`, {
        closeButton: true,
      });
      return;
    });
  };
  const existItem =
    cart && cart.items.find((x) => x.productId === item.productId);

  return existItem ? (
    <div>
      <Button type="button" variant="outline" onClick={handleremoveFromCart}>
        {isPending ? (
          <Loader className="w-4 h-4 animate-spin" />
        ) : (
          <Minus className="h-4 w-4" />
        )}
      </Button>
      <span className="px-2">{existItem.qty}</span>
      <Button type="button" variant="outline" onClick={handleAddToCart}>
        {isPending ? (
          <Loader className="w-4 h-4 animate-spin" />
        ) : (
          <Plus className="h-4 w-4" />
        )}
      </Button>
    </div>
  ) : (
    <Button className="w-full" type="button" onClick={handleAddToCart}>
      {isPending ? (
        <Loader className="w-4 h-4 animate-spin" />
      ) : (
        <Plus className="h-4 w-4" />
      )}
      Add to cart
    </Button>
  );
};

export default AddToCart;
