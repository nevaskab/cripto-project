import { useParams } from "react-router-dom";
import { useAPI } from "../../context/APIContext";
import styles from "./Details.module.css";

export function Details() {
  const { id } = useParams<{ id: string }>();
  const { coins } = useAPI();

  const coin = coins.find((coin) => coin.id === id);

  if (!coin) {
    return (
      <div>
        <p>Carregando...</p>
      </div>
    );
  }

  return (
    <>
      <div className={styles.container}>
        <h1 className={styles.center}>
          {coin?.name} | {coin?.symbol}
        </h1>

        <section className={styles.content}>
          <img className={styles.logo} src={coin.image} alt="Logo da Moeda" />
          <h1>
            {coin?.name} | {coin?.symbol}
          </h1>
          <a>
            <strong>Rank de Mercado:</strong> {coin?.market_cap_rank}
          </a>
          <p>
            <strong>Preço: </strong>
            {coin?.current_price}
          </p>
          <a>
            <strong>Valor de Mercado:</strong> {coin?.market_cap}
          </a>
          <a>
            <strong>Volume Total:</strong> {coin?.total_volume}
          </a>
          <a>
            <strong>Variação 24h: </strong>
            <span
              className={
                Number(coin.price_change_percentage_24h) > 0
                  ? styles.profit
                  : styles.loss
              }
            >
              {coin?.price_change_percentage_24h}
            </span>
          </a>
          <a>
            <strong>Última atualização: </strong> {coin?.last_updated}
          </a>
        </section>
      </div>
    </>
  );
}
