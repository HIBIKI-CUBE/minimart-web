import { FC, useEffect, useState } from "react";
// import Link from "next/link";
import { graphqlRequest } from "../../lib/graphqlClient";
import { Product } from "../../lib/product";
import { Layout } from "../../components/Layout";
import { useRouter } from "next/router";

const ProductPage: FC = () => {
  const router = useRouter(),
    productId = router.query.id as string,
    getProductQuery = `
      query getProduct($id: ID!) {
        product(id: $id) {
          name
          price
        }
      }
    `;

  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    if(!productId)return
    (async () => {
      const product = await getProduct(productId);
      setProduct(product)
      console.log(product)
    })()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productId]);

  async function getProduct(productId: string): Promise<Product> {
    const productData = await graphqlRequest({ query: getProductQuery, variables: { id: productId } });
    return productData.product;
  }

  if (!product) return <div>wait...</div>;

  return <Layout>{product.name}</Layout>;
};

export default ProductPage;

