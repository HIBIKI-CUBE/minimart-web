import { FC, useEffect, useState } from "react";
import Link from "next/link";
import styles from "./cart.module.css";
import { Product, getProduct } from "../lib/product";
import { CartItem } from "../lib/cart";
import { Layout } from "../components/Layout";
import { Center } from "../components/Center";
import { useRouter } from "next/router";

const CartPage: FC = () => {
  const router = useRouter();

  const [cart, setCart] = useState<CartItem[] | null>(null);

  useEffect(() => {
    (async () => {
      const cart = await JSON.parse(localStorage.getItem("com.cookpad-mart") || "[]");
      setCart(cart);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!cart)
    return (
      <Layout>
        <Center>wait...</Center>
      </Layout>
    );

  function order() {
    setCart([])
    localStorage.setItem("com.cookpad-mart", "[]");
    alert(
      `ご注文ありがとうございます

品目:
${cart.map(item => `${item.product.name}: ${item.quantity}個`).join("\n")
      }
`
    );
  }

  return (
    <Layout>
      <ul>
      {cart.map((item, i) => (
        <li key={i}>
          {item.product.name}: {item.quantity}
        </li>
      ))}
      </ul>
      <button onClick={order}>注文する</button>
      <Link href="/">商品一覧に戻る</Link>
    </Layout>
  );
};

export default CartPage;
