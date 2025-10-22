import Table from "../common/Table";

export default function RewardHistory({ data = [] }) {
  const columns = ["Date", "Reward Source", "Tokens", "Note"];

  const tableData = data.map((his) => ({
    date: new Date(his.created_at).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "2-digit",
    }),
    reward_source: (
      <span className="text-white font-aeonik whitespace-nowrap">
        {his.source}
      </span>
    ),
    tokens: (
      <span className="text-emerald-400 font-aeonik whitespace-nowrap">
        {his.tokens}
      </span>
    ),
    note: (
      <span className="text-white/70 text-sm whitespace-nowrap">
        {his.note}
      </span>
    ),
  }));

  const totalTokens = data.reduce((sum, his) => sum + (his.tokens || 0), 0);

  return (
    <section className="w-full h-full text-white">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-grifter">Reward History</h2>
        <p className="text-xs font-aeonik text-cyan-400">
          PAY earned so far{" "}
          <span className="text-emerald-400 font-bold">{totalTokens}</span> Tokens
        </p>
      </div>

      {/* Scrollable Container with Fixed Height */}
      <div className="border border-white/10 rounded-2xl overflow-hidden shadow-inner h-[500px] flex flex-col">
        {/* Gradient header row - Fixed */}
        <div className="bg-gradient-to-r from-cyan-400 to-blue-500 text-white text-xs font-aeonik px-4 py-2.5 grid grid-cols-4 gap-4 flex-shrink-0">
          {columns.map((col, idx) => (
            <div key={idx} className="whitespace-nowrap overflow-hidden">
              {col}
            </div>
          ))}
        </div>

        {/* Table body - Scrollable */}
        <div className="divide-y divide-white/10 overflow-y-auto flex-1 scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
          <Table
            columns={columns}
            data={tableData}
            hideHeader
            rowClassName="px-4 py-3 grid grid-cols-4 gap-4 items-center hover:bg-white/5 transition-all text-sm"
          />
        </div>
      </div>
    </section>
  );
}