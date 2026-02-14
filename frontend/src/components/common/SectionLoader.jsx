export default function SectionLoader({ text = "Loading..." }) {
  return (
    <div className="w-full py-24 flex flex-col items-center justify-center gap-6">
      <div className="w-12 h-12 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin"></div>

      <p className="text-gray-500 text-sm tracking-wide">{text}</p>
    </div>
  );
}
