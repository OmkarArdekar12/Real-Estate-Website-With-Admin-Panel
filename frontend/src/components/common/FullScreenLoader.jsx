export default function FullScreenLoader() {
  return (
    <div className="fixed inset-0 bg-white flex flex-col items-center justify-center z-[9999]">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin"></div>

        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse"></div>
        </div>
      </div>

      <h2 className="mt-6 text-xl font-serif tracking-wide text-gray-700">
        Real Estate
      </h2>

      <p className="text-sm text-gray-400 mt-2">Preparing your experience...</p>
    </div>
  );
}
