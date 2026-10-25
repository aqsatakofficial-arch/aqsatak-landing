"use client";

import { useState, useId, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { 
  ArrowLeft, MessageSquare, Mail, MapPin, PhoneCall, Globe, 
  ShieldCheck, Building2, Sun, Moon, Clock, Sparkles, 
  Zap, Headphones, Copy, CheckCircle2, Send, Loader2
} from "lucide-react";

// =========================================================================
// بيانات الخريطة الأساسية
// =========================================================================
const IRAQ_PATH =
  "M297.8 46.1L297.2 47.6 297.8 49.4 298.8 49.9 299.3 51.3 301.0 51.1 303.1 52.7 302.3 55.2 303.1 58.1 302.9 59.4 300.7 62.1 300.3 63.4 300.6 64.3 302.6 65.1 304.6 65.2 306.0 66.4 307.8 66.9 310.0 70.8 308.5 76.5 307.7 76.9 307.6 77.7 309.6 79.8 311.6 84.0 312.8 84.6 317.6 83.6 318.3 84.5 319.1 89.3 320.3 91.2 319.2 91.9 320.9 93.7 321.2 98.2 323.1 100.9 321.9 103.9 321.9 105.8 322.7 106.6 323.6 106.7 327.7 104.9 328.8 104.9 331.4 105.8 336.1 109.0 338.1 111.7 339.2 114.4 340.5 115.3 342.2 114.8 344.3 115.3 346.1 114.0 351.7 113.9 354.1 112.9 356.4 113.5 357.1 115.1 358.5 116.0 361.3 115.6 363.7 114.4 364.6 114.5 365.7 115.7 365.1 117.4 361.8 120.3 359.2 120.3 356.1 121.6 353.1 121.5 351.6 122.4 351.1 124.1 351.4 127.7 349.7 127.4 350.8 129.9 349.9 131.8 353.2 137.6 356.7 140.9 357.0 142.4 355.7 144.5 355.8 145.3 356.5 145.7 358.1 145.7 358.8 146.2 358.6 147.6 357.1 150.6 358.0 151.7 357.2 152.5 354.3 152.8 351.8 154.3 347.7 152.9 347.1 153.9 347.1 155.0 345.9 155.3 345.2 156.4 345.7 159.1 344.9 162.3 344.3 163.2 341.8 162.1 340.8 162.1 340.4 165.7 339.2 166.5 337.4 166.9 336.9 167.5 336.8 169.8 335.2 172.0 337.0 173.6 337.9 175.5 338.2 178.3 338.8 179.3 338.5 180.8 332.9 179.9 329.7 178.7 329.8 183.7 328.8 185.1 326.5 185.7 326.1 186.3 328.0 191.7 328.8 192.3 329.7 191.6 330.6 191.6 332.2 193.2 332.4 195.7 330.9 200.1 331.6 202.2 327.7 205.8 326.2 209.7 324.5 210.8 326.4 212.6 329.1 212.6 333.0 219.6 334.8 221.4 336.0 225.1 339.3 228.1 339.9 231.1 343.4 228.9 346.5 228.6 346.3 230.2 348.0 231.6 348.3 232.8 345.0 235.7 347.1 236.6 348.4 236.5 349.4 235.6 350.3 235.9 352.3 238.6 353.0 242.3 358.2 247.9 358.6 248.8 358.3 250.7 359.0 251.5 358.7 252.6 356.0 255.2 353.6 255.4 352.8 255.9 352.7 256.5 353.3 257.1 355.2 257.3 356.7 258.2 356.6 259.8 354.7 261.7 355.7 263.8 358.2 264.1 363.3 263.5 367.9 264.9 372.3 267.0 373.5 268.3 382.6 274.1 384.4 276.1 398.9 288.7 401.5 289.7 406.5 288.2 409.8 289.5 412.8 292.8 413.1 293.8 412.1 295.6 412.4 296.6 417.1 302.3 416.3 305.6 417.8 306.4 418.6 307.4 420.0 307.9 421.8 311.2 424.0 312.7 426.2 317.4 427.6 318.7 428.2 320.4 431.2 323.5 431.1 325.7 424.4 344.1 424.2 365.6 438.9 365.9 439.0 393.2 444.1 394.1 445.8 396.2 447.1 400.5 450.8 400.5 451.7 401.1 456.2 406.8 456.1 407.9 455.0 409.8 456.8 413.0 458.1 417.2 459.8 418.8 461.5 419.6 462.5 419.6 462.7 420.1 461.0 421.0 456.3 420.5 453.0 419.3 447.5 416.0 443.6 415.0 440.1 415.4 437.0 417.1 436.3 412.7 435.6 411.7 436.1 413.4 436.1 417.6 426.7 412.7 424.2 412.2 410.5 412.5 403.5 415.5 401.2 417.1 399.7 419.3 394.4 432.2 393.1 437.0 389.8 442.6 388.5 446.2 385.1 450.4 382.4 455.2 374.6 464.3 367.0 466.0 295.7 459.2 294.6 458.8 214.9 391.6 180.8 361.2 109.0 317.5 106.7 316.6 91.8 313.7 53.5 307.2 58.7 302.3 59.8 300.7 58.2 295.6 57.3 295.0 49.1 297.3 48.3 296.3 46.1 288.7 49.6 287.6 37.3 242.1 120.6 192.2 131.3 189.4 132.5 188.5 142.9 168.2 142.4 148.0 142.8 144.8 144.6 138.4 145.4 131.8 148.9 126.6 149.9 123.4 149.5 114.6 144.3 102.4 146.1 87.0 150.8 78.6 168.4 74.9 170.7 73.4 189.8 53.8 193.9 50.3 193.1 47.8 201.9 45.9 202.6 44.2 208.1 36.6 208.6 35.1 212.0 34.1 212.9 35.5 218.3 36.9 222.9 34.8 226.0 34.2 232.8 37.5 235.6 36.9 241.9 40.9 244.0 40.3 246.8 41.6 253.5 41.5 254.5 41.8 256.2 43.1 257.5 42.2 259.9 41.8 264.1 37.3 266.0 37.0 268.3 37.3 272.5 39.0 274.7 41.2 275.3 44.7 272.7 46.8 272.3 49.0 274.7 54.4 276.9 55.1 277.8 54.7 279.4 51.3 284.2 49.5 287.9 46.0 291.0 44.2 296.4 44.8Z";

const BAGHDAD = { x: 280.4, y: 245.0 };
const ORANGE = "#f97316";
const FEEDS = [
  { id: "north", x: 202.6, y: 44.2, bend: -16, duration: 2.4, delay: 0 },
  { id: "west", x: 58.7, y: 302.3, bend: 18, duration: 3.0, delay: 0.8 },
  { id: "southeast", x: 435.6, y: 411.7, bend: -18, duration: 2.8, delay: 1.5 },
  { id: "east", x: 354.7, y: 261.7, bend: 8, duration: 1.5, delay: 2.1 },
];

const LINES = FEEDS.map((f) => {
  const dx = BAGHDAD.x - f.x;
  const dy = BAGHDAD.y - f.y;
  const dist = Math.hypot(dx, dy);
  const cx = (f.x + BAGHDAD.x) / 2 - (dy / dist) * f.bend;
  const cy = (f.y + BAGHDAD.y) / 2 + (dx / dist) * f.bend;

  let len = 0;
  let px = f.x;
  let py = f.y;
  for (let i = 1; i <= 32; i++) {
    const t = i / 32;
    const u = 1 - t;
    const x = u * u * f.x + 2 * u * t * cx + t * t * BAGHDAD.x;
    const y = u * u * f.y + 2 * u * t * cy + t * t * BAGHDAD.y;
    len += Math.hypot(x - px, y - py);
    px = x;
    py = y;
  }
  return {
    ...f,
    d: `M${f.x} ${f.y} Q${cx.toFixed(1)} ${cy.toFixed(1)} ${BAGHDAD.x} ${BAGHDAD.y}`,
    len: Number(len.toFixed(1)),
    dash: Number(Math.min(36, len * 0.35).toFixed(1)),
  };
});

// =========================================================================
// مكون الخريطة 
// =========================================================================
function IraqMap({ className = "", isDarkMode }: { className?: string, isDarkMode: boolean }) {
  const uid = useId().replace(/:/g, "");
  const reduceMotion = useReducedMotion();
  const glowId = `${uid}-glow`;

  return (
    <svg
      viewBox="0 0 500 500"
      fill="none"
      role="img"
      aria-label="Map of Iraq with Baghdad highlighted"
      className={`h-auto w-full transition-colors duration-300 ${isDarkMode ? "text-white" : "text-slate-900"} ${className}`}
    >
      <defs>
        <filter id={glowId} x="-250%" y="-250%" width="600%" height="600%">
          <feGaussianBlur stdDeviation="5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        {LINES.map((l) => (
          <linearGradient key={l.id} id={`${uid}-grad-${l.id}`} gradientUnits="userSpaceOnUse" x1={l.x} y1={l.y} x2={BAGHDAD.x} y2={BAGHDAD.y}>
            <stop offset="0" stopColor="currentColor" stopOpacity="0" />
            <stop offset="0.55" stopColor={ORANGE} stopOpacity="0.65" />
            <stop offset="1" stopColor={ORANGE} stopOpacity="1" />
          </linearGradient>
        ))}
      </defs>

      <path 
        d={IRAQ_PATH} 
        strokeWidth="1" 
        strokeLinejoin="round" 
        className={isDarkMode ? "fill-white/[0.04] stroke-white/20" : "fill-slate-900/5 stroke-slate-900/20"} 
      />

      <motion.path
        d={IRAQ_PATH}
        strokeWidth="1.75"
        strokeLinejoin="round"
        strokeLinecap="butt"
        className={isDarkMode ? "stroke-white [filter:drop-shadow(0_0_4px_rgba(255,255,255,0.55))]" : "stroke-slate-900"}
        initial={{ pathLength: 0, pathOffset: 0 }}
        animate={reduceMotion ? { pathLength: 1, pathOffset: 0 } : { pathLength: [0, 1, 1], pathOffset: [0, 0, 1] }}
        transition={reduceMotion ? { duration: 0 } : { duration: 7, times: [0, 0.6, 1], ease: "easeInOut", repeat: Infinity }}
      />

      {LINES.map((l) => {
        const stroke = `url(#${uid}-grad-${l.id})`;
        return (
          <g key={l.id}>
            <path d={l.d} stroke={stroke} strokeWidth="0.8" strokeDasharray="1.5 4" opacity="0.5" />
            <circle cx={l.x} cy={l.y} r="2.2" className={isDarkMode ? "fill-white" : "fill-slate-900"} />
            {!reduceMotion && (
              <motion.path
                d={l.d}
                stroke={stroke}
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeDasharray={`${l.dash} ${l.len}`}
                initial={{ strokeDashoffset: l.dash }}
                animate={{ strokeDashoffset: [l.dash, -l.len] }}
                transition={{ duration: l.duration, delay: l.delay, ease: "easeIn", repeat: Infinity, repeatDelay: 1.2 }}
              />
            )}
          </g>
        );
      })}

      <g>
        {!reduceMotion && [0, 1.2].map((delay) => (
          <motion.circle key={delay} cx={BAGHDAD.x} cy={BAGHDAD.y} r={5} stroke={ORANGE} strokeWidth="1.2" initial={{ r: 5, opacity: 0 }} animate={{ r: [5, 26], opacity: [0.75, 0] }} transition={{ duration: 2.4, delay, ease: "easeOut", repeat: Infinity }} />
        ))}
        <circle cx={BAGHDAD.x} cy={BAGHDAD.y} r="9" fill={ORANGE} opacity="0.35" filter={`url(#${glowId})`} />
        <motion.circle cx={BAGHDAD.x} cy={BAGHDAD.y} r={4.5} fill={ORANGE} filter={`url(#${glowId})`} animate={reduceMotion ? undefined : { r: [4, 5.6, 4] }} transition={{ duration: 1.6, ease: "easeInOut", repeat: Infinity }} />
        <text x={BAGHDAD.x - 14} y={BAGHDAD.y - 6} textAnchor="end" fontSize="9" letterSpacing="2" className={`font-mono ${isDarkMode ? "fill-neutral-200" : "fill-slate-700"}`}>
          BAGHDAD
        </text>
      </g>
    </svg>
  );
}

