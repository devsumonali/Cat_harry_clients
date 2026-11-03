export default function LoadingState() {
     return <div role="status" aria-live="polite" className="mx-auto w-full max-w-7xl space-y-6 px-4 py-10">
          <p className="flex items-center gap-3 text-sm font-medium text-[#b92d00]"><span className="size-5 animate-spin rounded-full border-2 border-[#b92d00]/20 border-t-[#b92d00]" />Loading StudioSpace…</p>
          <div className="grid animate-pulse gap-5 sm:grid-cols-2 lg:grid-cols-3" aria-hidden="true">{[1, 2, 3].map((item) => <div key={item} className="rounded-xl border border-[#eee7e3] bg-white p-4"><div className="h-40 rounded-lg bg-[#eee7e3]" /><div className="mt-4 h-4 w-3/4 rounded bg-[#eee7e3]" /><div className="mt-3 h-3 w-1/2 rounded bg-[#eee7e3]" /></div>)}</div>
     </div>;
}
