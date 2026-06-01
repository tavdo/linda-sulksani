import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "ცოცხალი ქორწილის მოწვევა | ციფრული მოწვევები",
  description:
    "ანიმირებული, პერსონალური, ელეგანტური ციფრული ქორწილის მოწვევები RSVP სისტემით.",
};

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#0d0c0b] text-warm-white">
      {/* Hero */}
      <section className="relative border-b border-champagne/10 px-6 py-24 text-center md:py-32">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(201,169,98,0.08)_0%,transparent_70%)]" />
        <div className="relative mx-auto max-w-3xl">
          <p className="text-editorial mb-6 text-xs uppercase tracking-[0.4em] text-champagne/70">
            ციფრული ქორწილის მოწვევა
          </p>
          <h1 className="text-cinematic mb-6 text-4xl leading-tight text-warm-white md:text-6xl">
            ცოცხალი ქორწილის მოწვევა
          </h1>
          <p className="text-editorial mx-auto mb-10 max-w-xl text-lg text-warm-white/60 md:text-xl">
            ანიმირებული, პერსონალური, ელეგანტური
          </p>
          <Link
            href="/"
            className="inline-block bg-champagne/90 px-8 py-3 text-xs uppercase tracking-[0.3em] text-matte-black transition hover:bg-champagne"
          >
            ნიმუშის ნახვა
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <h2 className="text-cinematic mb-12 text-center text-2xl text-champagne md:text-3xl">
          რატომ ჩვენ?
        </h2>
        <div className="grid gap-6 md:grid-cols-3">
          {[
            {
              title: "სრულად პერსონალური",
              text: "სახელები, თარიღი, ადგილი, ისტორია და ფოტოები — თქვენი უნიკალური ისტორია.",
            },
            {
              title: "RSVP სისტემა",
              text: "სტუმრები პასუხობენ ონლაინ. თქვენ ხედავთ სტატისტიკას ადმინ პანელიდან.",
            },
            {
              title: "მობილური ვერსია",
              text: "იდეალურად გამოიყურება ტელეფონზე — სტუმრები ხსნიან ბმულს ნებისმიერ ადგილიდან.",
            },
          ].map((card) => (
            <div
              key={card.title}
              className="glass rounded-sm border border-champagne/10 p-8 text-center"
            >
              <h3 className="text-cinematic mb-4 text-xl text-champagne">{card.title}</h3>
              <p className="text-sm leading-relaxed text-warm-white/55">{card.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="border-y border-champagne/10 bg-matte-black/40 px-6 py-20">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-cinematic mb-12 text-center text-2xl text-champagne md:text-3xl">
            როგორ მუშაობს
          </h2>
          <ol className="space-y-8 md:space-y-0 md:flex md:items-start md:justify-between md:gap-8">
            {[
              { step: "01", title: "გვიკავშირდი", text: "მოგვწერე WhatsApp-ზე ან Instagram-ზე." },
              {
                step: "02",
                title: "გამოგვიგზავნე მონაცემები",
                text: "სახელები, თარიღი, ადგილი, ფოტოები და ტექსტები.",
              },
              {
                step: "03",
                title: "მიიღე ბმული",
                text: "თქვენი პერსონალური მოწვევა მზადაა გასაზიარებლად.",
              },
            ].map((item, i) => (
              <li key={item.step} className="relative flex-1 text-center">
                <span className="text-cinematic mb-3 block text-3xl text-champagne/40">
                  {item.step}
                </span>
                <h3 className="text-editorial mb-2 text-lg text-champagne">{item.title}</h3>
                <p className="text-sm text-warm-white/50">{item.text}</p>
                {i < 2 && (
                  <span
                    className="absolute right-0 top-8 hidden text-champagne/30 md:block"
                    aria-hidden
                  >
                    →
                  </span>
                )}
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Pricing */}
      <section className="mx-auto max-w-lg px-6 py-20">
        <h2 className="text-cinematic mb-10 text-center text-2xl text-champagne md:text-3xl">
          ფასი
        </h2>
        <div className="glass rounded-sm border border-champagne/20 p-10 text-center">
          <p className="text-cinematic text-5xl text-champagne">150 ₾</p>
          <p className="text-editorial mt-2 text-sm text-warm-white/40">ერთი პროექტი</p>
          <ul className="mt-8 space-y-3 text-left text-sm text-warm-white/70">
            {[
              "სახელი & თარიღი",
              "ადგილი",
              "სიყვარულის ისტორია",
              "ფოტო გალერეა",
              "RSVP სისტემა",
              "1 თვე ჰოსტინგი",
            ].map((item) => (
              <li key={item} className="flex items-center gap-3">
                <span className="text-champagne">✦</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Contact */}
      <section className="border-t border-champagne/10 px-6 py-20 text-center">
        <h2 className="text-cinematic mb-8 text-2xl text-champagne">კონტაქტი</h2>
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-8">
          <a
            href="https://wa.me/995XXXXXXXXX"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block border border-champagne/50 px-8 py-3 text-xs uppercase tracking-[0.3em] text-champagne transition hover:bg-champagne/10"
          >
            WhatsApp
          </a>
          <a
            href="https://instagram.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm tracking-widest text-warm-white/50 transition hover:text-champagne"
          >
            Instagram
          </a>
        </div>
        <p className="text-editorial mt-12 text-xs text-warm-white/25">
          © {new Date().getFullYear()} · ცოცხალი ქორწილის მოწვევა
        </p>
      </section>
    </div>
  );
}
