import React, { useEffect, useState } from "react";
import CurrencyCard from "../components/common/cards/currencyCard";
import Layout from "../components/common/layout/layout";
import Pagination from "../components/common/pagination";
import FavoriteData from "../components/page/home/favoriteData";
import { getLocalStorage } from "../helper/coockieHandler";
import { GetAllMarkets } from "../services/markets";

import { useSelector, useDispatch } from "react-redux";
import {
  addFavoriteMarkets,
  addMarkets,
  addPageCondition,
} from "../redux/slice/markets";

function Home() {
  const [showMore, setShowMore] = useState(false);

  const { markets, pageCondition } = useSelector((state) => state.markets);
  const dispatch = useDispatch();

  useEffect(() => {
    getAllMarkets(pageCondition.page);
    dispatch(
      addFavoriteMarkets({
        favoriteMarkets: getLocalStorage("favoriteCurrency"),
      })
    );
  }, []);

  const getAllMarkets = async (_page) => {
    setShowMore(false);
    dispatch(addMarkets({ markets: "loading" }));
    try {
      let response = await GetAllMarkets({ page: _page });
      if (response.status === 200) {
        let { results, next, previous } = response.data;
        dispatch(
          addPageCondition({ page: _page, nextPage: next, prevPage: previous })
        );
        dispatch(addMarkets({ markets: results }));
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <>
        <FavoriteData />

        <div className="border rounded border-gray-200 shadow-sm mb-20 relative">
          <div
            className={
              Array.isArray(markets) && !showMore
                ? "h-[800px] overflow-hidden"
                : "h-fit"
            }
          >
            {!Array.isArray(markets) ? (
              <div className="mx-auto w-fit my-10">در حال جستوجو</div>
            ) : (
              markets.map((marketData, index) => (
                <CurrencyCard
                  rowNumber={(index + 1) * pageCondition.page}
                  data={marketData}
                  key={index}
                />
              ))
            )}
          </div>
          {!showMore && Array.isArray(markets) ? (
            <button
              className="mx-auto w-fit absolute right-1/2 top-full bg-slate-600 hover:bg-slate-900 duration-100 text-white px-5 py-2 rounded translate-x-1/2"
              onClick={() => setShowMore(!showMore)}
            >
              موارد بیشتر
            </button>
          ) : null}
        </div>
        {Array.isArray(markets) && (
          <Pagination
            requestHandler={getAllMarkets}
            pageCondition={pageCondition}
          />
        )}
      </>
    </Layout>
  );
}

export default Home;
