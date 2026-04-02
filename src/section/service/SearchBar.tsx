type Props = {
  value: string;
  onChange: (value: string) => void;
  totalFiltered: number;
};

export default function SearchBar({ value, onChange, totalFiltered }: Props) {
  return (
    <div className="flex flex-col md:flex-row gap-3 mb-6">
      <div className="relative flex-1">
        <svg
          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500"
          width="15"
          height="15"
          viewBox="0 0 15 15"
          fill="none"
        >
          <circle
            cx="6"
            cy="6"
            r="4.5"
            stroke="currentColor"
            strokeWidth="1.4"
          />
          <path
            d="M10 10L13.5 13.5"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
          />
        </svg>
        <input
          type="text"
          placeholder="Cari nama sertifikasi..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-teal-500/50 transition-all"
        />
      </div>
      <div className="flex items-center text-xs text-slate-500">
        <span className="text-teal-400 font-semibold mr-1">
          {totalFiltered}
        </span>
        sertifikasi ditemukan
      </div>
    </div>
  );
}
