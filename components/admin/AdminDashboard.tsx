"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import type { AdminStats, RSVPRecord, WeddingData, LoveStoryChapter, GalleryImage, ScheduleItem } from "@/types";

type Tab = "overview" | "couple" | "events" | "story" | "gallery" | "other";

const tabs: { id: Tab; label: string }[] = [
  { id: "overview", label: "სტატისტიკა" },
  { id: "couple", label: "წყვილი" },
  { id: "events", label: "ღონისძიება" },
  { id: "story", label: "ისტორია" },
  { id: "gallery", label: "ფოტოები" },
  { id: "other", label: "სხვა" },
];

function Field({
  label,
  value,
  onChange,
  type = "text",
  rows,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  rows?: number;
}) {
  const cls =
    "w-full border-b border-warm-white/15 bg-transparent py-2 text-sm text-warm-white outline-none focus:border-champagne";
  return (
    <label className="block">
      <span className="mb-1 block text-xs uppercase tracking-widest text-champagne/60">{label}</span>
      {rows ? (
        <textarea rows={rows} value={value} onChange={(e) => onChange(e.target.value)} className={cls} />
      ) : (
        <input type={type} value={value} onChange={(e) => onChange(e.target.value)} className={cls} />
      )}
    </label>
  );
}

export function AdminDashboard() {
  const router = useRouter();
  const [tab, setTab] = useState<Tab>("overview");
  const [data, setData] = useState<WeddingData | null>(null);
  const [rsvps, setRsvps] = useState<RSVPRecord[]>([]);
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [uploading, setUploading] = useState(false);
  const [loadError, setLoadError] = useState<string>("");

  const loadAll = useCallback(async () => {
    try {
      setLoadError("");

      const session = await fetch("/api/auth/session");
      if (!session.ok) {
        router.push("/admin/login");
        return;
      }
      const { authenticated } = await session.json();
      if (!authenticated) {
        router.push("/admin/login");
        return;
      }

      const [weddingRes, rsvpRes] = await Promise.all([
        fetch("/api/admin/wedding"),
        fetch("/api/admin/rsvps"),
      ]);

      if (!weddingRes.ok) {
        const err = (await weddingRes.json().catch(() => ({}))) as {
          debug?: string;
        };
        setLoadError(
          `Wedding API error: ${weddingRes.status}${err.debug ? ` — ${err.debug}` : ""}`
        );
        return;
      }

      setData(await weddingRes.json());

      if (rsvpRes.ok) {
        const json = await rsvpRes.json();
        setRsvps(json.rsvps);
        setStats(json.stats);
      } else {
        const err = (await rsvpRes.json().catch(() => ({}))) as { debug?: string };
        setRsvps([]);
        setStats({
          totalResponses: 0,
          totalGuests: 0,
          attendingYes: 0,
          attendingNo: 0,
          attendingMaybe: 0,
          guestCountYes: 0,
        });
        setMessage(
          `RSVP API error: ${rsvpRes.status}${err.debug ? ` — ${err.debug}` : ""}`
        );
      }
    } catch {
      setLoadError("Network error");
    }
  }, [router]);

  useEffect(() => {
    loadAll();
  }, [loadAll]);

  const save = async () => {
    if (!data) return;
    setSaving(true);
    setMessage("");
    const res = await fetch("/api/admin/wedding", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    setSaving(false);
    setMessage(res.ok ? "✓ შენახულია" : "შეცდომა");
  };

  const logout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
  };

  const uploadImage = async (file: File, target: "hero" | "finale" | "gallery" | "story", storyId?: string) => {
    setUploading(true);
    const form = new FormData();
    form.append("file", file);
    const res = await fetch("/api/admin/upload", { method: "POST", body: form });
    setUploading(false);
    if (!res.ok || !data) return;
    const { url, width, height } = await res.json();

    if (target === "hero") {
      setData({ ...data, images: { ...data.images, hero: url } });
    } else if (target === "finale") {
      setData({ ...data, images: { ...data.images, finale: url } });
    } else if (target === "gallery") {
      setData({
        ...data,
        gallery: [
          ...data.gallery,
          { id: `g-${Date.now()}`, src: url, alt: "ახალი ფოტო", width, height },
        ],
      });
    } else if (target === "story" && storyId) {
      setData({
        ...data,
        loveStory: data.loveStory.map((c) =>
          c.id === storyId ? { ...c, image: url } : c
        ),
      });
    }
  };

  const deleteGallery = (id: string) => {
    if (!data) return;
    setData({ ...data, gallery: data.gallery.filter((g) => g.id !== id) });
  };

  const deleteRsvp = async (id: string) => {
    const res = await fetch(`/api/admin/rsvps?id=${id}`, { method: "DELETE" });
    if (res.ok) {
      const json = await res.json();
      setRsvps(json.rsvps);
      setStats(json.stats);
    }
  };

  const updateSchedule = (index: number, field: keyof ScheduleItem, value: string) => {
    if (!data) return;
    const schedule = [...data.schedule];
    schedule[index] = { ...schedule[index], [field]: value };
    setData({ ...data, schedule });
  };

  const updateChapter = (id: string, field: keyof LoveStoryChapter, value: string) => {
    if (!data) return;
    setData({
      ...data,
      loveStory: data.loveStory.map((c) => (c.id === id ? { ...c, [field]: value } : c)),
    });
  };

  if (loadError) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-[#0d0c0b] px-6 text-center text-warm-white">
        <p className="text-champagne">შეცდომა: {loadError}</p>
        <button
          onClick={loadAll}
          className="bg-champagne/90 px-4 py-2 text-xs uppercase tracking-widest text-matte-black hover:bg-champagne"
        >
          ხელახლა ცდა
        </button>
        <a href="/admin/login" className="text-xs text-warm-white/50 hover:text-champagne">
          შესვლა
        </a>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0d0c0b] text-champagne">
        იტვირთება...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0d0c0b] text-warm-white">
      <header className="sticky top-0 z-50 border-b border-champagne/10 bg-[#0d0c0b]/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <h1 className="text-cinematic text-xl text-champagne">ადმინ პანელი</h1>
          <div className="flex items-center gap-4">
            {message && <span className="text-sm text-champagne">{message}</span>}
            <button
              onClick={save}
              disabled={saving}
              className="bg-champagne/90 px-4 py-2 text-xs uppercase tracking-widest text-matte-black hover:bg-champagne disabled:opacity-50"
            >
              {saving ? "..." : "შენახვა"}
            </button>
            <a href="/" target="_blank" className="text-xs text-warm-white/50 hover:text-champagne">
              საიტი
            </a>
            <button onClick={logout} className="text-xs text-warm-white/50 hover:text-champagne">
              გასვლა
            </button>
          </div>
        </div>
        <nav className="mx-auto flex max-w-6xl gap-1 overflow-x-auto px-4 pb-3">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`whitespace-nowrap px-4 py-2 text-xs uppercase tracking-widest transition ${
                tab === t.id ? "bg-champagne/20 text-champagne" : "text-warm-white/40 hover:text-champagne"
              }`}
            >
              {t.label}
            </button>
          ))}
        </nav>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8">
        {tab === "overview" && stats && (
          <div className="space-y-8">
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              {[
                { label: "პასუხები", value: stats.totalResponses },
                { label: "სტუმრები (სულ)", value: stats.totalGuests },
                { label: "მოვლენ", value: stats.attendingYes },
                { label: "სტუმრები (მოვლენ)", value: stats.guestCountYes },
              ].map((s) => (
                <div key={s.label} className="glass rounded-sm p-6 text-center">
                  <p className="text-cinematic text-4xl text-champagne">{s.value}</p>
                  <p className="mt-2 text-xs uppercase tracking-widest text-warm-white/50">{s.label}</p>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="glass rounded-sm p-4 text-center">
                <p className="text-2xl text-green-400/80">{stats.attendingYes}</p>
                <p className="text-xs text-warm-white/40">სიამოვნებით</p>
              </div>
              <div className="glass rounded-sm p-4 text-center">
                <p className="text-2xl text-red-400/80">{stats.attendingNo}</p>
                <p className="text-xs text-warm-white/40">ვერ მოვლენ</p>
              </div>
              <div className="glass rounded-sm p-4 text-center">
                <p className="text-2xl text-yellow-400/80">{stats.attendingMaybe}</p>
                <p className="text-xs text-warm-white/40">არ ვიცი</p>
              </div>
            </div>

            <div className="glass overflow-hidden rounded-sm">
              <table className="w-full text-left text-sm">
                <thead className="border-b border-champagne/10 text-xs uppercase tracking-widest text-champagne/60">
                  <tr>
                    <th className="p-4">სახელი</th>
                    <th className="p-4">ელფოსტა</th>
                    <th className="p-4">სტatus</th>
                    <th className="p-4">სტუმრები</th>
                    <th className="p-4"></th>
                  </tr>
                </thead>
                <tbody>
                  {rsvps.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="p-8 text-center text-warm-white/40">
                        ჯერ არავინ responded
                      </td>
                    </tr>
                  ) : (
                    rsvps.map((r) => (
                      <tr key={r.id} className="border-b border-warm-white/5">
                        <td className="p-4">{r.name}</td>
                        <td className="p-4 text-warm-white/60">{r.email}</td>
                        <td className="p-4">
                          {r.attending === "yes" ? "✓" : r.attending === "no" ? "✗" : "?"}
                        </td>
                        <td className="p-4">{r.guestCount}</td>
                        <td className="p-4">
                          <button
                            onClick={() => deleteRsvp(r.id)}
                            className="text-xs text-muted-rose hover:text-red-400"
                          >
                            წაშლა
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {tab === "couple" && (
          <div className="grid gap-6 md:grid-cols-2">
            <Field label="სახელი 1" value={data.couple.partner1} onChange={(v) => setData({ ...data, couple: { ...data.couple, partner1: v } })} />
            <Field label="სახელი 2" value={data.couple.partner2} onChange={(v) => setData({ ...data, couple: { ...data.couple, partner2: v } })} />
            <Field label="ინიციალები" value={data.couple.initials} onChange={(v) => setData({ ...data, couple: { ...data.couple, initials: v } })} />
            <Field label="თაგი" value={data.couple.tagline} onChange={(v) => setData({ ...data, couple: { ...data.couple, tagline: v } })} />
            <Field label="თარიღი (ISO)" value={data.date} onChange={(v) => setData({ ...data, date: v })} />
            <Field label="თარიღი (ტექსტი)" value={data.dateFormatted} onChange={(v) => setData({ ...data, dateFormatted: v })} />

            <div className="md:col-span-2">
              <p className="mb-2 text-xs uppercase tracking-widest text-champagne/60">Hero ფოტო</p>
              <div className="relative mb-2 h-40 w-full overflow-hidden rounded-sm">
                <Image src={data.images.hero} alt="hero" fill className="object-cover" />
              </div>
              <input type="file" accept="image/*" onChange={(e) => e.target.files?.[0] && uploadImage(e.target.files[0], "hero")} className="text-xs" />
            </div>
            <div className="md:col-span-2">
              <p className="mb-2 text-xs uppercase tracking-widest text-champagne/60">Finale ფოტო</p>
              <div className="relative mb-2 h-40 w-full overflow-hidden rounded-sm">
                <Image src={data.images.finale} alt="finale" fill className="object-cover" />
              </div>
              <input type="file" accept="image/*" onChange={(e) => e.target.files?.[0] && uploadImage(e.target.files[0], "finale")} className="text-xs" />
            </div>
            {uploading && <p className="text-sm text-champagne">იტვირთება...</p>}
          </div>
        )}

        {tab === "events" && (
          <div className="space-y-8">
            <Field label="Dress Code" value={data.dressCode} onChange={(v) => setData({ ...data, dressCode: v })} />
            <div className="grid gap-6 md:grid-cols-2">
              <div className="glass space-y-4 rounded-sm p-6">
                <h3 className="text-champagne">ცერემონია</h3>
                <Field label="სახელი" value={data.venue.ceremony.name} onChange={(v) => setData({ ...data, venue: { ...data.venue, ceremony: { ...data.venue.ceremony, name: v } } })} />
                <Field label="მისამართი" value={data.venue.ceremony.address} onChange={(v) => setData({ ...data, venue: { ...data.venue, ceremony: { ...data.venue.ceremony, address: v } } })} />
                <Field label="ქალაქი" value={data.venue.ceremony.city} onChange={(v) => setData({ ...data, venue: { ...data.venue, ceremony: { ...data.venue.ceremony, city: v } } })} />
                <Field label="დრო" value={data.venue.ceremony.time} onChange={(v) => setData({ ...data, venue: { ...data.venue, ceremony: { ...data.venue.ceremony, time: v } } })} />
                <Field label="აღწერა" value={data.venue.ceremony.description} onChange={(v) => setData({ ...data, venue: { ...data.venue, ceremony: { ...data.venue.ceremony, description: v } } })} rows={3} />
              </div>
              <div className="glass space-y-4 rounded-sm p-6">
                <h3 className="text-champagne">რეცეპცია</h3>
                <Field label="სახელი" value={data.venue.reception.name} onChange={(v) => setData({ ...data, venue: { ...data.venue, reception: { ...data.venue.reception, name: v } } })} />
                <Field label="მისამართი" value={data.venue.reception.address} onChange={(v) => setData({ ...data, venue: { ...data.venue, reception: { ...data.venue.reception, address: v } } })} />
                <Field label="ქალაქი" value={data.venue.reception.city} onChange={(v) => setData({ ...data, venue: { ...data.venue, reception: { ...data.venue.reception, city: v } } })} />
                <Field label="დრო" value={data.venue.reception.time} onChange={(v) => setData({ ...data, venue: { ...data.venue, reception: { ...data.venue.reception, time: v } } })} />
                <Field label="აღწერა" value={data.venue.reception.description} onChange={(v) => setData({ ...data, venue: { ...data.venue, reception: { ...data.venue.reception, description: v } } })} rows={3} />
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="text-champagne">განრიგი</h3>
              {data.schedule.map((item, i) => (
                <div key={i} className="glass grid gap-3 rounded-sm p-4 md:grid-cols-3">
                  <Field label="დრო" value={item.time} onChange={(v) => updateSchedule(i, "time", v)} />
                  <Field label="სათაური" value={item.title} onChange={(v) => updateSchedule(i, "title", v)} />
                  <Field label="აღწერა" value={item.description} onChange={(v) => updateSchedule(i, "description", v)} />
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === "story" && (
          <div className="space-y-6">
            {data.loveStory.map((chapter) => (
              <div key={chapter.id} className="glass space-y-4 rounded-sm p-6">
                <div className="grid gap-4 md:grid-cols-2">
                  <Field label="წელი" value={chapter.year} onChange={(v) => updateChapter(chapter.id, "year", v)} />
                  <Field label="აქcent" value={chapter.accent || ""} onChange={(v) => updateChapter(chapter.id, "accent", v)} />
                </div>
                <Field label="სათაური" value={chapter.title} onChange={(v) => updateChapter(chapter.id, "title", v)} />
                <Field label="ტექსტი" value={chapter.content} onChange={(v) => updateChapter(chapter.id, "content", v)} rows={4} />
                <div className="relative h-32 w-48 overflow-hidden rounded-sm">
                  <Image src={chapter.image} alt={chapter.title} fill className="object-cover" />
                </div>
                <input type="file" accept="image/*" onChange={(e) => e.target.files?.[0] && uploadImage(e.target.files[0], "story", chapter.id)} className="text-xs" />
              </div>
            ))}
          </div>
        )}

        {tab === "gallery" && (
          <div className="space-y-6">
            <div>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => e.target.files?.[0] && uploadImage(e.target.files[0], "gallery")}
                className="text-sm"
              />
              {uploading && <span className="ml-4 text-sm text-champagne">იტვირთება...</span>}
            </div>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              {data.gallery.map((img: GalleryImage) => (
                <div key={img.id} className="glass space-y-2 rounded-sm p-3">
                  <div className="relative aspect-[3/4] overflow-hidden rounded-sm">
                    <Image src={img.src} alt={img.alt} fill className="object-cover" />
                  </div>
                  <Field label="alt" value={img.alt} onChange={(v) => setData({ ...data, gallery: data.gallery.map((g) => g.id === img.id ? { ...g, alt: v } : g) })} />
                  <button onClick={() => deleteGallery(img.id)} className="text-xs text-muted-rose">წაშლა</button>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === "other" && (
          <div className="grid gap-6 md:grid-cols-2">
            <Field label="ციტატა" value={data.quote.text} onChange={(v) => setData({ ...data, quote: { ...data.quote, text: v } })} rows={4} />
            <Field label="ავტორი" value={data.quote.author} onChange={(v) => setData({ ...data, quote: { ...data.quote, author: v } })} />
            <Field label="მუსიკა" value={data.music.title} onChange={(v) => setData({ ...data, music: { ...data.music, title: v } })} />
            <Field label="შემსრულებელი" value={data.music.artist} onChange={(v) => setData({ ...data, music: { ...data.music, artist: v } })} />
          </div>
        )}
      </main>
    </div>
  );
}
