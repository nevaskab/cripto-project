import styles from "./Header.module.css";
import { Link } from "react-router-dom";

export function Header() {
  return (
    <header className={styles.container}>
      <Link to="/">
        <h1 className={styles.title}>
          Today<strong>Currency</strong>
        </h1>
      </Link>
    </header>
  );
}
