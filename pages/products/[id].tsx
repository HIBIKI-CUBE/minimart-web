import { FC, useEffect, useState } from "react";
import Link from "next/link";
import styles from "./[id].module.css";
import { Product, getProduct } from "../../lib/product";
import { Layout } from "../../components/Layout";
import { Center } from "../../components/Center";
import { useRouter } from "next/router";

const ProductPage: FC = () => {
  const router = useRouter(),
    productId = router.query.id as string;

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

  if (!product) return <Center>wait...</Center>;

  return (
    <Layout>
      <div className={styles.card}>
        <img className={styles.hero} src={product.imageUrl} alt="商品画像"></img>
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
