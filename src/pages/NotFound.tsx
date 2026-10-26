import { Link } from "react-router-dom";
import Seo from "../components/Seo";

export default function NotFound() {
  return (
    <>
      <Seo
        title="Page Not Found | GSB Educational Services Limited"
        description="The page you are looking for could not be found."
        path="/404"
      />
      <section className="container-site py-20 text-center md:py-28">
        <p className="text-[clamp(4rem,18vw,8rem)] font-black leading-none text-navy">
          404
        </p>
        <h1>We can't find that page</h1>
        <p className="mx-auto max-w-lg text-muted">
          The page may have moved or the link might be incorrect. Let's get you
          back on track — or ask Dee, our assistant, using the chat button in
          the corner.
        </p>
        <div className="mt-7 flex flex-wrap justify-center gap-3.5">
          <Link to="/" className="btn btn-primary">
            Back to home
          </Link>
          <Link to="/contact" className="btn btn-outline">
            Contact GSB
          </Link>
        </div>
      </section>
    </>
  );
}
