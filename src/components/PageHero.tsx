import { Link } from "react-router-dom";
import type { ReactNode } from "react";

interface PageHeroProps {
  title: ReactNode;
  text: string;
  crumb: string;
}

/** Consistent navy hero band for inner pages. */
export default function PageHero({ title, text, crumb }: PageHeroProps) {
  return (
    <section className="bg-gradient-to-br from-navy-dark to-navy px-0 py-12 text-white md:py-14">
      <div className="container-site">
        <p className="mb-3 text-sm text-brand-silver">
          <Link to="/" className="text-brand-silver hover:text-white">
            Home
          </Link>{" "}
          / {crumb}
        </p>
        <h1 className="text-white">{title}</h1>
        <p className="mt-2 max-w-2xl text-[1.05rem] text-brand-silver">{text}</p>
      </div>
    </section>
  );
}
