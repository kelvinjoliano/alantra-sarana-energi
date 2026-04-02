type Props = {
  kategori: string[];
  active: string;
  onChange: (kategori: string) => void;
};

export default function KategoriFilter({ kategori, active, onChange }: Props) {
  return (
    <div className="flex flex-wrap gap-2 mb-8">
      {["Semua", ...kategori].map((k) => (
        <button
          key={k}
          onClick={() => onChange(k)}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
            active === k
              ? "bg-teal-500/20 text-teal-400 border border-teal-500/40"
              : "bg-white/5 text-slate-400 border border-white/10 hover:bg-white/10 hover:text-slate-200"
          }`}
        >
          {k}
        </button>
      ))}
    </div>
  );
}
