import { FC, useEffect, useState } from "react";
import { CartItem } from "../lib/cart";
import Head from "next/head";
import Link from "next/link";
import styles from "./Layout.module.css";

type Props = {};

export const Layout: FC<Props> = ({ children }) => {

  const [itemsCount, setItemsCount] = useState<number>(0);

  useEffect(() => {
    (async () => {
      const cart = await JSON.parse(localStorage.getItem("com.cookpad-mart") || "[]");
      let itemsCount: number = 0;
      cart.forEach((item) => {
        itemsCount += item.quantity;
      })
      setItemsCount(itemsCount);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Head>
        <title>Mini Mart</title>
      </Head>
      <header className={styles.header}>
        <h1 className={styles.title}>
          <Link href="/">Mini Mart</Link>
        </h1>
        <div className={styles.cart}>
          {/* このリンク先はないので新規ページを作る */}
          <Link href="/cart">
            <a>
              <span>🛒</span>
              <span className={styles.cartCount}>({itemsCount})</span>
            </a>
          </Link>
        </div>
      </header>
      <main>{children}</main>
    </div>
  );
};
