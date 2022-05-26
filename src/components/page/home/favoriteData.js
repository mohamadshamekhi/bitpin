import React from "react";
import CurrencyCard from "../../common/cards/currencyCard";
import { useSelector } from "react-redux";

function FavoriteData() {
  const { favoriteMarkets } = useSelector((state) => state.markets);

  return (
    <>
      {favoriteMarkets && favoriteMarkets.length !== 0 && (
        <div className="mb-20">
          <h2>علاقه مندی های من:</h2>
          <>
            {favoriteMarkets.map((marketData, index) => (
              <CurrencyCard
                isFavorite={true}
                rowNumber={index + 1}
                data={marketData}
                key={index}
              />
            ))}
          </>
        </div>
      )}
    </>
  );
}

export default FavoriteData;
