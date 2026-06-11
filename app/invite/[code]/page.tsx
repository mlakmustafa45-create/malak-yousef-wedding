"use client";

import { QRCodeSVG } from "qrcode.react";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "@/lib/supabase";
import {
  CalendarDays,
  Clock3,
  MapPin,
  Users,
  Heart,
  Gem,
  Check,
  X,
} from "lucide-react";
import { Amiri, Cormorant_Garamond } from "next/font/google";

const arabicFont = Amiri({
  subsets: ["arabic"],
  weight: ["400", "700"],
});

const englishFont = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export default function InvitePage() {
  const params = useParams();
  const code = params.code as string;

  const [guest, setGuest] = useState<any>(null);
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadGuest() {
      const { data } = await supabase
        .from("quests")
        .select("*")
        .eq("invite_code", code)
        .single();

      setGuest(data);
      setLoading(false);
    }

    if (code) loadGuest();
  }, [code]);

  async function confirmAttendance(value: boolean) {
    setAnswer(value ? "yes" : "no");

    await supabase
      .from("quests")
      .update({ is_confirmed: value })
      .eq("invite_code", guest.invite_code);
  }

  if (loading) {
    return (
      <main className="min-h-screen grid place-items-center bg-[#fbf7ef] text-[#8a6728]">
        جاري تحميل الدعوة...
      </main>
    );
  }

  if (!guest) {
    return (
      <main className="min-h-screen grid place-items-center bg-[#fbf7ef] text-[#8a6728]">
        لم يتم العثور على الدعوة
      </main>
    );
  }

  const inviteLink = `https://malak-yousef-wedding.vercel.app/invite/${guest.invite_code}`;

  return (
    <main
      className={`${arabicFont.className} min-h-screen bg-[#f4eadb] flex justify-center px-3 py-5`}
    >
      <section className="relative w-full max-w-[450px] overflow-hidden rounded-[42px] border border-[#b98b2e] bg-[#fffaf1] text-center shadow-2xl">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#fff7df,transparent_40%),radial-gradient(circle_at_bottom,#ead1a1,transparent_38%)]" />
        <div className="absolute inset-4 rounded-[34px] border border-[#d6b46b]" />
        <div className="absolute inset-7 rounded-[28px] border border-[#ead8ad]" />

        <div className="absolute top-8 left-8 text-5xl text-[#b98b2e] opacity-50">
          ❦
        </div>
        <div className="absolute top-8 right-8 text-5xl text-[#b98b2e] opacity-50">
          ❦
        </div>
        <div className="absolute bottom-8 left-8 text-4xl text-[#b98b2e] opacity-40">
          ✦
        </div>
        <div className="absolute bottom-8 right-8 text-4xl text-[#b98b2e] opacity-40">
          ✦
        </div>

        <div className="relative z-10 px-7 py-10">
          <div className="mx-auto mb-5 h-[1px] w-36 bg-[#b98b2e]" />

          <Gem className="mx-auto text-[#9f741f]" size={34} />

          <p className="mt-4 text-4xl font-bold text-[#9f741f]">
            دعوة زفاف
          </p>

          <p
            className={`${englishFont.className} mt-3 text-xl tracking-[6px] text-[#4b3820]`}
          >
            WEDDING INVITATION
          </p>

          <div className="mt-8 rounded-[32px] border border-[#d7b66b] bg-white/75 px-4 py-7 shadow-xl">
            <h1 className="text-6xl font-bold text-[#9f741f] leading-tight">
              ملاك <span className="text-4xl">&</span> يوسف
            </h1>

            <p
              className={`${englishFont.className} mt-4 text-3xl tracking-[5px] text-[#8a6728]`}
            >
              MALAK & YOUSEF
            </p>

            <Heart className="mx-auto mt-5 text-[#b98b2e]" size={22} />

            <p className="mt-5 text-xl leading-9 text-[#2f2410]">
              يسعدنا دعوتكم لحضور حفل زفافنا
            </p>

            <p
              className={`${englishFont.className} mt-2 text-lg tracking-[2px] text-[#4b3820]`}
            >
              We are honored to invite you
            </p>
          </div>

          <div className="mt-8">
            <p className="text-base text-[#6a5124]">ضيفنا العزيز</p>

            <p className="mt-2 text-6xl font-bold text-[#9f741f] leading-tight">
              {guest.name_ar}
            </p>

            <p
              className={`${englishFont.className} mt-2 text-3xl tracking-[3px] text-[#8a6728]`}
            >
              {guest.name_en}
            </p>
          </div>

          <div className="mt-8 grid grid-cols-3 overflow-hidden rounded-3xl border border-[#d7b66b] bg-white/85 shadow-xl">
            <div className="px-2 py-4">
              <CalendarDays className="mx-auto text-[#9f741f]" size={28} />
              <p className="mt-2 font-bold text-[#2f2410]">التاريخ</p>
              <p className="mt-1 text-xs text-[#5f4a22]">05 / 08 / 2026</p>
            </div>

            <div className="border-x border-[#d7b66b] px-2 py-4">
              <Clock3 className="mx-auto text-[#9f741f]" size={28} />
              <p className="mt-2 font-bold text-[#2f2410]">الوقت</p>
              <p className="mt-1 text-xs text-[#5f4a22]">10:00 - 12:00</p>
            </div>

            <div className="px-2 py-4">
              <MapPin className="mx-auto text-[#9f741f]" size={28} />
              <p className="mt-2 font-bold text-[#2f2410]">المكان</p>
              <p className="mt-1 text-xs text-[#5f4a22]">تاج بارك</p>
            </div>
          </div>

          <a
            href="https://maps.google.com/?q=32.490166,35.912842"
            target="_blank"
            className="mx-auto mt-6 block w-64 rounded-full border border-[#9f741f] bg-[#fff8e8] py-3 text-lg font-bold text-[#8a6728] shadow-lg"
          >
            فتح الموقع
            <span
              className={`${englishFont.className} block text-sm tracking-[2px]`}
            >
              Open Location
            </span>
          </a>

          <div className="mt-6 grid grid-cols-2 gap-4">
            <div className="rounded-3xl border border-[#d7b66b] bg-white/85 p-4 shadow-xl">
              <Users className="mx-auto text-[#9f741f]" size={34} />
              <p className="mt-2 font-bold text-[#2f2410]">عدد المرافقين</p>
              <p className="mt-3 text-5xl font-bold text-[#9f741f]">
                {guest.companions_limit}
              </p>
              <p className="mt-2 text-xs text-[#5f4a22]">
                يرجى الالتزام بالعدد المحدد
              </p>
            </div>

            <div className="rounded-3xl border border-[#d7b66b] bg-white/85 p-4 shadow-xl">
              <div className="mx-auto w-fit rounded-2xl border border-[#caa24b] bg-[#fffaf0] p-3">
                <QRCodeSVG value={inviteLink} size={140} />
              </div>
              <p className="mt-2 text-xs text-[#2f2410]">
                رمز الدعوة الخاص بك
              </p>
              <p
                className={`${englishFont.className} text-sm tracking-[2px] text-[#8a6728]`}
              >
                {guest.invite_code}
              </p>
            </div>
          </div>

          <div className="mt-7 rounded-[32px] border border-[#d7b66b] bg-white/80 p-5 text-[#2f2410] shadow-2xl">
            <p className="text-3xl font-bold text-[#9f741f]">تأكيد الحضور</p>
            <p
              className={`${englishFont.className} mt-1 text-xl tracking-[5px] text-[#8a6728]`}
            >
              RSVP
            </p>

            <div className="mt-5 flex flex-col gap-3">
              <button
                onClick={() => confirmAttendance(true)}
                className="flex items-center justify-center gap-3 rounded-full bg-gradient-to-r from-[#9f741f] via-[#d6b25c] to-[#9f741f] px-4 py-3 text-lg font-bold text-[#2f2410] shadow-lg"
              >
                <Check size={22} />
                نعم، جاي
              </button>

              <button
                onClick={() => confirmAttendance(false)}
                className="flex items-center justify-center gap-3 rounded-full border border-[#caa24b] bg-[#fffaf0] px-4 py-3 text-sm font-bold leading-6 text-[#5c4317] shadow"
              >
                <X size={20} />
                أعتذر عن الحضور، أتمنى لكم السعادة
              </button>
            </div>

            {answer && (
              <p className="mt-4 text-sm font-bold text-[#8a6728]">
                {answer === "yes"
                  ? "نتشرف بحضوركم ومشاركتكم فرحتنا 🤍"
                  : "نشكر لكم لطفكم ونتمنى رؤيتكم في مناسبة قادمة 🤍"}
              </p>
            )}
          </div>

          <p className="mt-8 text-2xl text-[#b98b2e]">❦ ✦ ❦</p>
          <p className="mt-2 text-lg text-[#2f2410]">نستقبلكم بكل الحب</p>

          <p
            className={`${englishFont.className} mt-1 text-lg tracking-[2px] text-[#4b3820]`}
          >
            We can’t wait to celebrate with you
          </p>

          <div className="mx-auto mt-6 h-[1px] w-36 bg-[#b98b2e]" />
        </div>
      </section>
    </main>
  );
}