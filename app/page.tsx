"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../services/firebase";
import CustomerManagementMockup from "@/components/CustomerManagementMockup";
import SettingsManagementMockup from "@/components/SettingsManagementMockup";
import PrintTemplatesMockup from "@/components/PrintTemplatesMockup";

import { 
  ArrowLeft, 
  CheckCircle2, 
  MessageSquare, 
  Clock, 
  Sparkles,
  Vault,
  Search,
  Loader2,
  AlertCircle,
  Sun,
  Moon,
  Globe,
  Users,
  Coins,
  Activity,
  Plus,
  ArrowUpRight,
  CalendarRange,
  Receipt,
  Printer,
  BarChart3,
  BellRing,
  Lock,
  Smartphone,
  Zap,
  Crown,
  X,
  CreditCard,
  Copy,
  Check,
  Mail,
  MapPin,
  ExternalLink,
  PhoneCall,
  Building2,
  ShieldCheck,
  ChevronDown,
  HelpCircle,
  MonitorDown 
} from "lucide-react";

function PromoVideoSection({ isDarkMode, lang }: { isDarkMode: boolean; lang: "ar" | "en" }) {
  return (
    <motion.section 
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
      className="py-12 px-4 md:px-6 relative z-20"
    >
      <div className="max-w-5xl mx-auto space-y-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center space-y-2"
        >
        <h2 className="text-xl md:text-2xl lg:text-2xl font-medium leading-loose tracking-wide opacity-90 max-w-5xl mx-auto">
            {lang === "ar"
              ? "حيث خُطّ أول حرف وأول رقم في بلاد الرافدين، نستكمل مسيرة الريادة بمنظومة مالية ذكية ترتقي بأعمالك نحو المستقبل." 
              : "Watch the Story: Financial Precision Heritage"}
          </h2>
          
          <div 
            className="text-3xl md:text-2xl lg:text-2xl text-orange-500 mt-6 mb-4 drop-shadow-[0_0_15px_rgba(249,115,22,0.6)] flex justify-center gap-4 md:gap-6 flex-wrap" 
            dir="ltr"
          >
            {["𒆠", "𒂗", "𒄀", "𒀀", "𒁾", "𒊬", "𒀭", "𒈾", "𒂍", "𒃲"].map((char, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, scale: 0.8, filter: "blur(5px)" }}
                animate={{ 
                  opacity: [0, 1, 1, 0], 
                  scale: [0.8, 1, 1, 0.8], 
                  filter: ["blur(5px)", "blur(0px)", "blur(0px)", "blur(5px)"] 
                }}
                transition={{ 
                  duration: 4, 
                  repeat: Infinity, 
                  ease: "easeInOut",
                  delay: index * 0.1, 
                  times: [0, 0.1, 0.8, 1] 
                }}
                className="inline-block"
              >
                {char}
              </motion.span>
            ))}
          </div>
        </motion.div>

        <motion.div 
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className={`p-3 md:p-4 rounded-3xl border shadow-2xl relative overflow-hidden backdrop-blur-2xl ${
            isDarkMode 
              ? "bg-[#111116]/90 border-orange-500/30 shadow-orange-500/20" 
              : "bg-white border-slate-300 shadow-slate-300"
          }`}
        >
          <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-black group border border-white/10">
            <video
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              controls
              autoPlay
              muted
              loop
              playsInline
              poster="/logo.png"
            >
              <source src="/heritage-transformation.mp4" type="video/mp4" />
              {lang === "ar" ? "متصفحك لا يدعم تشغيل هذا الفيديو." : "Your browser does not support HTML5 video."}
            </video>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}

