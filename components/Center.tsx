import { FC } from "react";
import styles from "./Center.module.css";

type Props = {};

export const Center: FC<Props> = ({ children }) => {
  return <div className={styles.center}>{children}</div>;
};