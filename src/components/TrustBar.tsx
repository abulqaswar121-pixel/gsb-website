import { site } from "../config/site";

/**
 * Continuously moving trust bar. Content is factual service keywords only —
 * no invented statistics, ratings or partnerships.
 */
export default function TrustBar() {
  const items = site.trustBar;
  const row = (hidden: boolean) => (
    <ul
      className="flex w-max items-center gap-10 pr-10"
      aria-hidden={hidden}
    >
      {items.map((item, i) => (
        <li
          key={`${hidden ? "dup" : "main"}-${i}`}
          className="flex items-center gap-10 whitespace-nowrap text-sm font-bold tracking-wide text-brand-silver"
        >
          <span>{item}</span>
          <span className="text-brand-blue" aria-hidden>
            ◆
          </span>
        </li>
      ))}
    </ul>
  );

  return (
    <div className="overflow-hidden border-y border-white/10 bg-navy-dark py-3.5">
      <div className="marquee-track flex w-max animate-marquee">
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}
