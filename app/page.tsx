"use client";

import { QRCodeSVG } from "qrcode.react";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function Home() {
  const [guest, setGuest] = useState<any>(null);
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadGuest();
  }, []);

  async function loadGuest() {
    const { data } = await supabase
      .from("quests")
      .select("*")
      .eq("invite_code", "reem001")
      .single();

    setGuest(data);
    setLoading(false);
  }

  async function confirmAttendance(value: boolean) {
    setAnswer(value ? "yes" : "no");

    await supabase
      .from("quests")
      .update({ is_confirmed: value })
      .eq("invite_code", guest.invite_code);
  }

  if (loading) {
    return <main className="p-10 text-center">جاري تحميل الدعوة...</main>;
  }

  if (!guest) {
    return <main className="p-10 text-center">لم يتم العثور على الدعوة</main>;
  }

  const guestNameAr = guest.name_ar;
  const guestNameEn = guest.name_en;
  const inviteCode = guest.invite_code;
  const companionsLimit = guest.companions_limit;
  const inviteLink = `http://localhost:3000/invite/${inviteCode}`;

  return (
    <main className="min-h-screen bg-[#fbf7ef] flex justify-center p-3">
      <section className="relative w-full max-w-[430px] min-h-screen overflow-hidden bg-white text-center border border-[#d6ad55] shadow-2xl px-5 py-7">
        <div className="absolute top-0 left-0 text-8xl opacity-25">🌸</div>
        <div className="absolute top-4 right-3 text-7xl opacity-25">🌿</div>
        <div className="absolute bottom-0 right-0 text-8xl opacity-25">🌸</div>

        <div className="relative z-10">
          <p className="text-3xl text-[#b78a35] mt-4">دعوة زفاف</p>
          <p className="text-[#b78a35] text-xl mt-2">♡</p>
          <p className="tracking-[5px] text-gray-700 text-sm mt-3">
            WEDDING INVITATION
          </p>

          <h1 className="text-6xl font-bold text-[#b78a35] mt-8">
            ملاك & يوسف
          </h1>

          <p className="tracking-[8px] text-[#b78a35] mt-4 text-lg">
            MALAK & YOUSEF
          </p>

          <p className="mt-8 text-lg text-gray-800">
            يسعدنا دعوتكم لحضور حفل زفافنا
          </p>

          <div className="mt-9">
            <p className="text-4xl font-bold text-[#b78a35]">
              ♡ {guestNameAr} ♡
            </p>
            <p className="tracking-[4px] text-[#b78a35] mt-3 text-lg">
              {guestNameEn}
            </p>
          </div>

          <div className="mt-7 grid grid-cols-3 border border-[#e3c98e] rounded-2xl bg-white/80 shadow-md p-4">
            <div>
              <p className="font-bold">التاريخ</p>
              <p className="text-sm text-gray-800">05 / 08 / 2026</p>
            </div>

            <div className="border-x border-[#e3c98e]">
              <p className="font-bold">الوقت</p>
              <p className="text-sm text-gray-800">10:00 - 12:00</p>
            </div>

            <div>
              <p className="font-bold">المكان</p>
              <p className="text-sm text-gray-800">تاج بارك</p>
            </div>
          </div>

          <a
            href="https://maps.google.com/?q=32.490166,35.912842"
            target="_blank"
            className="mx-auto mt-5 block w-56 rounded-2xl border border-[#caa24b] py-3 text-xl font-bold text-[#b78a35] bg-white shadow"
          >
            فتح الموقع
          </a>

          <div className="mt-6 grid grid-cols-2 gap-4">
            <div className="rounded-2xl border border-[#ead9b7] bg-white p-4 shadow-md">
              <p className="font-bold mt-2">عدد المرافقين المسموح</p>
              <p className="text-5xl font-bold text-[#b78a35] mt-3">
                {companionsLimit}
              </p>
            </div>

            <div className="rounded-2xl border border-[#ead9b7] bg-white p-4 shadow-md flex flex-col items-center">
              <QRCodeSVG value={inviteLink} size={125} />
              <p className="text-xs mt-3 text-gray-800">رمز الدعوة الخاص بك</p>
            </div>
          </div>

          <div className="mt-6 rounded-2xl bg-gradient-to-r from-[#b78a35] via-[#d7b76c] to-[#b78a35] p-4 text-white shadow-xl">
            <p className="text-2xl font-bold">تأكيد الحضور</p>

            <div className="flex gap-3 mt-4">
              <button
                onClick={() => confirmAttendance(true)}
                className="w-full bg-white text-[#b78a35] py-2 rounded-full font-bold"
              >
                نعم
              </button>

              <button
                onClick={() => confirmAttendance(false)}
                className="w-full bg-white text-[#b78a35] py-2 rounded-full font-bold"
              >
                لا
              </button>
            </div>

            {answer && (
              <p className="mt-3 text-sm">
                {answer === "yes" ? "تم تأكيد الحضور 🤍" : "تم تسجيل عدم الحضور"}
              </p>
            )}
          </div>

          <p className="text-[#b78a35] mt-7">—— ♥️ ——</p>
          <p className="text-gray-800 mt-2">نستقبلكم بكل الحب</p>
        </div>
      </section>
    </main>
  );
}