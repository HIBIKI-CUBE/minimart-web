import { FC, useEffect, useState } from "react";
import Link from "next/link";
import { graphqlRequest } from "../../lib/graphqlClient";
import { Product } from "../../lib/product";
import { Layout } from "../../components/Layout";
import { Center } from "../../components/Center";
import { useRouter } from "next/router";

const ProductPage: FC = () => {
  const router = useRouter(),
    productId = router.query.id as string,
    getProductQuery = `
      query getProduct($id: ID!) {
        product(id: $id) {
          name
          price
          imageUrl
          description
        }
      }
    `;

  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    if (!productId) return;
    (async () => {
      const product = await getProduct(productId);
      setProduct(product);
      console.log(product);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productId]);

  async function getProduct(productId: string): Promise<Product> {
    const productData = await graphqlRequest({ query: getProductQuery, variables: { id: productId } });
    return productData.product;
  }

  if (!product) return <Center>wait...</Center>;

  return (
    <Layout>
      <div>
        <img src={product.imageUrl} alt="商品画像"></img>
        <div>
          <div>{product.name}</div>
          <div>{product.price}円</div>
        </div>
        <div>{product.description}</div>
        <button>カートに追加する</button>
      </div>
      <Link href="/">商品一覧に戻る</Link>
    </Layout>
  );
};

export default ProductPage;