// =========================================================================
// الصفحة الرئيسية
// =========================================================================
export default function ContactPage() {
  const [lang, setLang] = useState<"ar" | "en">("ar");
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [formData, setFormData] = useState({ name: "", phone: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [textIndex, setTextIndex] = useState(0);

  const CONTACT_PHONE = "+9647838338499";
  const CONTACT_PHONE_RAW = "9647838338499";
  const CONTACT_EMAIL = "aqsatakofficial@gmail.com";
  const LOCATION_AR = "بغداد، العراق — بغداد ";
  const LOCATION_EN = "Baghdad - Iraq ";

  // نصوص تسويقية متغيرة
  const rotatingTextsAr = [
    "نحن هنا لتحويل أهدافك المالية إلى واقع، تواصل معنا الآن.",
    "نجاحك يبدأ بخطوة، دعنا نناقش تفاصيل متطلباتك.",
    "فريقنا مستعد لتقديم الحلول الأنسب لأتمتة أعمالك."
  ];
  const rotatingTextsEn = [
    "We are here to turn your financial goals into reality.",
    "Your success starts with a step, let's discuss your needs.",
    "Our team is ready to provide the best automation solutions."
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setTextIndex((prev) => (prev + 1) % 3);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);
  const toggleLang = () => setLang(lang === "ar" ? "en" : "ar");

  const copyToClipboard = (e: React.MouseEvent, text: string, type: "phone" | "email") => {
    e.preventDefault();
    navigator.clipboard.writeText(text);
    setToastMessage(lang === "ar" ? (type === "phone" ? "تم نسخ رقم الهاتف بنجاح!" : "تم نسخ البريد الإلكتروني بنجاح!") : (type === "phone" ? "Phone number copied!" : "Email copied!"));
    setTimeout(() => setToastMessage(""), 3000);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.message) return;
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setToastMessage(lang === "ar" ? "تم إرسال طلبك بنجاح! سنتواصل معك قريباً." : "Request sent successfully! We'll contact you soon.");
        setFormData({ name: "", phone: "", message: "" });
      } else {
        setToastMessage(lang === "ar" ? "حدث خطأ أثناء الإرسال. يرجى المحاولة لاحقاً." : "Failed to send request. Please try again.");
      }
    } catch (error) {
      setToastMessage(lang === "ar" ? "حدث خطأ في الاتصال بالخادم." : "Server connection error.");
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setToastMessage(""), 5000);
    }
  };

  const t = {
    ar: {
      appName: "منظومة أقساطك", backHome: "العودة للرئيسية", tag: "تواصل مباشر — احجز عرضاً حياً",
      title: "أرِنا يوم العمل كما هو، وسنبني لك الحل.", desc: "لا نحتاج عروضاً معقدة. أخبِرنا أين تبدأ دورتك المالية اليومية، وأين تتكرر عقبات التحصيل، وسيقوم فريقنا بتهيئة عرض حي مخصص لشركتك خلال دقائق.",
      whatsappBtn: "تواصل مباشر عبر الواتساب", emailBtn: "البريد الإلكتروني الرسمي", startChat: "بدء المحادثة المباشرة الآن",
      mapTitle: "مركز عملياتنا المباشر في العراق", mapDesc: "خدماتنا السحابية تغطي كافة المحافظات العراقية مع فريق دعم مالي وفني متواجد ميدانياً في العاصمة بغداد.",
      statsResponse: "أقل من 5 دقائق", statsResponseLabel: "معدل زمن الاستجابة", statsUptime: "99.9%", statsUptimeLabel: "استقرار واستجابة النظام",
      statsCoverage: "18 محافظة", statsCoverageLabel: "تغطية شاملة لكل العراق", badgeLive: "بغداد — المقر الرئيسي",
      formTitle: "أو اترك تفاصيلك وسنتصل بك", namePH: "الاسم الكريم أو اسم الشركة", phonePH: "رقم الهاتف", msgPH: "كيف يمكننا مساعدتك؟ (تفاصيل الطلب...)", sendBtn: "إرسال الطلب الآن", sending: "جاري الإرسال..."
    },
    en: {
      appName: "Aqsatak System", backHome: "Back to Home", tag: "Direct Connect — Book a Live Demo",
      title: "Show us your workday as it is.", desc: "No long presentations required. Tell us where your daily cash flow begins and where bottlenecks occur. Our team will tailor a live interactive system preview for your team.",
      whatsappBtn: "Direct WhatsApp Contact", emailBtn: "Official Email Address", startChat: "Start Live Chat Now",
      mapTitle: "Our Live Command Center in Iraq", mapDesc: "Cloud financial infrastructure serving all Iraqi provinces with on-ground technical support based in Baghdad.",
      statsResponse: "< 5 Mins", statsResponseLabel: "Avg. Response Speed", statsUptime: "99.9%", statsUptimeLabel: "System Reliability",
      statsCoverage: "18 Provinces", statsCoverageLabel: "Nationwide Coverage", badgeLive: "Baghdad — Headquarters",
      formTitle: "Or leave your details and we'll call you", namePH: "Full Name or Company Name", phonePH: "Phone Number", msgPH: "How can we help you? (Request details...)", sendBtn: "Send Request Now", sending: "Sending..."
    }
  }[lang];

  return (
    <div className={`min-h-screen font-sans select-none overflow-x-hidden transition-colors duration-300 relative ${isDarkMode ? "bg-[#0a0a0c] text-white" : "bg-slate-50 text-slate-900"}`} dir={lang === "ar" ? "rtl" : "ltr"}>
      
      <AnimatePresence>
        {toastMessage && (
          <motion.div initial={{ opacity: 0, y: 50, scale: 0.9, x: "-50%" }} animate={{ opacity: 1, y: 0, scale: 1, x: "-50%" }} exit={{ opacity: 0, y: 20, scale: 0.9, x: "-50%" }} className={`fixed bottom-8 left-1/2 z-[100] flex items-center gap-2 px-5 py-3 rounded-full shadow-2xl backdrop-blur-md border ${isDarkMode ? "bg-emerald-500/20 border-emerald-500/30 text-emerald-400" : "bg-emerald-50 border-emerald-200 text-emerald-700"}`}>
            <CheckCircle2 className="w-5 h-5" />
            <span className="text-xs font-bold whitespace-nowrap">{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <header className={`border-b px-6 py-4 backdrop-blur-xl sticky top-0 z-50 transition-colors ${isDarkMode ? "bg-[#0a0a0c]/80 border-white/5" : "bg-white/80 border-slate-200"}`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <a href="/" className="flex items-center gap-3 group">
            <img src="/logo.png" alt="Logo" className="w-10 h-10 object-contain drop-shadow-[0_0_12px_rgba(249,115,22,0.6)] group-hover:scale-105 transition-transform" />
            <span className="text-xl font-black tracking-tight">{t.appName}</span>
          </a>
          <div className="flex items-center gap-2 md:gap-3">
            <button onClick={toggleTheme} className={`p-2.5 rounded-xl border transition-all ${isDarkMode ? "bg-white/5 border-white/10 text-amber-400 hover:bg-white/10" : "bg-slate-200/70 border-slate-300 text-indigo-600 hover:bg-slate-200"}`}>
              {isDarkMode ? <Sun strokeWidth={1.5} className="w-4 h-4" /> : <Moon strokeWidth={1.5} className="w-4 h-4" />}
            </button>
            <button onClick={toggleLang} className={`px-3 py-2 rounded-xl border text-xs font-black flex items-center gap-1.5 transition-all ${isDarkMode ? "bg-white/5 border-white/10 text-gray-300 hover:bg-white/10" : "bg-slate-200/70 border-slate-300 text-slate-800 hover:bg-slate-200"}`}>
              <Globe strokeWidth={1.5} className="w-3.5 h-3.5 text-orange-500" />
              <span>{lang === "ar" ? "EN" : "عربي"}</span>
            </button>
            <a href="/" className={`px-4 py-2.5 rounded-xl border text-xs font-bold transition-all flex items-center gap-2 ${isDarkMode ? "bg-white/5 border-white/10 hover:bg-white/10 text-white" : "bg-white border-slate-300 hover:bg-slate-100 text-slate-800 shadow-sm"}`}>
              <ArrowLeft strokeWidth={1.5} className={`w-3.5 h-3.5 ${lang === "ar" ? "rotate-180" : ""}`} />
              <span>{t.backHome}</span>
            </a>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-10 space-y-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <motion.div initial={{ opacity: 0, x: lang === "ar" ? 30 : -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }} className="lg:col-span-7 space-y-8">
            <div className="space-y-5">
              
              {/* التاج والنص المتغير */}
              <div className="flex flex-col items-start gap-3">
                <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-xs font-bold ${isDarkMode ? "bg-orange-500/10 border-orange-500/30 text-orange-400" : "bg-orange-100 border-orange-200 text-orange-700"}`}>
                  <Sparkles className="w-3.5 h-3.5 text-orange-500" />
                  <span>{t.tag}</span>
                </div>
                
                <div className="h-5 overflow-hidden">
                  <AnimatePresence mode="wait">
                    <motion.p
                      key={textIndex}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                      className={`text-sm font-bold ${isDarkMode ? "text-gray-300" : "text-slate-600"}`}
                    >
                      {lang === "ar" ? rotatingTextsAr[textIndex] : rotatingTextsEn[textIndex]}
                    </motion.p>
                  </AnimatePresence>
                </div>
              </div>

              <h1 className="text-2xl md:text-4xl font-black leading-tight tracking-tight">{t.title}</h1>
              <p className={`text-sm font-medium leading-relaxed max-w-2xl ${isDarkMode ? "text-gray-400" : "text-slate-600"}`}>{t.desc}</p>
              
              <div className="grid grid-cols-3 gap-3 pt-2">
                <div className={`p-4 rounded-xl border text-center space-y-1.5 ${isDarkMode ? "bg-white/[0.02] border-white/10" : "bg-white border-slate-200 shadow-sm"}`}>
                  <Clock strokeWidth={1.5} className={`w-5 h-5 mx-auto ${isDarkMode ? "text-white" : "text-slate-900"}`} />
                  <span className="text-sm font-black block">{t.statsResponse}</span>
                  <span className="text-[10px] text-gray-400 block font-bold">{t.statsResponseLabel}</span>
                </div>
                <div className={`p-4 rounded-xl border text-center space-y-1.5 ${isDarkMode ? "bg-white/[0.02] border-white/10" : "bg-white border-slate-200 shadow-sm"}`}>
                  <Zap strokeWidth={1.5} className={`w-5 h-5 mx-auto ${isDarkMode ? "text-white" : "text-slate-900"}`} />
                  <span className="text-sm font-black block">{t.statsUptime}</span>
                  <span className="text-[10px] text-gray-400 block font-bold">{t.statsUptimeLabel}</span>
                </div>
                <div className={`p-4 rounded-xl border text-center space-y-1.5 ${isDarkMode ? "bg-white/[0.02] border-white/10" : "bg-white border-slate-200 shadow-sm"}`}>
                  <Building2 strokeWidth={1.5} className={`w-5 h-5 mx-auto ${isDarkMode ? "text-white" : "text-slate-900"}`} />
                  <span className="text-sm font-black block">{t.statsCoverage}</span>
                  <span className="text-[10px] text-gray-400 block font-bold">{t.statsCoverageLabel}</span>
                </div>
              </div>
            </div>

            <form onSubmit={handleFormSubmit} className={`p-5 md:p-6 rounded-2xl border shadow-sm relative space-y-4 ${isDarkMode ? "bg-[#111116] border-white/10" : "bg-white border-slate-200"}`}>
              <h3 className="text-base font-black flex items-center gap-2 border-b pb-3 border-white/10">
                <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                {t.formTitle}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <input type="text" required placeholder={t.namePH} value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className={`w-full px-4 py-3 rounded-xl border text-xs font-bold outline-none transition-all ${isDarkMode ? "bg-[#0d0d12] border-white/10 focus:border-orange-500 text-white placeholder:text-gray-500" : "bg-slate-50 border-slate-200 focus:border-orange-400 text-slate-900 placeholder:text-slate-400"}`} />
                <input type="tel" required placeholder={t.phonePH} value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} className={`w-full px-4 py-3 rounded-xl border text-xs font-bold outline-none transition-all font-mono text-right ${isDarkMode ? "bg-[#0d0d12] border-white/10 focus:border-orange-500 text-white placeholder:text-gray-500" : "bg-slate-50 border-slate-200 focus:border-orange-400 text-slate-900 placeholder:text-slate-400"}`} dir="ltr" />
              </div>
              <textarea required rows={3} placeholder={t.msgPH} value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})} className={`w-full px-4 py-3 rounded-xl border text-xs font-bold outline-none transition-all resize-none ${isDarkMode ? "bg-[#0d0d12] border-white/10 focus:border-orange-500 text-white placeholder:text-gray-500" : "bg-slate-50 border-slate-200 focus:border-orange-400 text-slate-900 placeholder:text-slate-400"}`} />
              <button type="submit" disabled={isSubmitting} className="w-full md:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 hover:opacity-95 text-white font-black text-xs text-center shadow-sm transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed mr-auto">
                {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send strokeWidth={1.5} className={`w-4 h-4 ${lang === "ar" ? "rotate-180" : ""}`} />}
                <span>{isSubmitting ? t.sending : t.sendBtn}</span>
              </button>
            </form>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: 0.1 }} className="lg:col-span-5 space-y-5 sticky top-24">
            
            {/* بطاقة قنوات التواصل */}
            <div className={`rounded-2xl p-5 md:p-6 border shadow-sm space-y-5 ${isDarkMode ? "bg-[#111116] border-white/10" : "bg-white border-slate-200"}`}>
              <div className="flex items-center justify-between border-b pb-3 border-white/10">
                <div>
                  <span className="text-[10px] font-black uppercase text-orange-500 tracking-wider block">{lang === "ar" ? "قنوات التواصل المباشر" : "Direct Channels"}</span>
                  <h2 className="text-lg font-black">{lang === "ar" ? "تواصل مباشر فوراً" : "Connect Instantly"}</h2>
                </div>
                <Headphones strokeWidth={1.5} className={`w-5 h-5 ${isDarkMode ? "text-white" : "text-slate-900"}`} />
              </div>
              <div className="space-y-3">
                <a href={`https://wa.me/${CONTACT_PHONE_RAW}?text=${encodeURIComponent("مرحباً، أود حجز عرض حي وتجربة منظومة أقساطك")}`} target="_blank" rel="noreferrer" className={`p-4 rounded-xl border transition-all flex items-center justify-between group ${isDarkMode ? "bg-[#0d0d12] border-white/10 hover:border-white/30 hover:bg-white/5" : "bg-slate-50 border-slate-200 hover:border-slate-400 hover:bg-slate-100"}`}>
                  <div className="space-y-1">
                    <span className={`text-xs font-bold flex items-center gap-1.5 ${isDarkMode ? "text-gray-300" : "text-slate-700"}`}><MessageSquare strokeWidth={1.5} className={`w-4 h-4 ${isDarkMode ? "text-white" : "text-slate-900"}`} /> {t.whatsappBtn}</span>
                    <p className="font-mono font-bold text-base pt-1 tracking-wider" dir="ltr">{CONTACT_PHONE}</p>
                  </div>
                  <button onClick={(e) => copyToClipboard(e, CONTACT_PHONE, "phone")} className={`p-2.5 rounded-lg border transition-all ${isDarkMode ? "bg-white/5 border-white/10 hover:bg-white/10 text-white" : "bg-white border-slate-200 hover:bg-slate-200 text-slate-900 shadow-sm"}`} title={lang === "ar" ? "نسخ الرقم" : "Copy number"}>
                    <Copy strokeWidth={1.5} className="w-4 h-4" />
                  </button>
                </a>
                <a href={`mailto:${CONTACT_EMAIL}`} className={`p-4 rounded-xl border transition-all flex items-center justify-between group ${isDarkMode ? "bg-[#0d0d12] border-white/10 hover:border-white/30 hover:bg-white/5" : "bg-slate-50 border-slate-200 hover:border-slate-400 hover:bg-slate-100"}`}>
                  <div className="space-y-1">
                    <span className={`text-xs font-bold flex items-center gap-1.5 ${isDarkMode ? "text-gray-300" : "text-slate-700"}`}><Mail strokeWidth={1.5} className={`w-4 h-4 ${isDarkMode ? "text-white" : "text-slate-900"}`} /> {t.emailBtn}</span>
                    <p className="font-mono font-bold text-sm pt-1 tracking-wider" dir="ltr">{CONTACT_EMAIL}</p>
                  </div>
                  <button onClick={(e) => copyToClipboard(e, CONTACT_EMAIL, "email")} className={`p-2.5 rounded-lg border transition-all ${isDarkMode ? "bg-white/5 border-white/10 hover:bg-white/10 text-white" : "bg-white border-slate-200 hover:bg-slate-200 text-slate-900 shadow-sm"}`} title={lang === "ar" ? "نسخ البريد" : "Copy email"}>
                    <Copy strokeWidth={1.5} className="w-4 h-4" />
                  </button>
                </a>
              </div>
            </div>

           {/* بطاقة الموقع والعميل */}
<div className={`rounded-2xl p-6 md:p-8 border transition-all space-y-4 ${isDarkMode ? "bg-[#111116] border-white/10" : "bg-slate-50 border-slate-200"}`}>
  <h4 className="font-black text-xl md:text-2xl text-orange-500">
    {lang === "ar" ? "شراكة مبنية على الثقة" : "Partnership Built on Trust"}
  </h4>
  <p className={`text-base leading-loose font-bold ${isDarkMode ? "text-gray-300" : "text-slate-700"}`}>
    {lang === "ar" 
      ? "أسرع خدمة سحابية ومحلية للإدارة المالية في العراق. في منظومة أقساطك، نؤمن بأن أتمتة عملياتك وإدارة سيولتك النقدية هو جوهر عملنا. نلتزم بتقديم حلول تقنية مبتكرة وآمنة تلبي احتياجاتك بدقة، لنبني معاً شراكة استراتيجية تضمن نمو أعمالك وتطورها المستدام بكفاءة عالية."
      : "The fastest cloud and local financial management service in Iraq. At Aqsatak, automating your operations and managing cash flow is our core mission. We deliver innovative, secure tech solutions tailored to your needs, building a strategic partnership that ensures sustainable, high-efficiency business growth."}
  </p>
</div>

          </motion.div>
        </div>

        {/* قسم الخريطة */}
        <div className={`rounded-2xl border p-6 md:p-8 relative overflow-hidden backdrop-blur-2xl ${isDarkMode ? "bg-[#111116]/80 border-white/10" : "bg-white border-slate-200 shadow-sm"}`}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-5 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-xs font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                <span>{t.badgeLive}</span>
              </div>
              <h3 className="text-xl md:text-2xl font-black tracking-tight">{t.mapTitle}</h3>
              <p className={`text-xs md:text-sm leading-relaxed font-medium ${isDarkMode ? "text-gray-400" : "text-slate-600"}`}>{t.mapDesc}</p>
              <div className="space-y-3 pt-2 text-xs font-bold">
                <div className="flex items-center gap-2.5">
                  <MapPin strokeWidth={1.5} className={`w-4 h-4 ${isDarkMode ? "text-white" : "text-slate-900"}`} />
                  <span>{lang === "ar" ? LOCATION_AR : LOCATION_EN}</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <PhoneCall strokeWidth={1.5} className={`w-4 h-4 ${isDarkMode ? "text-white" : "text-slate-900"}`} />
                  <span className="font-mono" dir="ltr">{CONTACT_PHONE}</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <ShieldCheck strokeWidth={1.5} className={`w-4 h-4 ${isDarkMode ? "text-white" : "text-slate-900"}`} />
                  <span>{lang === "ar" ? "سيرفرات فائقة السرعة بتشفير 256-bit" : "Ultra-Fast Servers with 256-bit Encryption"}</span>
                </div>
              </div>
            </div>

            <div className={`lg:col-span-7 relative h-72 md:h-80 flex items-center justify-center rounded-xl border p-4 overflow-hidden ${isDarkMode ? "bg-black/40 border-white/5" : "bg-slate-50 border-slate-200"}`}>
              <div className={`absolute inset-0 [background-size:24px_24px] opacity-20 ${isDarkMode ? "bg-[radial-gradient(#f97316_1px,transparent_1px)]" : "bg-[radial-gradient(#94a3b8_1px,transparent_1px)]"}`} />
              
              <div className="relative z-10 w-full h-full flex items-center justify-center">
                <IraqMap isDarkMode={isDarkMode} className="max-h-[300px]" />
              </div>

              <div className={`absolute bottom-3 right-3 text-[10px] font-bold px-3 py-1 rounded-full border backdrop-blur-md z-20 ${isDarkMode ? "text-gray-400 bg-black/40 border-white/10" : "text-slate-500 bg-white/60 border-slate-200 shadow-sm"}`}>
                GPS: 33.3152° N, 44.3661° E
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className={`border-t py-6 px-6 text-xs text-center font-medium ${isDarkMode ? "border-white/5 bg-black text-gray-500" : "border-slate-200 bg-slate-100 text-slate-600"}`}>
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>جميع الحقوق محفوظة © 2026 AQSATAK FINANCIAL SYSTEMS — بغداد، العراق 🇮🇶</p>
          <div className="flex items-center gap-4 font-bold">
            <a href="/" className="hover:text-orange-500 transition-colors">{t.backHome}</a>
            <a href={`https://wa.me/${CONTACT_PHONE_RAW}`} target="_blank" rel="noreferrer" className="hover:text-orange-500 transition-colors">الدعم الفني المباشر</a>
          </div>
        </div>
      </footer>
    </div>
  );
}