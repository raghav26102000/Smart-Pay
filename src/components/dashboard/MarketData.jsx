import React, { useState } from "react";
import Table from "../common/Table";

export default function MarketData(cryptos) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  
  const columns = ["Type", "Name", "Price(USD)"];

  const allData = cryptos.cryptos.map((crypto) => ({
    type: (
      <div className="flex items-center gap-2 text-white font-aeonik">
        <img src={crypto.icon} alt={crypto.type} className="w-5 h-5" />
        {crypto.type}
      </div>
    ),
    name: <span className="text-white/50 text-sm">{crypto.name}</span>,
    rate: (
      <div className="text-right">
        <p className="text-emerald-400 font-aeonik float-left">
          {crypto.price}
        </p>
        <p
          className={`text-xs ${
            parseFloat(crypto.change) < 0 ? "text-red-400" : "text-green-400"
          }`}
        >
          {crypto.change}
        </p>
      </div>
    ),
  }));

  // Pagination logic
  const totalPages = Math.ceil(allData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = allData.slice(startIndex, endIndex);

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <section className="w-full h-full text-white">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-grifter">Market Data</h2>
        <span className="text-xs text-white/50 font-aeonik">
          {allData.length} Cryptocurrencies
        </span>
      </div>
      
      <div className="bg-white/5 border border-white/10 rounded-2xl shadow-inner h-[400px] flex flex-col">
        {/* Table Content */}
        <div className="flex-1 p-4 overflow-y-auto scrollbar-thin">
          <Table columns={columns} data={paginatedData} />
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between px-6 py-3 border-t border-white/10 bg-white/5">
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className={`px-4 py-1.5 rounded-full text-xs font-aeonik transition-all ${
                currentPage === 1
                  ? "bg-white/5 text-white/30 cursor-not-allowed"
                  : "bg-gradient-to-r from-cyan-400/20 to-blue-500/20 text-cyan-400 hover:from-cyan-400/30 hover:to-blue-500/30"
              }`}
            >
              Previous
            </button>

            <div className="flex items-center gap-2">
              {[...Array(totalPages)].map((_, idx) => {
                const pageNum = idx + 1;
                // Show first 2, last 2, and current with neighbors
                const showPage =
                  pageNum <= 2 ||
                  pageNum >= totalPages - 1 ||
                  Math.abs(pageNum - currentPage) <= 1;

                if (!showPage) {
                  // Show ellipsis
                  if (
                    pageNum === 3 && currentPage > 4 ||
                    pageNum === totalPages - 2 && currentPage < totalPages - 3
                  ) {
                    return (
                      <span key={idx} className="text-white/30 px-1">
                        ...
                      </span>
                    );
                  }
                  return null;
                }

                return (
                  <button
                    key={idx}
                    onClick={() => setCurrentPage(pageNum)}
                    className={`w-7 h-7 rounded-full text-xs font-aeonik transition-all ${
                      currentPage === pageNum
                        ? "bg-gradient-to-r from-cyan-400 to-blue-500 text-white font-bold"
                        : "bg-white/5 text-white/70 hover:bg-white/10"
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}
            </div>

            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className={`px-4 py-1.5 rounded-full text-xs font-aeonik transition-all ${
                currentPage === totalPages
                  ? "bg-white/5 text-white/30 cursor-not-allowed"
                  : "bg-gradient-to-r from-cyan-400/20 to-blue-500/20 text-cyan-400 hover:from-cyan-400/30 hover:to-blue-500/30"
              }`}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </section>
  );
}