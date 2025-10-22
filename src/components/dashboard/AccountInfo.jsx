export default function AccountInfo({ user }) {
  const info = [
    { label: "Email", value: user.email, status: "Verified" },
    { label: "Name", value: user.name, status: "Set" },
  ];

  return (
    <section className="w-full h-full text-white">
      <h2 className="text-xl font-grifter mb-4">Account</h2>

      <div className="space-y-3 bg-white/5 border border-white/10 rounded-2xl p-6 h-[400px] flex flex-col justify-center">
        {info.map((item, index) => (
          <div
            key={index}
            className="flex justify-between items-center px-4 py-4 border border-white/10 rounded-xl bg-white/5 hover:bg-white/10 transition-all"
          >
            <span className="text-sm font-aeonik text-white/90">
              {item.label}
            </span>
            <div className="text-right">
              <div className="text-sm text-emerald-400 font-aeonik">
                {item.value}
              </div>
              <div className="text-xs text-white/50">{item.status}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}