import { BsSearch } from "react-icons/bs";
import styles from "./Home.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useState, type FormEvent } from "react";
import { useAPI } from "../../context/APIContext";

export function Home() {
  const [input, setInput] = useState("");
  const navigate = useNavigate();
  const { coins } = useAPI();

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (input === "") {
      return;
    }

    navigate(`/detail/${input}`);
    setInput("");
  }

  function handleGetMore() {
    console.log("Carregar mais...");
  }
  return (
    <main className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Digite aqui o nome da moeda..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button type="submit">
          <BsSearch size={30} color="#FFF" />
        </button>
      </form>

      <table>
        <thead>
          <tr>
            <th scope="col">Moeda</th>
            <th scope="col">Valor mercado</th>
            <th scope="col">Preço</th>
            <th scope="col">Volume</th>
            <th scope="col">Mudança 24h</th>
          </tr>
        </thead>

        <tbody id="tbody">
          {coins.length > 0 &&
            coins.map((item) => (
              <tr className={styles.tr} key={item.id}>
                <td className={styles.tdCoin} data-label="Moeda">
                  <img
                    className={styles.logo}
                    src={item.image}
                    alt="Logo Moeda"
                  />
                  <Link to={`/details/${item.id}`} className={styles.name}>
                    <span>{item.name}</span> | {item.symbol.toUpperCase()}
                  </Link>
                </td>

                <td className={styles.tdLabel} data-label="Valor mercado">
                  <Link to={`/details/${item.id}`} className={styles.name}>
                    <span>{item.market_cap}</span>
                  </Link>
                </td>

                <td className={styles.tdLabel} data-label="Preço">
                  <Link to={`/details/${item.id}`} className={styles.name}>
                    <span>{item.current_price}</span>
                  </Link>
                </td>

                <td className={styles.tdLabel} data-label="Volume">
                  <Link to={`/details/${item.id}`} className={styles.name}>
                    <span>{item.total_volume}</span>
                  </Link>
                </td>

                <td
                  className={
                    item.price_change_percentage_24h < "0"
                      ? styles.tdLoss
                      : styles.tdProfit
                  }
                  data-label="Mudança 24h"
                >
                  <Link to={`/details/${item.id}`} className={styles.name}>
                    <span>{item.price_change_percentage_24h}</span>
                  </Link>
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      <button className={styles.buttonMore} onClick={handleGetMore}>
        Carregar mais
      </button>
    </main>
  );
}
