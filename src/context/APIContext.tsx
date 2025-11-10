import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

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

interface formattedCoinsProps
  extends Omit<
    CoinProps,
    | "current_price"
    | "market_cap"
    | "total_volume"
    | "price_change_percentage_24h"
  > {
  current_price: string;
  market_cap: string;
  total_volume: string;
  price_change_percentage_24h: string;
}

interface APIContextProps {
  coins: formattedCoinsProps[];
  getData: () => Promise<void>;
}

const APIContext = createContext<APIContextProps | undefined>(undefined);

export function APIProvider({ children }: { children: ReactNode }) {
  const [coins, setCoins] = useState<formattedCoinsProps[]>([]);

  const getData = async () => {
    try {
      const response = await fetch(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false"
      );
      const data: CoinProps[] = await response.json();

      const formattedCoins: formattedCoinsProps[] = data.map((item) => ({
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
          Number(item.price_change_percentage_24h).toFixed(2) + "%",
      }));

      setCoins(formattedCoins);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <APIContext.Provider value={{ coins, getData }}>
      {children}
    </APIContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAPI() {
  const context = useContext(APIContext);
  if (!context) {
    throw new Error("useAPI must be used within an APIProvider");
  }
  return context;
}
