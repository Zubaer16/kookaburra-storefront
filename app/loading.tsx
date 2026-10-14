export default function Loading() {
  return (
    <div className="container-shell animate-pulse py-10" aria-label="Loading storefront" role="status">
      <div className="h-[280px] rounded-[26px] bg-[#e4eaf6] sm:h-[400px]" />
      <div className="mt-14 h-8 w-64 rounded-lg bg-[#e4eaf6]" />
      <div className="mt-7 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {Array.from({ length: 4 }, (_, i) => <div key={i} className="aspect-square rounded-xl bg-[#eef2f8]" />)}
      </div>
    </div>
  );
}
