interface FigureProps {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  loading?: "lazy" | "eager";
  /** Show the "Sample photo" corner badge (default true — all current photos are samples). */
  sample?: boolean;
  rounded?: string;
}

/**
 * Image wrapper with a clearly-marked "Sample photo" badge so every stock
 * image is obvious until replaced with real GSB photography.
 */
export default function Figure({
  src,
  alt,
  className = "",
  imgClassName = "",
  loading = "lazy",
  sample = true,
  rounded = "rounded-xl",
}: FigureProps) {
  return (
    <div className={`relative overflow-hidden ${rounded} ${className}`}>
      <img
        src={src}
        alt={alt}
        loading={loading}
        decoding="async"
        className={`h-full w-full object-cover ${imgClassName}`}
      />
      {sample && (
        <span className="absolute bottom-3 left-3 rounded-full bg-navy-dark/85 px-3 py-1 text-[0.68rem] font-extrabold uppercase tracking-widest text-white backdrop-blur-sm">
          Sample photo
        </span>
      )}
    </div>
  );
}
