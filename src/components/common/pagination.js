import React from "react";

function Pagination({
  requestHandler,
  pageCondition: { page, nextPage, prevPage },
}) {
  return (
    <ul className=" border flex  w-fit mx-auto border-gray-200 rounded">
      <li>
        <button
          className={`${
            !nextPage
              ? "cursor-not-allowed bg-gray-400 opacity-50 "
              : "hover:bg-green-300"
          } px-3 py-1.5 bg-green-100  duration-100`}
          onClick={() => nextPage && requestHandler(page + 1)}
        >
          صفحه ی بعدی
        </button>
      </li>
      <li className="px-4 flex items-center">{page}</li>

      <li>
        <button
          className={`${
            !prevPage
              ? "cursor-not-allowed bg-gray-400 opacity-50 "
              : "hover:bg-green-300"
          } px-3 py-1.5 bg-green-100  duration-100`}
          onClick={() => prevPage && requestHandler(page - 1)}
        >
          صفحه ی قبلی
        </button>
      </li>
    </ul>
  );
}

export default Pagination;
