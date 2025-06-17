import ProductCarousel from "@/components/shared/product/product-carousel";
import ProductList from "@/components/shared/product/product-list";
import VeiwAllProductsButton from "@/components/veiw-all-products-button";
import {
  getFeaturedProducts,
  getLatestProducts,
} from "@/lib/actions/product.actions";

export const metadata = {
  title: "HomePage",
};

const HomePage = async () => {
  const latestProducts = await getLatestProducts();
  const feateredProcucts = await getFeaturedProducts();
  return (
    <>
      {feateredProcucts.length > 0 && (
        <ProductCarousel data={feateredProcucts} />
      )}
      <ProductList
        data={latestProducts}
        title="Newest arrivals"
        limit={4}
      />
      <VeiwAllProductsButton />
    </>
  );
};

export default HomePage;