export default function LandingPage() {
  const [lookupEmail, setLookupEmail] = useState("");
  const [lookupResult, setLookupResult] = useState<any>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState("");

  const [isDarkMode, setIsDarkMode] = useState(true);
  const [lang, setLang] = useState<"ar" | "en">("ar");
  const [currentYear, setCurrentYear] = useState(2026);

  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  const [selectedPlan, setSelectedPlan] = useState<{ title: string; price: string } | null>(null);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const CONTACT_PHONE = "+9647838338499";
  const CONTACT_PHONE_RAW = "9647838338499";
  const CONTACT_EMAIL = "info@aqsatak.com";
  const LOCATION_AR = "بغداد، العراق";
  const LOCATION_EN = "Baghdad, Iraq";

  const PAY_ZAINCASH = "07838338499"; 
  const PAY_SUPER_QI = "07838338499";

  const typingPhrasesAr = [
    "دع فريقك يركز على العميل.. لا على تعقيد الشاشات",
    "استلم مدفوعاتك وأقساطك بنقرة زر واحدة",
    "أرسل تنبيهات الواتساب التلقائية قبل موعد الاستحقاق",
    "تابع حركة الخزينة وأرباح المحل لحظة بلحظة"
  ];

  const typingPhrasesEn = [
    "Keep your team focused on customers, not complex screens",
    "Collect installments & payments with a single click",
    "Send automated WhatsApp reminders before due dates",
    "Track treasury flow and net profits in real-time"
  ];

  const [phraseIndex, setPhraseIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setPhraseIndex((prev) => (prev + 1) % typingPhrasesAr.length);
    }, 3500);
    return () => clearInterval(timer);
  }, [typingPhrasesAr.length]);

  const APP_LOGIN_URL = "http://localhost:3000/login"; 

  const toggleTheme = () => setIsDarkMode(!isDarkMode);
  const toggleLang = () => setLang(lang === "ar" ? "en" : "ar");

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleLookup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!lookupEmail.trim()) return;

    setIsSearching(true);
    setSearchError("");
    setLookupResult(null);

    try {
      const cleanEmail = lookupEmail.trim().toLowerCase();

      const q = query(collection(db, "users"), where("email", "==", cleanEmail));
      const querySnap = await getDocs(q);

      if (!querySnap.empty) {
        const data = querySnap.docs[0].data();
        let formattedDate = lang === "ar" ? "غير محدد" : "N/A";

        if (data.subscription && data.subscription.endDate) {
          const rawDate = data.subscription.endDate;
          const parsedDate = new Date(rawDate);
          if (!isNaN(parsedDate.getTime())) {
            formattedDate = parsedDate.toLocaleDateString(lang === "ar" ? "ar-IQ" : "en-US");
          } else {
            formattedDate = String(rawDate).split("T")[0];
          }
        }

        setLookupResult({
          email: data.email || cleanEmail,
          companyName: data.companyName || "",
          status: (data.status === "active" || data.subscription?.isActive) 
            ? (lang === "ar" ? "نشط" : "Active") 
            : (lang === "ar" ? "غير نشط / قيد الانتظار" : "Inactive / Pending"),
          type: data.subscription?.period 
            ? (data.subscription.period === "monthly" ? (lang === "ar" ? "اشتراك شهري" : "Monthly") : (lang === "ar" ? "اشتراك سنوي" : "Yearly"))
            : (lang === "ar" ? "الباقة الاحترافية" : "Pro Plan"),
          expiresAt: formattedDate,
        });
      } else {
        setSearchError(lang === "ar" ? "لم يتم العثور على حساب مرتبط بهذا البريد الإلكتروني." : "No account found for this email address.");
      }
    } catch (err) {
      console.error(err);
      setSearchError(lang === "ar" ? "تعذر الاستعلام في الوقت الحالي. يرجى التأكد من البريد والمحاولة لاحقاً." : "Unable to fetch account details.");
    } finally {
      setIsSearching(false);
    }
  };

  const t = {
    ar: {
      appName: "منظومة أقساطك",
      navFeatures: "المميزات",
      navDashboard: "معاينة المنظومة",
      navPricing: "الاشتراكات",
      navFaq: "الأسئلة الشائعة",
      navLookup: "فحص الحساب",
      navAbout: "عن المنظومة",
      login: "تسجيل الدخول",
      bookDemo: "احجز عرضاً",
      contact: "تواصل معنا",
      heroDesc: "أدِر عقود الأقساط، سجل المدفوعات، حركات الصندوق والمخزن، وتنبيهات الواتساب التلقائية للعملاء من شاشة واحدة مصممة لسرعة وسلاسة العمل اليومي.",
      enterApp: "دخول المنظومة المالية",
      demoRequest: "طلب تجربة حية",
      featuresTag: "قدرات المنظومة المالية",
      featuresTitle: "كل ما تحتاجه لإدارة مكتبك أو شركتك في نظام واحد",
      featuresDesc: "تم تصميم المنظومة لتغطي كافة التفاصيل الحسابية والتنظيمية بدقة وسرعة فائقة.",
      faqTag: "إجابات سريعة",
      faqTitle: "الأسئلة الشائعة حول المنظومة",
      pricingTag: "خطط الاشتراكات الشفافة",
      pricingTitle: "اختر الباقة المناسبة لحجم أعمالك اليومية",
      lookupTitle: "بوابة الاستعلام السريع عن الاشتراك",
      lookupDesc: "أدخل البريد الإلكتروني الخاص بشركتك لمعرفة حالة الاشتراك وتاريخ التجديد",
      lookupBtn: "فحص الحساب",
      rights: `جميع الحقوق محفوظة © ${currentYear} AQSATAK FINANCIAL SYSTEMS — صُمم وصُنع بأيدٍ عراقية 🇮🇶`,
      support: "الدعم الفني",
      aboutTitle: "عن المنظومة",
      aboutDesc: "أقساطك هي المنصة السحابية الرائدة في العراق لإدارة الأقساط والديون، حيث تمكّن الشركات والأعمال من خلال أتمتة مسارات العمل، والتتبع اللحظي لحركة الخزينة والصندوق، والتنبيهات المباشرة للعملاء عبر الواتساب."
    },
    en: {
      appName: "Aqsatak System",
      navFeatures: "Features",
      navDashboard: "Preview",
      navPricing: "Pricing",
      navFaq: "FAQ",
      navLookup: "Lookup",
      navAbout: "About Us",
      login: "Login",
      bookDemo: "Book a Demo",
      contact: "Contact Us",
      badge: "The Premier Installment & Debt Management System in Iraq",
      heroDesc: "Manage installment contracts, payment logs, treasury & inventory movements, and automated WhatsApp notifications from one seamless interface.",
      enterApp: "Enter Financial System",
      demoRequest: "Request Live Demo",
      featuresTag: "Comprehensive Capabilities",
      featuresTitle: "Everything required to manage your company in one platform",
      featuresDesc: "Built specifically to streamline daily financial transactions with speed and accuracy.",
      faqTag: "Quick Answers",
      faqTitle: "Frequently Asked Questions",
      pricingTag: "Transparent Pricing Plans",
      pricingTitle: "Choose the right plan tailored to your business scale",
      lookupTitle: "Quick Subscription Status Portal",
      lookupDesc: "Enter your company email address to inspect subscription status and expiry date",
      lookupBtn: "Check Account",
      rights: `All rights reserved © ${currentYear} AQSATAK FINANCIAL SYSTEMS — Built in Iraq 🇮🇶`,
      support: "Technical Support",
      aboutTitle: "About Aqsatak Financial Systems",
      aboutDesc: "AQSATAK is Iraq's leading cloud-based installment and debt management platform, empowering businesses with automated workflows, real-time treasury tracking, and instant WhatsApp customer alerts."
    }
  }[lang];

  const faqs = [
    {
      q: "هل تحتاج المنظومة إلى تنصيب برامج على الكمبيوتر؟",
      a: "لا، المنظومة سحابية بالكامل (Cloud-based). يمكنك فتحها والعمل عليها مباشرة من أجهزة الكمبيوتر، الموبايل، أو الآيباد عبر المتصفح وبدون تنصيب أي برنامج."
    },
    {
      q: "كيف يتم طباعة وصولات السداد والعقود الرسمية؟",
      a: "يدعم النظام كافة الطابعات الحرارية المباشرة (قياس 58mm و 80mm) لإيصالات القبض، كما يدعم طابعات الـ A4 العادية لطباعة عقود البيع والالتزام المالي مع شعار مكتبك."
    },
    {
      q: "هل بياناتي وأقساط عملاؤتي محمية من الضياع؟",
      a: "نعم 100%. يتم إجراء نسخ احتياطي سحابي أوتوماتيكي ومشفّر (256-bit) مع Google Drive وسيرفراتنا المحمية، حتى لو تعطل جهازك ستجد كافة بياناتك كما هي عند تسجيل الدخول من جهاز آخر."
    },
    {
      q: "كيف تعمل خدمة إشعارات وتنبيهات الواتساب المباشرة؟",
      a: "يرسل النظام إشعارات تلقائية للزبائن لتذكيرهم بموعد استحقاق القسط القادم، وإشعار استلام رسمي فور قبض الدفعات بدون الحاجة لإرسالها يدوياً."
    }
  ];

  const allFeatures = [
    {
      icon: Users,
      title: lang === "ar" ? "إدارة العملاء والكفلاء" : "Customer & Guarantor Logs",
      desc: lang === "ar" ? "سجل كامـل للعميل والكفيل مع حظره تلقائياً عند تأخر السداد وأرشيف المستمسكات." : "Comprehensive profile logs with automated block rules and document archiving."
    },
    {
      icon: Receipt,
      title: lang === "ar" ? "جدولة الأقساط والديون" : "Flexible Installment Schedules",
      desc: lang === "ar" ? "تقسيم المبالغ إلى دفعات شهرية أو أسبوعية بنقرة زر مع حساب الفوائد والنسب بمرونة." : "Automated monthly/weekly payment splits with flexible interest calculations."
    },
    {
      icon: BellRing,
      title: lang === "ar" ? "تنبيهات الواتساب التلقائية" : "Automated WhatsApp Alerts",
      desc: lang === "ar" ? "إرسال إشعارات التذكير قبل موعد الاستحقاق وبعده مع روابط الدفع المباشرة للزبون." : "Automatic pre/post due date notifications with direct payment reference links."
    },
    {
      icon: Vault,
      title: lang === "ar" ? "إدارة الخزينة والصندوق" : "Treasury & Cash Management",
      desc: lang === "ar" ? "متابعة المقبوضات والمصروفات اليومية ومطابقة صندوق المحل لحظة بظة." : "Track daily cash flow, expenses, and reconcile local registers in real time."
    },
    {
      icon: Printer,
      title: lang === "ar" ? "طباعة العقود والوصولات" : "Thermal Receipts & Contracts",
      desc: lang === "ar" ? "دعم الطباعة الحرارية (58mm/80mm) وعقود البيع الرسمية مع الشعار الخاص بمكتبك." : "Support for thermal receipts and official formatted contracts with custom branding."
    },
    {
      icon: BarChart3,
      title: lang === "ar" ? "تقارير مالية وتحليلات حية" : "Live Financial Analytics",
      desc: lang === "ar" ? "إحصائيات بالأرباح المتوقعة، الأقساط المتأخرة، وإجمالي الديون المتبقية بأسلوب بياني." : "Charts showing projected profits, overdue debts, and active portfolio totals."
    },
    {
      icon: Lock,
      title: lang === "ar" ? "نظام صلاحيات الموظفين" : "Role Permissions & Security",
      desc: lang === "ar" ? "إعطاء كل موظف صلاحيات محددة (إضافة، قبض، تعديل) مع حماية حركات الصندوق." : "Granular employee access rights with security logging for cash operations."
    },
    {
      icon: Smartphone,
      title: lang === "ar" ? "استجابة لكافة الأجهزة" : "Multi-Device Compatibility",
      desc: lang === "ar" ? "العمل بسلاسة من الكمبيوتر، الموبايل، أو الآيباد بدون الحاجة لتنصيب برامج." : "Seamless execution on desktops, tablets, and phones with zero installation."
    }
  ];

  return (
    <div className={`min-h-screen font-sans select-none overflow-x-hidden transition-colors duration-300 ${
      isDarkMode ? "bg-[#0a0a0c] text-white" : "bg-slate-50 text-slate-900"
    }`} dir={lang === "ar" ? "rtl" : "ltr"}>

      {/* 1. الترويسة العلوية */}
      <header className={`sticky top-0 z-50 backdrop-blur-xl border-b px-6 py-4 transition-colors ${
        isDarkMode ? "bg-[#0a0a0c]/80 border-white/5" : "bg-white/80 border-slate-200"
      }`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 flex items-center justify-center relative">
              <img 
                src="/logo.png" 
                alt="Logo" 
                className="w-10 h-10 object-contain drop-shadow-[0_0_12px_rgba(249,115,22,0.6)]" 
              />
            </div>
            <span className="text-xl font-black tracking-tight">{t.appName}</span>
          </div>

          <nav className={`hidden md:flex items-center gap-6 text-xs font-bold ${isDarkMode ? "text-gray-400" : "text-slate-600"}`}>
            <a href="#dashboard" className="hover:text-orange-500 transition-colors">{t.navDashboard}</a>
            <a href="#features" className="hover:text-orange-500 transition-colors">{t.navFeatures}</a>
            <a href="#pricing" className="hover:text-orange-500 transition-colors">{t.navPricing}</a>
            <a href="#faq" className="hover:text-orange-500 transition-colors">{t.navFaq}</a>
            <a href="#about" className="hover:text-orange-500 transition-colors">{t.navAbout}</a>
            <a href="#lookup" className="hover:text-orange-500 transition-colors">{t.navLookup}</a>
          </nav>

          <div className="flex items-center gap-2 md:gap-3">
            <button
              onClick={toggleTheme}
              className={`p-2.5 rounded-2xl border transition-all ${
                isDarkMode 
                  ? "bg-white/5 border-white/10 text-amber-400 hover:bg-white/10" 
                  : "bg-slate-200/70 border-slate-300 text-indigo-600 hover:bg-slate-200"
              }`}
            >
              {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            <button
              onClick={toggleLang}
              className={`px-3 py-2 rounded-2xl border text-xs font-black flex items-center gap-1.5 transition-all ${
                isDarkMode 
                  ? "bg-white/5 border-white/10 text-gray-300 hover:bg-white/10" 
                  : "bg-slate-200/70 border-slate-300 text-slate-800 hover:bg-slate-200"
              }`}
            >
              <Globe className="w-3.5 h-3.5 text-orange-500" />
              <span>{lang === "ar" ? "EN" : "عربي"}</span>
            </button>

          {/* زر تحميل التطبيق لنسخة الحاسوب */}
<a 
  href="/Setup.1.0.6.exe" 
  download
  className="hidden md:flex px-4 py-2.5 rounded-2xl bg-gradient-to-r from-orange-500 to-red-500 hover:opacity-90 text-white font-black text-xs transition-all shadow-lg shadow-orange-500/20 items-center gap-2"
>
  <MonitorDown className="w-4 h-4" />
  <span>{lang === "ar" ? "نسخة الحاسوب" : "PC Version"}</span>
</a>

            <a 
              href={APP_LOGIN_URL} 
              className={`hidden sm:inline-block px-4 py-2.5 rounded-2xl text-xs font-bold border transition-all ${
                isDarkMode 
                  ? "bg-white/5 border-white/10 hover:bg-white/10 text-white" 
                  : "bg-slate-100 border-slate-300 hover:bg-slate-200 text-slate-900"
              }`}
            >
              {t.login}
            </a>

            <a 
              href="/contact"
              className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-orange-500 to-red-500 hover:opacity-90 text-white font-black text-xs transition-all shadow-lg shadow-orange-500/20 flex items-center gap-1.5"
            >
              <span>{t.bookDemo}</span>
              <ArrowLeft className={`w-3.5 h-3.5 ${lang === "en" ? "rotate-180" : ""}`} />
            </a>
          </div>
        </div>
      </header>

      {/* 2. الهيرو التسويقي */}
      <section className="relative pt-16 pb-4 px-6 overflow-hidden">
        <div className="max-w-5xl mx-auto text-center space-y-8 relative z-10">
          
          <div className="h-28 md:h-32 flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.h1 
                key={phraseIndex}
                initial={{ opacity: 0, y: 15, filter: "blur(4px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -15, filter: "blur(4px)" }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="text-3xl md:text-5xl font-black leading-tight tracking-tight max-w-4xl"
              >
                <span className="bg-gradient-to-r from-orange-400 via-rose-500 to-red-500 bg-clip-text text-transparent">
                  {lang === "ar" ? typingPhrasesAr[phraseIndex] : typingPhrasesEn[phraseIndex]}
                </span>
              </motion.h1>
            </AnimatePresence>
          </div>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className={`text-sm md:text-base max-w-2xl mx-auto font-medium leading-relaxed ${
              isDarkMode ? "text-gray-400" : "text-slate-600"
            }`}
          >
            {t.heroDesc}
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2"
          >
            <a 
              href={APP_LOGIN_URL}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-orange-500 to-red-500 hover:opacity-95 text-white font-black text-sm shadow-xl shadow-orange-500/25 transition-all flex items-center justify-center gap-2"
            >
              <span>{t.enterApp}</span>
              <ArrowLeft className={`w-4 h-4 ${lang === "en" ? "rotate-180" : ""}`} />
            </a>

            <a 
              href="/contact"
              className={`w-full sm:w-auto px-8 py-4 rounded-2xl font-bold text-sm border transition-all flex items-center justify-center gap-2 ${
                isDarkMode 
                  ? "bg-white/5 hover:bg-white/10 text-white border-white/10" 
                  : "bg-white hover:bg-slate-100 text-slate-800 border-slate-300 shadow-sm"
              }`}
            >
              <MessageSquare className="w-4 h-4 text-emerald-500" />
              <span>{t.demoRequest}</span>
            </a>
          </motion.div>
        </div>
      </section>
      
      {/* 2.5. قسم الفيديو السينمائي يظهر مباشرة بعد الهيرو */}
      <PromoVideoSection isDarkMode={isDarkMode} lang={lang} />

      {/* 3. المعاينة التفاعلية */}
      <section id="dashboard" className="py-12 px-4 md:px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className={`rounded-3xl border p-4 md:p-8 shadow-2xl relative overflow-hidden backdrop-blur-2xl ${
              isDarkMode 
                ? "bg-[#111116]/90 border-white/10 shadow-orange-500/5" 
                : "bg-white border-slate-200 shadow-slate-200"
            }`}
          >
            <div className="flex items-center justify-between border-b pb-4 mb-6 border-white/10">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-rose-500 inline-block" />
                <span className="w-3 h-3 rounded-full bg-amber-500 inline-block" />
                <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block" />
                <span className={`text-[10px] font-mono px-3 py-1 rounded-full border ml-2 ${
                  isDarkMode ? "bg-white/5 border-white/10 text-gray-400" : "bg-slate-100 border-slate-200 text-slate-500"
                }`}>app.aqsatak.com/dashboard</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[10px] font-black text-emerald-400">{lang === "ar" ? "نظام الأقساط مباشر" : "Live System"}</span>
              </div>
            </div>

            <div className="space-y-6 text-right">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h3 className="text-xl md:text-2xl font-black tracking-tight flex items-center gap-2">
                    <span>{lang === "ar" ? "صباح الخير، شركة النور" : "Good Morning, Al-Noor Co."}</span>
                    <span className="animate-bounce">☀️</span>
                  </h3>
                  <p className="text-xs text-gray-400 font-bold mt-1">
                    {lang === "ar" ? "تابع حركة أقساطك وأرباحك وبدء يومك المالي بكل ذكاء وسلاسة." : "Track installment movements, profit margin, and treasury."}
                  </p>
                </div>

                <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-white/5 border border-white/10">
                  <Activity className="w-4 h-4 text-emerald-500" />
                  <div>
                    <span className="text-[10px] text-gray-400 font-bold block">{lang === "ar" ? "كفاءة التحصيل" : "Efficiency"}</span>
                    <span className="text-sm font-black text-emerald-400">96%</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
                <motion.div 
                  whileHover={{ scale: 1.01 }}
                  className="lg:col-span-5 bg-white/[0.03] border border-white/10 rounded-3xl p-6 flex flex-col justify-between relative"
                >
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-bold text-gray-400">{lang === "ar" ? "إجمالي الديون بالسوق (الرصيد النشط)" : "Total Remaining Debt"}</span>
                      <span className="text-[10px] font-black px-2.5 py-1 bg-orange-500/10 text-orange-400 rounded-full border border-orange-500/20">IQD</span>
                    </div>

                    <div className="space-y-1">
                      <h4 className="text-3xl font-black text-white tracking-tight">142,850,000 د.ع</h4>
                      <p className="text-[11px] text-emerald-400 font-bold flex items-center gap-1 pt-1">
                        <ArrowUpRight className="w-3.5 h-3.5" /> +96% {lang === "ar" ? "معدل الاسترداد المالي" : "Recovery Rate"}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 pt-2">
                      <div className="flex-1 py-2.5 bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 shadow-md shadow-orange-500/20">
                        <Plus className="w-3.5 h-3.5" /> {lang === "ar" ? "إضافة عقد جديد" : "New Contract"}
                      </div>
                      <div className="flex-1 py-2.5 bg-white/5 border border-white/10 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5">
                        <Coins className="w-3.5 h-3.5 text-orange-400" /> {lang === "ar" ? "استلام دفعة" : "Receive Payment"}
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-white/10 grid grid-cols-2 gap-3 text-xs">
                    <div>
                      <span className="text-gray-400 block text-[10px]">{lang === "ar" ? "رأس المال المسترد" : "Capital Retained"}</span>
                      <span className="font-bold text-white text-sm">118,200,000 د.ع</span>
                    </div>
                    <div>
                      <span className="text-gray-400 block text-[10px]">{lang === "ar" ? "الأرباح المحققة" : "Profits Retained"}</span>
                      <span className="font-bold text-orange-400 text-sm">24,650,000 د.ع</span>
                    </div>
                  </div>
                </motion.div>

                <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-gradient-to-br from-orange-500 to-red-500 text-white p-5 rounded-3xl shadow-lg shadow-orange-500/20 flex flex-col justify-between">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-bold opacity-90">{lang === "ar" ? "الوارد اليومي المتوقع" : "Expected Daily Income"}</span>
                      <Clock className="w-4 h-4 opacity-80" />
                    </div>
                    <div className="my-2">
                      <h4 className="text-2xl font-black">2,450,000 د.ع</h4>
                    </div>
                    <div className="bg-white/10 backdrop-blur-md px-3 py-1 rounded-xl text-[10px] font-bold flex items-center justify-between">
                      <span>{lang === "ar" ? "أقساط اليوم النشطة" : "Active Daily Rules"}</span>
                      <span>100%</span>
                    </div>
                  </div>

                  <div className="bg-white/[0.03] border border-white/10 p-5 rounded-3xl flex flex-col justify-between">
                    <div className="flex justify-between items-center text-gray-400">
                      <span className="text-xs font-bold">{lang === "ar" ? "الوارد الشهري المتوقع" : "Expected Monthly Income"}</span>
                      <CalendarRange className="w-4 h-4 text-purple-400" />
                    </div>
                    <div className="my-2">
                      <h4 className="text-2xl font-black text-white">38,900,000 د.ع</h4>
                    </div>
                    <div className="bg-white/5 border border-white/10 px-3 py-1 rounded-xl text-[10px] font-bold text-gray-400 flex items-center justify-between">
                      <span>{lang === "ar" ? "أقساط شهرية" : "Monthly Installments"}</span>
                      <span className="text-emerald-400">+12%</span>
                    </div>
                  </div>

                  <div className="sm:col-span-2 bg-white/[0.02] border border-white/10 p-4 rounded-3xl space-y-3">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-bold text-white">{lang === "ar" ? "تدفق المقبوضات الأسبوعية الحقيقي" : "Weekly Collections Flow"}</span>
                      <span className="text-[10px] text-orange-400 font-bold">{lang === "ar" ? "إجمالي الأسبوع: 12,400,000 د.ع" : "Weekly Total: 12.4M IQD"}</span>
                    </div>

                    <div className="h-28 flex items-end justify-between gap-2 pt-4 px-2 border-b border-white/5 pb-2">
                      {[
                        { day: "السبت", h: "45%", active: false },
                        { day: "الأحد", h: "70%", active: false },
                        { day: "الإثنين", h: "90%", active: true },
                        { day: "الثلاثاء", h: "60%", active: false },
                        { day: "الأربعاء", h: "40%", active: false },
                        { day: "الخميس", h: "80%", active: false },
                        { day: "الجمعة", h: "20%", active: false },
                      ].map((bar, i) => (
                        <div key={i} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end group">
                          <motion.div 
                            initial={{ height: 0 }}
                            whileInView={{ height: bar.h }}
                            transition={{ duration: 0.8, delay: i * 0.08 }}
                            className={`w-full max-w-[24px] rounded-t-lg ${
                              bar.active 
                                ? "bg-gradient-to-t from-orange-500 to-red-500 shadow-lg shadow-orange-500/30" 
                                : "bg-emerald-500/70 hover:bg-emerald-500"
                            }`}
                          />
                          <span className={`text-[9px] font-bold ${bar.active ? "text-orange-400 underline" : "text-gray-500"}`}>{bar.day}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 4. قسم المميزات الشاملة ومكونات الموشن التفاعلية */}
      <section id="features" className={`py-20 px-6 border-t ${
        isDarkMode ? "border-white/5 bg-white/[0.01]" : "border-slate-200 bg-slate-100/50"
      }`}>
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="text-center space-y-3 max-w-3xl mx-auto">
            <h2 className="text-xs font-bold text-orange-500 tracking-widest uppercase">{t.featuresTag}</h2>
            <p className="text-2xl md:text-4xl font-black">{t.featuresTitle}</p>
            <p className={`text-xs md:text-sm font-medium ${isDarkMode ? "text-gray-400" : "text-slate-600"}`}>{t.featuresDesc}</p>
          </div>

          <div className="my-10 space-y-6">
            <div className="w-full">
              <CustomerManagementMockup isDarkMode={isDarkMode} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
              <SettingsManagementMockup isDarkMode={isDarkMode} />
              <PrintTemplatesMockup isDarkMode={isDarkMode} />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {allFeatures.map((item, idx) => {
              const Icon = item.icon;
              return (
                <motion.div 
                  key={idx}
                  whileHover={{ y: -6 }}
                  className={`p-6 rounded-3xl space-y-4 border transition-all ${
                    isDarkMode 
                      ? "bg-white/[0.02] border-white/10 hover:border-orange-500/40 hover:bg-white/[0.04]" 
                      : "bg-white border-slate-200 hover:border-orange-300 shadow-sm"
                  }`}
                >
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-orange-500/20 to-red-500/20 border border-orange-500/20 text-orange-500 flex items-center justify-center">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-base font-bold">{item.title}</h3>
                  <p className={`text-xs leading-relaxed font-medium ${isDarkMode ? "text-gray-400" : "text-slate-600"}`}>
                    {item.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6. قسم خطط الاشتراكات */}
      <section id="pricing" className="py-20 px-6 border-t border-white/5">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center space-y-3">
            <h2 className="text-xs font-bold text-orange-500 tracking-widest uppercase">{t.pricingTag}</h2>
            <p className="text-2xl md:text-3xl font-black">{t.pricingTitle}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className={`rounded-3xl p-8 space-y-6 flex flex-col justify-between border ${
              isDarkMode ? "bg-white/[0.02] border-white/10" : "bg-white border-slate-200 shadow-sm"
            }`}>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold border ${
                    isDarkMode ? "bg-white/5 text-gray-300 border-white/10" : "bg-slate-100 text-slate-700 border-slate-300"
                  }`}>{lang === "ar" ? "المكاتب الصغيرة" : "Basic Office"}</span>
                  <Zap className="w-5 h-5 text-gray-400" />
                </div>

                <h3 className="text-2xl font-black">{lang === "ar" ? "الباقة الأساسية" : "Basic Plan"}</h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-black text-white">$25</span>
                  <span className="text-xs text-gray-400 font-bold">{lang === "ar" ? "/ شهرياً" : "/ monthly"}</span>
                </div>

                <p className={`text-xs font-medium ${isDarkMode ? "text-gray-400" : "text-slate-600"}`}>
                  {lang === "ar" ? "ممتازة للمحلات والمكاتب الجديدة لإدارة الأقساط الأساسية." : "Ideal for small shops managing standard debt logs."}
                </p>

                <div className={`border-t pt-4 space-y-3 ${isDarkMode ? "border-white/5" : "border-slate-100"}`}>
                  {[
                    lang === "ar" ? "إدارة حتى 150 عميل نشط" : "Up to 150 active clients",
                    lang === "ar" ? "سجل المدفوعات والديون" : "Full payment & debt history",
                    lang === "ar" ? "إدارة الصندوق والخزينة" : "Basic Treasury management",
                    lang === "ar" ? "دعم الطباعة الحرارية والعقود" : "Thermal receipts & contract print"
                  ].map((f, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs font-bold">
                      <CheckCircle2 className="w-4 h-4 text-orange-500" />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button 
                onClick={() => setSelectedPlan({ title: lang === "ar" ? "الباقة الأساسية" : "Basic Plan", price: "$25" })}
                className={`w-full py-3.5 rounded-2xl font-bold text-xs border text-center transition-all block ${
                  isDarkMode 
                    ? "bg-white/5 hover:bg-white/10 text-white border-white/10" 
                    : "bg-slate-100 hover:bg-slate-200 text-slate-800 border-slate-300"
                }`}
              >
                {lang === "ar" ? "طلب الاشتراك الأساسي" : "Request Basic Plan"}
              </button>
            </div>

            <div className={`rounded-3xl p-8 space-y-6 flex flex-col justify-between border relative overflow-hidden ${
              isDarkMode 
                ? "bg-gradient-to-b from-orange-500/10 to-transparent border-orange-500/40 shadow-xl shadow-orange-500/10" 
                : "bg-gradient-to-b from-orange-500/5 to-white border-orange-300 shadow-md"
            }`}>
              <div className="absolute top-4 left-4 bg-orange-500 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider">
                {lang === "ar" ? "الأكثر طلباً" : "Most Popular"}
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full bg-orange-500/20 text-orange-400 text-xs font-bold border border-orange-500/30">
                    {lang === "ar" ? "الشركات والمعارض" : "Professional"}
                  </span>
                  <Sparkles className="w-5 h-5 text-orange-400" />
                </div>

                <h3 className="text-2xl font-black">{lang === "ar" ? "الباقة الاحترافية" : "Pro Plan"}</h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-black text-orange-400">$45</span>
                  <span className="text-xs text-gray-400 font-bold">{lang === "ar" ? "/ شهرياً" : "/ monthly"}</span>
                </div>

                <p className={`text-xs font-medium ${isDarkMode ? "text-gray-400" : "text-slate-600"}`}>
                  {lang === "ar" ? "الحل المتكامل للشركات المعنية بالتنبيهات المباشرة والصلاحيات." : "Complete solution with automated WhatsApp notifications."}
                </p>

                <div className={`border-t pt-4 space-y-3 ${isDarkMode ? "border-white/10" : "border-orange-100"}`}>
                  {[
                    lang === "ar" ? "عدد لا محدود من العملاء" : "Unlimited active clients",
                    lang === "ar" ? "تفعيل تنبيهات الواتساب التلقائية" : "Automated WhatsApp notifications",
                    lang === "ar" ? "إدارة الموظفين وتحديد الصلاحيات" : "Employee roles & permissions",
                    lang === "ar" ? "تقارير الأرباح والمقبوضات الحية" : "Live profit & analytics reports"
                  ].map((f, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs font-bold">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button 
                onClick={() => setSelectedPlan({ title: lang === "ar" ? "الباقة الاحترافية" : "Pro Plan", price: "$45" })}
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-orange-500 to-red-500 hover:opacity-95 text-white font-black text-xs text-center shadow-lg shadow-orange-500/20 transition-all block"
              >
                {lang === "ar" ? "طلب الاشتراك الاحترافي" : "Request Pro Plan"}
              </button>
            </div>

            <div className={`rounded-3xl p-8 space-y-6 flex flex-col justify-between border ${
              isDarkMode ? "bg-white/[0.02] border-white/10" : "bg-white border-slate-200 shadow-sm"
            }`}>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full bg-purple-500/20 text-purple-400 text-xs font-bold border border-purple-500/30">
                    {lang === "ar" ? "خصم شهرين مجاناً" : "2 Months Free"}
                  </span>
                  <Crown className="w-5 h-5 text-purple-400" />
                </div>

                <h3 className="text-2xl font-black">{lang === "ar" ? "الباقة السوبر (السنوية)" : "Enterprise Super"}</h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-black text-white">$450</span>
                  <span className="text-xs text-gray-400 font-bold">{lang === "ar" ? "/ سنوياً" : "/ yearly"}</span>
                </div>

                <p className={`text-xs font-medium ${isDarkMode ? "text-gray-400" : "text-slate-600"}`}>
                  {lang === "ar" ? "وفر تكلفة شهرين كاملين مع الحصول على أولوية الدعم الفني." : "Save 2 months cost with dedicated priority VIP support."}
                </p>

                <div className={`border-t pt-4 space-y-3 ${isDarkMode ? "border-white/5" : "border-slate-100"}`}>
                  {[
                    lang === "ar" ? "كافة ميزات الباقة الاحترافية" : "All Pro features included",
                    lang === "ar" ? "خصم خاص وااشتراك مجاني لشهرين" : "2 Free bonus months included",
                    lang === "ar" ? "تدريب ومتابعة خاصة مع الفريق" : "Onboarding staff training",
                    lang === "ar" ? "دعم فني VIP مباشر على مدار الساعة" : "24/7 VIP priority phone support"
                  ].map((f, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs font-bold">
                      <CheckCircle2 className="w-4 h-4 text-purple-400" />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button 
                onClick={() => setSelectedPlan({ title: lang === "ar" ? "الباقة السوبر" : "Enterprise Super", price: "$450" })}
                className={`w-full py-3.5 rounded-2xl font-bold text-xs border text-center transition-all block ${
                  isDarkMode 
                    ? "bg-white/5 hover:bg-white/10 text-white border-white/10" 
                    : "bg-slate-100 hover:bg-slate-200 text-slate-800 border-slate-300"
                }`}
              >
                {lang === "ar" ? "طلب الاشتراك السنوي السوبر" : "Request Enterprise Plan"}
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* 7. قسم الأسئلة الشائعة القابل للطي (FAQ Accordion) */}
      <section id="faq" className={`py-20 px-6 border-t ${
        isDarkMode ? "border-white/5 bg-white/[0.01]" : "border-slate-200 bg-slate-100/50"
      }`}>
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="text-center space-y-3">
            <h2 className="text-xs font-bold text-orange-500 tracking-widest uppercase">{t.faqTag}</h2>
            <p className="text-2xl md:text-3xl font-black">{t.faqTitle}</p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className={`rounded-2xl border transition-all overflow-hidden ${
                    isDarkMode 
                      ? "bg-white/[0.02] border-white/10" 
                      : "bg-white border-slate-200 shadow-sm"
                  }`}
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full p-5 text-right flex items-center justify-between gap-4 font-bold text-sm md:text-base"
                  >
                    <span className="flex items-center gap-2">
                      <HelpCircle className="w-5 h-5 text-orange-500 shrink-0" />
                      <span>{faq.q}</span>
                    </span>
                    <ChevronDown className={`w-5 h-5 transition-transform duration-300 text-orange-500 shrink-0 ${
                      isOpen ? "rotate-180" : ""
                    }`} />
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className={`px-5 pb-5 text-xs md:text-sm font-medium leading-relaxed border-t ${
                          isDarkMode ? "border-white/5 text-gray-300" : "border-slate-100 text-slate-600"
                        }`}
                      >
                        <p className="pt-3">{faq.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 8. قسم "عن المنظومة / About Us" */}
      <section id="about" className={`py-20 px-6 border-t ${isDarkMode ? "border-white/5 bg-[#111116]/50" : "border-slate-200 bg-white"}`}>
        <div className="max-w-5xl mx-auto space-y-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-orange-500/30 bg-orange-500/10 text-orange-400 text-xs font-bold">
            <Building2 className="w-4 h-4" />
            <span>{t.aboutTitle}</span>
          </div>

          <p className={`text-base md:text-lg font-medium leading-relaxed max-w-3xl mx-auto ${isDarkMode ? "text-gray-300" : "text-slate-700"}`}>
            {t.aboutDesc}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 max-w-3xl mx-auto text-xs font-bold">
            <div className={`p-4 rounded-2xl border ${isDarkMode ? "bg-white/5 border-white/10" : "bg-slate-50 border-slate-200"}`}>
              <ShieldCheck className="w-5 h-5 text-emerald-400 mx-auto mb-2" />
              <span>دعم كامل للمؤسسات والمكاتب العراقية</span>
            </div>
            <div className={`p-4 rounded-2xl border ${isDarkMode ? "bg-white/5 border-white/10" : "bg-slate-50 border-slate-200"}`}>
              <Lock className="w-5 h-5 text-orange-400 mx-auto mb-2" />
              <span>تشفير بيانات رفيع المستوى</span>
            </div>
            <div className={`p-4 rounded-2xl border ${isDarkMode ? "bg-white/5 border-white/10" : "bg-slate-50 border-slate-200"}`}>
              <Globe className="w-5 h-5 text-indigo-400 mx-auto mb-2" />
              <span>بنية سحابية استقرارية 99.9%</span>
            </div>
          </div>
        </div>
      </section>

      {/* 9. بوابة الاستعلام السريع */}
      <section id="lookup" className={`py-20 px-6 border-t ${isDarkMode ? "border-white/5" : "border-slate-200"}`}>
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <div className="space-y-2">
            <h2 className="text-2xl font-black">{t.lookupTitle}</h2>
            <p className={`text-xs font-medium ${isDarkMode ? "text-gray-400" : "text-slate-600"}`}>{t.lookupDesc}</p>
          </div>

          <form onSubmit={handleLookup} className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
            <input 
              type="email"
              required
              placeholder="sajad101@gmail.com"
              value={lookupEmail}
              onChange={(e) => setLookupEmail(e.target.value)}
              className={`flex-1 px-5 py-3.5 rounded-2xl border text-xs font-mono font-bold outline-none transition-all ${
                isDarkMode 
                  ? "bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-orange-500" 
                  : "bg-white border-slate-300 text-slate-900 placeholder:text-slate-400 focus:border-orange-500"
              }`}
              dir="ltr"
            />
            <button 
              type="submit"
              disabled={isSearching}
              className="px-6 py-3.5 rounded-2xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isSearching ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
              <span>{t.lookupBtn}</span>
            </button>
          </form>

          {searchError && (
            <div className="flex items-center justify-center gap-2 text-rose-500 text-xs font-bold">
              <AlertCircle className="w-4 h-4" />
              <span>{searchError}</span>
            </div>
          )}

          {lookupResult && (
            <div className={`p-6 rounded-3xl space-y-3 max-w-lg mx-auto border text-right ${
              isDarkMode ? "bg-white/[0.02] border-orange-500/20" : "bg-white border-orange-300 shadow-sm"
            }`}>
              {lookupResult.companyName && (
                <div className="flex justify-between items-center text-xs">
                  <span className={isDarkMode ? "text-gray-400" : "text-slate-500"}>{lang === "ar" ? "اسم الشركة / المكتب:" : "Company Name:"}</span>
                  <span className="font-bold text-white">{lookupResult.companyName}</span>
                </div>
              )}
              <div className="flex justify-between items-center text-xs">
                <span className={isDarkMode ? "text-gray-400" : "text-slate-500"}>{lang === "ar" ? "البريد الإلكتروني:" : "Email:"}</span>
                <span className="font-mono font-bold text-orange-400" dir="ltr">{lookupResult.email}</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className={isDarkMode ? "text-gray-400" : "text-slate-500"}>{lang === "ar" ? "نوع الاشتراك:" : "Plan:"}</span>
                <span className="text-orange-500 font-bold">{lookupResult.type}</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className={isDarkMode ? "text-gray-400" : "text-slate-500"}>{lang === "ar" ? "حالة الاشتراك:" : "Status:"}</span>
                <span className="text-emerald-500 font-bold">{lookupResult.status}</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className={isDarkMode ? "text-gray-400" : "text-slate-500"}>{lang === "ar" ? "صالح لغاية:" : "Expires At:"}</span>
                <span className="font-bold font-mono">{lookupResult.expiresAt}</span>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 10. الفوتر الشامل */}
      <footer className={`border-t py-12 px-6 ${
        isDarkMode ? "border-white/5 bg-black text-gray-400" : "border-slate-200 bg-slate-100 text-slate-600"
      }`}>
        <div className="max-w-7xl mx-auto space-y-8">
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-8 border-b border-white/5">
            
            <div className="space-y-3 md:col-span-1">
              <div className="flex items-center gap-3">
                <img src="/logo.png" alt="Logo" className="w-8 h-8 object-contain" />
                <span className={`font-black text-base ${isDarkMode ? "text-white" : "text-slate-900"}`}>{t.appName}</span>
              </div>
              <p className="text-xs leading-relaxed">
                المنظومة المالية السحابية الأولى لإدارة الأقساط والديون، الطباعة الحرارية، وتنبيهات الواتساب التلقائية للعملاء في العراق.
              </p>
              <a href="https://aqsatak-app.vercel.app/" target="_blank" rel="noreferrer" className="text-xs font-mono font-bold text-orange-500 flex items-center gap-1 hover:underline">
                <span>aqsatak-app.vercel.app</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            <div className="space-y-2 text-xs">
              <h4 className={`font-black uppercase tracking-wider text-[11px] ${isDarkMode ? "text-white" : "text-slate-900"}`}>روابط السريعة</h4>
              <ul className="space-y-1.5 font-bold">
                <li><a href="#dashboard" className="hover:text-orange-500 transition-colors">{t.navDashboard}</a></li>
                <li><a href="#features" className="hover:text-orange-500 transition-colors">{t.navFeatures}</a></li>
                <li><a href="#pricing" className="hover:text-orange-500 transition-colors">{t.navPricing}</a></li>
                <li><a href="#faq" className="hover:text-orange-500 transition-colors">{t.navFaq}</a></li>
              </ul>
            </div>

            <div className="space-y-2 text-xs">
              <h4 className={`font-black uppercase tracking-wider text-[11px] ${isDarkMode ? "text-white" : "text-slate-900"}`}>التواصل المباشر</h4>
              <ul className="space-y-2 font-mono">
                <li>
                  <a href={`https://wa.me/${CONTACT_PHONE_RAW}`} target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-orange-500 transition-colors">
                    <PhoneCall className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{CONTACT_PHONE}</span>
                  </a>
                </li>
                <li>
                  <a href={`mailto:${CONTACT_EMAIL}`} className="flex items-center gap-2 hover:text-orange-500 transition-colors">
                    <Mail className="w-3.5 h-3.5 text-orange-400" />
                    <span>{CONTACT_EMAIL}</span>
                  </a>
                </li>
                <li className="flex items-center gap-2 text-gray-400">
                  <MapPin className="w-3.5 h-3.5 text-rose-400" />
                  <span>{lang === "ar" ? LOCATION_AR : LOCATION_EN}</span>
                </li>
              </ul>
            </div>

            <div className="space-y-2 text-xs">
              <h4 className={`font-black uppercase tracking-wider text-[11px] ${isDarkMode ? "text-white" : "text-slate-900"}`}>تسجيل الدخول</h4>
              <p className="text-[11px]">بوابة دخول مشفرة ومحميّة للمشركين والعملاء.</p>
              <a href={APP_LOGIN_URL} className="inline-block px-4 py-2 rounded-xl bg-orange-500/10 border border-orange-500/30 text-orange-400 font-bold text-xs hover:bg-orange-500 hover:text-white transition-all">
                {t.login}
              </a>
            </div>

          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-medium">
            <p>{t.rights}</p>
            <div className="flex items-center gap-4 font-bold">
              <a href={APP_LOGIN_URL} className="hover:text-orange-500 transition-colors">{t.login}</a>
              <a href="/contact" className="hover:text-orange-500 transition-colors">{t.contact}</a>
            </div>
          </div>

        </div>
      </footer>

      {/* 11. النافذة المنبثقة للتفعيل ودفع الاشتراكات */}
      <AnimatePresence>
        {selectedPlan && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className={`w-full max-w-md rounded-3xl p-6 border shadow-2xl relative space-y-6 ${
                isDarkMode ? "bg-[#111116] border-white/10 text-white" : "bg-white border-slate-200 text-slate-900"
              }`}
            >
              <button 
                onClick={() => setSelectedPlan(null)}
                className="absolute top-5 left-5 p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors"
              >
                <X className="w-4 h-4 text-gray-400" />
              </button>

              <div className="text-right space-y-1">
                <span className="text-[10px] font-black uppercase text-orange-500 tracking-wider">
                  {lang === "ar" ? "إتمام خيار الدفع والتفعيل" : "Complete Payment"}
                </span>
                <h3 className="text-xl font-black">
                  {lang === "ar" ? `طلب ${selectedPlan.title}` : `Subscribe to ${selectedPlan.title}`}
                </h3>
                <p className="text-xs text-gray-400 font-bold">
                  {lang === "ar" ? `قيمة الاشتراك: ${selectedPlan.price}` : `Plan Price: ${selectedPlan.price}`}
                </p>
              </div>

              <div className="space-y-3">
                
             

                {/* سوبر كي (Qi Card) */}
                <div className={`p-4 rounded-2xl border space-y-2 ${
                  isDarkMode ? "bg-white/[0.02] border-white/10" : "bg-slate-50 border-slate-200"
                }`}>
                  <div className="flex items-center justify-between text-xs font-bold">
                    <span className="text-indigo-400 flex items-center gap-1.5">
                      <CreditCard className="w-4 h-4" /> سوبر كي (Super Qi)
                    </span>
                    <button 
                      onClick={() => copyToClipboard(PAY_SUPER_QI, "qi")}
                      className="flex items-center gap-1 text-[10px] text-orange-400 hover:underline"
                    >
                      {copiedKey === "qi" ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                      <span>{copiedKey === "qi" ? "تم النسخ" : "نسخ الرقم"}</span>
                    </button>
                  </div>
                  <p className="font-mono font-bold text-sm text-left dir-ltr text-white tracking-wider">{PAY_SUPER_QI}</p>
                </div>
                
              </div>

              {/* زر واتساب */}
              <a 
                href={`https://wa.me/${CONTACT_PHONE_RAW}?text=${encodeURIComponent(`مرحباً، قمت بتحويل مبلغ الاشتراك لباقة (${selectedPlan.title} - ${selectedPlan.price}). أود تفعيل حسابي.`)}`}
                target="_blank"
                rel="noreferrer"
                className="w-full py-3.5 rounded-2xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-black text-xs text-center shadow-lg shadow-emerald-500/20 transition-all flex items-center justify-center gap-2 block"
              >
                <span>{lang === "ar" ? "إرسال إشعار التحويل عبر الواتساب" : "Send Receipt via WhatsApp"}</span>
              </a>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}