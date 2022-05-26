import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  addItemToFavorite,
  removeItemOfFavorite,
  addFinancial,
} from "../../../redux/slice/markets";

function CurrencyCard({ rowNumber, data, isFavorite }) {
  const [isOnFavoriteList, setIsOnFavoriteList] = useState(false);
  const { favoriteMarkets } = useSelector((state) => state.markets);

  const dispatch = useDispatch();
  let { currency1, price, id, internal_price_info } = data;

  const generatePriceChangeSpan = () => {
    let numberCondition = Math.sign(internal_price_info.change);

    return numberCondition === 1
      ? "bg-green-200"
      : numberCondition === -1
      ? "bg-red-200"
      : "bg-gray-200";
  };

  const addToFavorite = (cookieName, cookieValue) => {
    setIsOnFavoriteList(!isOnFavoriteList);
    dispatch(addItemToFavorite({ cookieName, favoriteItem: cookieValue }));
  };

  const removeFavorite = (cookieName, cookieValue) => {
    setIsOnFavoriteList(!isOnFavoriteList);
    dispatch(removeItemOfFavorite({ cookieName, favoriteItem: cookieValue }));
  };

  useEffect(() => {
    favoriteMarkets &&
      favoriteMarkets.find(
        (item) => item.id === data.id && setIsOnFavoriteList(true)
      );
  }, []);

  return (
    <div className="flex items-center px-5 border-b border-gray-200 py-4">
      <span>{rowNumber})</span>
      <div className=" w-full grid grid-cols-12 mr-4 items-center  ">
        <div className="flex col-span-3 items-center">
          <Link to={`/financial/${id}`}>
            <button onClick={() => dispatch(addFinancial({ financial: data }))}>
              <img
                className="w-10 object-cover h-10"
                src={currency1.image}
                alt=""
              />
            </button>
          </Link>
          <div className=" flex-col flex mr-2">
            <span>{currency1.code}</span>
            <span>{currency1.title_fa}</span>
          </div>
        </div>
        <span className=" col-span-2 text-center">
          {Number(price).toLocaleString()}
        </span>
        <div className="col-span-2 text-center">
          <span
            className={`${generatePriceChangeSpan()} rounded px-2 py-1 min-w-[100px] inline-block`}
          >
            {internal_price_info.change ? internal_price_info.change : "------"}
          </span>
        </div>
        {!isFavorite && (
          <>
            {" "}
            {isOnFavoriteList ? (
              <button
                onClick={() => removeFavorite("favoriteCurrency", data)}
                className="col-span-2 col-start-11 px-3 py-1.5 bg-red-500 text-white text-sm rounded hover:bg-red-700 duration-200"
              >
                حذف از علاقه مندی
              </button>
            ) : (
              <button
                onClick={() => addToFavorite("favoriteCurrency", data)}
                className="col-span-2 col-start-11 px-3 py-1.5 bg-blue-500 text-white text-sm rounded hover:bg-blue-700 duration-200"
              >
                اضافه کردن به علاقه مندی
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default CurrencyCard;
