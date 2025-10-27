import { BsSearch } from "react-icons/bs";
import styles from "./Home.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useState, type FormEvent, useEffect } from "react";

interface CoinProps {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  fully_diluted_valuation: number;
  total_volume: number;
  high_24h: number;
  low_24h: number;
  price_change_24h: number;
  price_change_percentage_24h: number | string;
  market_cap_change_24h: number;
  market_cap_change_percentage_24h: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  ath: number;
  ath_change_percentage: number;
  ath_date: string;
  atl: number;
  atl_change_percentage: number;
  atl_date: string;
  roi: null;
  last_updated: string;
}

export function Home() {
  const [input, setInput] = useState("");
  const [coins, setCoins] = useState<CoinProps[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      await getData();
    };

    fetchData();
  }, []);

  async function getData() {
    const response = await fetch(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false"
    );

    const data = await response.json();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const formattedCoins = data.map((item: any) => {
      const formatted = {
        ...item,
        current_price: item.current_price.toLocaleString("en-US", {
          style: "currency",
          currency: "USD",
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }),
        market_cap: item.market_cap.toLocaleString("en-US", {
          style: "currency",
          currency: "USD",
          notation: "compact",
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }),
        total_volume: item.total_volume.toLocaleString("en-US", {
          style: "currency",
          currency: "USD",
          notation: "compact",
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }),
        price_change_percentage_24h:
          item.price_change_percentage_24h.toFixed(2) + "%",
      };
      return formatted;
    });

    console.log(formattedCoins);
    setCoins(formattedCoins);
  }

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
