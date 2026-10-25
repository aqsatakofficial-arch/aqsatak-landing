"use client";

import { useState, useEffect } from "react";
import { 
  Shield, 
  ArrowRight, 
  Lock, 
  Mail, 
  Loader2, 
  User, 
  CheckCircle2, 
  Activity, 
  LogOut, 
  CreditCard, 
  Building2, 
  AlertCircle,
  Users,
  UserCheck,
  Zap,
  Crown,
  X,
  Smartphone,
  RefreshCw,
  Sun,
  Moon,
  Globe,
  FileText
} from "lucide-react";
import Link from "next/link";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { collection, query, where, getDocs, limit } from "firebase/firestore";
import { auth, db } from "../../services/firebase";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const [isDarkMode, setIsDarkMode] = useState(false);
  const [lang, setLang] = useState<"ar" | "en">("ar");

  const [userData, setUserData] = useState<any>(null);
  const [recentActivities, setRecentActivities] = useState<any[]>([]);

  const [accountOverview, setAccountOverview] = useState({
    activeClientsCount: 0,
    employeesCount: 0,
    totalContracts: 0
  });

  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<{ title: string; price: string } | null>(null);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // تحديث عنوان التبويب تلقائياً في المتصفح
  useEffect(() => {
    document.title = lang === "ar" ? "أقساطك | المنظومة المالية الذكية" : "Aqsatak | Financial System";
  }, [lang]);

  const PAY_ZAINCASH = "07700000000"; 
  const PAY_MASTERCARD = "5358 0000 0000 0000";
  const ADMIN_WHATSAPP = "9647700000000";

  const toggleTheme = () => setIsDarkMode(!isDarkMode);
  const toggleLang = () => setLang(lang === "ar" ? "en" : "ar");

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const formatDate = (dateValue: any) => {
    if (!dateValue) return lang === "ar" ? "اليوم" : "Today";
    try {
      if (dateValue.toDate && typeof dateValue.toDate === "function") {
        return dateValue.toDate().toLocaleDateString(lang === "ar" ? "ar-IQ" : "en-US");
      }
      if (typeof dateValue === "string") {
        const parsed = new Date(dateValue);
        if (!isNaN(parsed.getTime())) {
          return parsed.toLocaleDateString(lang === "ar" ? "ar-IQ" : "en-US");
        }
        return dateValue.split("T")[0];
      }
      if (typeof dateValue === "number") {
        return new Date(dateValue).toLocaleDateString(lang === "ar" ? "ar-IQ" : "en-US");
      }
    } catch (e) {
      console.error(e);
    }
    return lang === "ar" ? "مؤرخ" : "Dated";
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;

    setIsLoading(true);
    setErrorMsg("");

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email.trim(), password);
      const user = userCredential.user;

      const q = query(collection(db, "users"), where("email", "==", user.email?.toLowerCase()));
      const querySnap = await getDocs(q);

      let profileData: any = {
        email: user.email,
        companyName: "أقساطك",
        role: "user",
        status: "active",
        subscription: { period: "monthly", endDate: "2040-10-20", name: "الباقة الاحترافية" }
      };

      if (!querySnap.empty) {
        profileData = { ...profileData, ...querySnap.docs[0].data() };
      }

      setUserData(profileData);

      try {
        const installSnap = await getDocs(collection(db, "installments"));
        const clientsCount = installSnap.size;

        let employeesCount = 1;
        try {
          const empSnap = await getDocs(collection(db, "employees"));
          employeesCount = empSnap.size > 0 ? empSnap.size : 1;
        } catch (e) {
          employeesCount = 1;
        }

        setAccountOverview({
          activeClientsCount: clientsCount,
          employeesCount: employeesCount,
          totalContracts: clientsCount
        });

      } catch (statErr) {
        console.error(statErr);
      }

      try {
        const installQ = query(collection(db, "installments"), limit(6));
        const installSnap = await getDocs(installQ);
        const activities: any[] = [];

        installSnap.forEach((docSnap) => {
          const item = docSnap.data();
          const rawDate = item.createdAt || item.startDate || item.date;

          activities.push({
            id: docSnap.id,
            title: `${lang === "ar" ? "عقد جديد" : "New Contract"}: ${item.customerName || item.name || item.clientName || (lang === "ar" ? "عميل" : "Client")}`,
            status: lang === "ar" ? "مضاف حديثاً" : "Recently Added",
            date: formatDate(rawDate),
            type: "contract"
          });
        });

        if (activities.length === 0) {
          setRecentActivities([
            { id: "1", title: lang === "ar" ? "تم تسجيل الدخول بنجاح للنظام" : "Login Successful", status: lang === "ar" ? "مكتمل" : "Completed", date: lang === "ar" ? "الآن" : "Now", type: "system" }
          ]);
        } else {
          setRecentActivities(activities);
        }
      } catch (actErr) {
        console.error(actErr);
      }

    } catch (err: any) {
      console.error(err);
      if (err.code === "auth/user-not-found" || err.code === "auth/wrong-password" || err.code === "auth/invalid-credential") {
        setErrorMsg(lang === "ar" ? "البريد الإلكتروني أو كلمة المرور غير صحيحة." : "Invalid email or password.");
      } else {
        setErrorMsg(lang === "ar" ? "حدث خطأ أثناء تسجيل الدخول. يرجى التأكد من البيانات والمحاولة مجدداً." : "Login failed. Please verify credentials.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    setUserData(null);
    setEmail("");
    setPassword("");
  };

  const t = {
    ar: {
      title: "تسجيل الدخول للمنظومة",
      desc: "أدخل بيانات حسابك المعتمد للوصول للوحة التحكم",
      emailLabel: "البريد الإلكتروني",
      passLabel: "كلمة المرور",
      loginBtn: "دخول المنظومة",
      backHome: "العودة للصفحة الرئيسية",
      activeAccount: "حساب نشط",
      logout: "تسجيل الخروج",
      clientsTitle: "إجمالي العملاء والعقود",
      clientsSub: "عقد مسجل بالنظام",
      teamTitle: "فريق العمل والفرع",
      teamSub: "حسابات موظفين نشطة",
      roleTitle: "صلاحية المستخدم",
      roleSub: "المستوى الحالي للحساب",
      subDetails: "تفاصيل الاشتراك الحالي",
      changeSub: "تغيير / تجديد الاشتراك",
      expDate: "تاريخ انتهاء الاشتراك",
      autoRenew: "حالة التجديد التلقائي",
      activeSub: "مفعّل وغير منتهي",
      recentActivity: "أحدث العقود والحركات المضافة",
      liveUpdate: "تحديث مباشر",
      proPlan: "الباقة الاحترافية",
      basicPlan: "الباقة الأساسية",
      choosePlan: "اختر الباقة المناسبة لمكتبك",
      confirmWa: "تأكيد التحديث عبر الواتساب"
    },
    en: {
      title: "System Login",
      desc: "Enter your verified account credentials to access dashboard",
      emailLabel: "Email Address",
      passLabel: "Password",
      loginBtn: "Login",
      backHome: "Back to Landing Page",
      activeAccount: "Active Account",
      logout: "Sign Out",
      clientsTitle: "Total Clients & Contracts",
      clientsSub: "contracts registered",
      teamTitle: "Staff & Branch",
      teamSub: "active employee logs",
      roleTitle: "User Permission",
      roleSub: "current access tier",
      subDetails: "Current Subscription",
      changeSub: "Change / Renew Plan",
      expDate: "Expiry Date",
      autoRenew: "Auto Renewal Status",
      activeSub: "Active & Valid",
      recentActivity: "Recent Contracts & Logs",
      liveUpdate: "Live Sync",
      proPlan: "Pro Plan",
      basicPlan: "Basic Plan",
      choosePlan: "Select Plan Suitable for Your Office",
      confirmWa: "Confirm via WhatsApp"
    }
  }[lang];

  if (userData) {
    return (
      <div className={`min-h-screen font-sans transition-colors duration-300 p-4 md:p-8 ${
        isDarkMode ? "bg-[#0a0a0c] text-white" : "bg-slate-100 text-slate-900"
      }`} dir={lang === "ar" ? "rtl" : "ltr"}>
        
        <div className="max-w-5xl mx-auto space-y-6">
          
          <div className={`flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border p-6 rounded-3xl transition-all shadow-md ${
            isDarkMode ? "bg-[#111116] border-white/10" : "bg-white border-slate-300 shadow-slate-200/80"
          }`}>
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-orange-500 to-red-500 flex items-center justify-center shadow-lg shadow-orange-500/20">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-black">{userData.companyName || "أقساطك"}</h1>
                <p className={`text-xs font-mono mt-0.5 ${isDarkMode ? "text-gray-400" : "text-slate-500"}`} dir="ltr">{userData.email}</p>
              </div>
            </div>

            <div className="flex items-center gap-2 md:gap-3 w-full md:w-auto justify-end">
              <button
                onClick={toggleTheme}
                className={`p-2.5 rounded-2xl border transition-all ${
                  isDarkMode 
                    ? "bg-white/5 border-white/10 text-amber-400 hover:bg-white/10" 
                    : "bg-slate-100 border-slate-300 text-indigo-600 hover:bg-slate-200"
                }`}
              >
                {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>

              <button
                onClick={toggleLang}
                className={`px-3 py-2 rounded-2xl border text-xs font-black flex items-center gap-1.5 transition-all ${
                  isDarkMode 
                    ? "bg-white/5 border-white/10 text-gray-300 hover:bg-white/10" 
                    : "bg-slate-100 border-slate-300 text-slate-800 hover:bg-slate-200"
                }`}
              >
                <Globe className="w-3.5 h-3.5 text-orange-500" />
                <span>{lang === "ar" ? "EN" : "عربي"}</span>
              </button>

              <span className="px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 font-bold text-xs flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>{t.activeAccount}</span>
              </span>

              <button 
                onClick={handleLogout}
                className={`px-4 py-2 rounded-2xl border font-bold text-xs transition-all flex items-center gap-1.5 ${
                  isDarkMode 
                    ? "bg-white/5 hover:bg-rose-500/10 border-white/10 text-rose-400" 
                    : "bg-rose-50 hover:bg-rose-100 border-rose-200 text-rose-600"
                }`}
              >
                <LogOut className="w-4 h-4" />
                <span>{t.logout}</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            
            <div className={`border p-5 rounded-3xl space-y-2 transition-all shadow-sm ${
              isDarkMode ? "bg-[#111116] border-white/10" : "bg-white border-slate-300 shadow-slate-200/60"
            }`}>
              <div className={`flex items-center justify-between text-xs font-bold ${isDarkMode ? "text-gray-400" : "text-slate-500"}`}>
                <span>{t.clientsTitle}</span>
                <Users className="w-5 h-5 text-orange-500" />
              </div>
              <p className="text-3xl font-black">{accountOverview.activeClientsCount}</p>
              <span className={`text-[10px] font-bold block ${isDarkMode ? "text-gray-400" : "text-slate-500"}`}>{t.clientsSub}</span>
            </div>

            <div className={`border p-5 rounded-3xl space-y-2 transition-all shadow-sm ${
              isDarkMode ? "bg-[#111116] border-white/10" : "bg-white border-slate-300 shadow-slate-200/60"
            }`}>
              <div className={`flex items-center justify-between text-xs font-bold ${isDarkMode ? "text-gray-400" : "text-slate-500"}`}>
                <span>{t.teamTitle}</span>
                <UserCheck className="w-5 h-5 text-indigo-500" />
              </div>
              <p className="text-3xl font-black">{accountOverview.employeesCount}</p>
              <span className={`text-[10px] font-bold block ${isDarkMode ? "text-gray-400" : "text-slate-500"}`}>{t.teamSub}</span>
            </div>

            <div className={`border p-5 rounded-3xl space-y-2 transition-all shadow-sm ${
              isDarkMode ? "bg-[#111116] border-white/10" : "bg-white border-slate-300 shadow-slate-200/60"
            }`}>
              <div className={`flex items-center justify-between text-xs font-bold ${isDarkMode ? "text-gray-400" : "text-slate-500"}`}>
                <span>{t.roleTitle}</span>
                <Building2 className="w-5 h-5 text-emerald-500" />
              </div>
              <p className="text-3xl font-black text-emerald-500 uppercase">{userData.role || "user"}</p>
              <span className={`text-[10px] font-bold block ${isDarkMode ? "text-gray-400" : "text-slate-500"}`}>{t.roleSub}</span>
            </div>

          </div>

          <div className={`border p-6 rounded-3xl space-y-4 transition-all shadow-sm ${
            isDarkMode ? "bg-[#111116] border-white/10" : "bg-white border-slate-300 shadow-slate-200/60"
          }`}>
            <div className={`flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b pb-4 ${
              isDarkMode ? "border-white/10" : "border-slate-200"
            }`}>
              <div className="space-y-1">
                <span className="text-xs font-bold text-orange-500 uppercase tracking-wider">{t.subDetails}</span>
                <h3 className="text-lg font-black">
                  {userData.subscription?.name || t.proPlan}
                </h3>
              </div>

              <button 
                onClick={() => setShowUpgradeModal(true)}
                className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-orange-500 to-red-500 hover:opacity-90 text-white font-bold text-xs transition-all shadow-lg shadow-orange-500/20 flex items-center gap-2"
              >
                <RefreshCw className="w-4 h-4" />
                <span>{t.changeSub}</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-bold pt-2">
              <div className={`p-4 rounded-2xl border space-y-1 ${
                isDarkMode ? "bg-white/[0.02] border-white/10" : "bg-slate-50 border-slate-300"
              }`}>
                <span className={`block text-[10px] ${isDarkMode ? "text-gray-400" : "text-slate-500"}`}>{t.expDate}</span>
                <span className="text-sm font-mono font-black">
                  {userData.subscription?.endDate ? String(userData.subscription.endDate).split("T")[0] : "2040-10-20"}
                </span>
              </div>

              <div className={`p-4 rounded-2xl border space-y-1 ${
                isDarkMode ? "bg-white/[0.02] border-white/10" : "bg-slate-50 border-slate-300"
              }`}>
                <span className={`block text-[10px] ${isDarkMode ? "text-gray-400" : "text-slate-500"}`}>{t.autoRenew}</span>
                <span className="text-sm text-emerald-600 font-black flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> {t.activeSub}
                </span>
              </div>
            </div>
          </div>

          <div className={`border p-6 rounded-3xl space-y-4 transition-all shadow-sm ${
            isDarkMode ? "bg-[#111116] border-white/10" : "bg-white border-slate-300 shadow-slate-200/60"
          }`}>
            <div className={`flex items-center justify-between border-b pb-4 ${
              isDarkMode ? "border-white/10" : "border-slate-200"
            }`}>
              <div className="flex items-center gap-2">
                <Activity className="w-5 h-5 text-orange-500" />
                <h3 className="text-base font-black">{t.recentActivity}</h3>
              </div>
              <span className={`text-xs font-bold ${isDarkMode ? "text-gray-400" : "text-slate-500"}`}>{t.liveUpdate}</span>
            </div>

            <div className="space-y-3">
              {recentActivities.map((act) => (
                <div key={act.id} className={`flex items-center justify-between p-4 rounded-2xl border transition-all ${
                  isDarkMode 
                    ? "bg-white/[0.02] border-white/10 hover:border-white/20" 
                    : "bg-slate-50 border-slate-300 hover:border-slate-400 shadow-sm"
                }`}>
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-orange-500/10 border border-orange-500/20 text-orange-500 flex items-center justify-center">
                      <FileText className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-xs font-black">{act.title}</p>
                      <span className={`text-[10px] font-mono ${isDarkMode ? "text-gray-400" : "text-slate-500"}`} dir="ltr">{act.date}</span>
                    </div>
                  </div>
                  <span className="text-xs font-black text-emerald-600 bg-emerald-500/10 border border-emerald-500/30 px-3 py-1 rounded-full">{act.status}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <Link 
              href="/" 
              className={`flex-1 py-3.5 rounded-2xl border text-center text-xs font-bold transition-all ${
                isDarkMode 
                  ? "bg-white/5 border-white/10 hover:bg-white/10 text-white" 
                  : "bg-white border-slate-300 hover:bg-slate-100 text-slate-800 shadow-sm"
              }`}
            >
              {t.backHome}
            </Link>
          </div>

        </div>

        {showUpgradeModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
            <div className={`w-full max-w-lg rounded-3xl p-6 border space-y-6 relative shadow-2xl ${
              isDarkMode ? "bg-[#111116] border-white/10 text-white" : "bg-white border-slate-300 text-slate-900"
            }`}>
              <button 
                onClick={() => { setShowUpgradeModal(false); setSelectedPlan(null); }}
                className="absolute top-5 left-5 p-2 rounded-full bg-slate-100 dark:bg-white/5 hover:opacity-80 transition-colors"
              >
                <X className="w-4 h-4 text-gray-400" />
              </button>

              <div className="space-y-1">
                <span className="text-[10px] font-black uppercase text-orange-500 tracking-wider">{t.changeSub}</span>
                <h3 className="text-xl font-black">{t.choosePlan}</h3>
              </div>

              {!selectedPlan ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button 
                    onClick={() => setSelectedPlan({ title: t.basicPlan, price: "$25" })}
                    className={`p-4 rounded-2xl border text-right space-y-2 transition-all ${
                      isDarkMode ? "bg-white/[0.02] border-white/10 hover:border-orange-500/50" : "bg-slate-50 border-slate-300 hover:border-orange-400"
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-xs">{t.basicPlan}</span>
                      <Zap className="w-4 h-4 text-gray-400" />
                    </div>
                    <p className="text-lg font-black">$25 <span className="text-xs font-normal text-gray-400">/ mo</span></p>
                  </button>

                  <button 
                    onClick={() => setSelectedPlan({ title: t.proPlan, price: "$45" })}
                    className="p-4 rounded-2xl bg-gradient-to-br from-orange-500/10 to-transparent border border-orange-500/40 text-right space-y-2 transition-all"
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-xs text-orange-500">{t.proPlan}</span>
                      <Crown className="w-4 h-4 text-orange-500" />
                    </div>
                    <p className="text-lg font-black text-orange-500">$45 <span className="text-xs font-normal text-gray-400">/ mo</span></p>
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="p-3.5 rounded-2xl bg-orange-500/10 border border-orange-500/20 text-xs">
                    <span className="text-gray-400 block">{selectedPlan.title}:</span>
                    <span className="font-bold text-orange-500 text-sm">{selectedPlan.price}</span>
                  </div>

                  <div className="space-y-2">
                    <div className={`p-3.5 rounded-2xl border flex items-center justify-between text-xs ${
                      isDarkMode ? "bg-white/[0.02] border-white/10" : "bg-slate-50 border-slate-300"
                    }`}>
                      <span className="text-emerald-500 font-bold flex items-center gap-1.5"><Smartphone className="w-4 h-4" /> ZainCash:</span>
                      <span className="font-mono font-bold">{PAY_ZAINCASH}</span>
                      <button onClick={() => copyToClipboard(PAY_ZAINCASH, "zain")} className="text-[10px] text-orange-500 underline">
                        {copiedKey === "zain" ? "Copied" : "Copy"}
                      </button>
                    </div>

                    <div className={`p-3.5 rounded-2xl border flex items-center justify-between text-xs ${
                      isDarkMode ? "bg-white/[0.02] border-white/10" : "bg-slate-50 border-slate-300"
                    }`}>
                      <span className="text-indigo-500 font-bold flex items-center gap-1.5"><CreditCard className="w-4 h-4" /> MasterCard:</span>
                      <span className="font-mono font-bold">{PAY_MASTERCARD}</span>
                      <button onClick={() => copyToClipboard(PAY_MASTERCARD, "card")} className="text-[10px] text-orange-500 underline">
                        {copiedKey === "card" ? "Copied" : "Copy"}
                      </button>
                    </div>
                  </div>

                  <a 
                    href={`https://wa.me/${ADMIN_WHATSAPP}?text=${encodeURIComponent(`مرحباً، أود تجديد/تغيير اشتراكي إلى (${selectedPlan.title}).`)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full py-3.5 rounded-2xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-black text-xs text-center shadow-lg shadow-emerald-500/20 transition-all flex items-center justify-center gap-2 block"
                  >
                    <span>{t.confirmWa}</span>
                  </a>
                </div>
              )}
            </div>
          </div>
        )}

      </div>
    );
  }

  return (
    <div className={`min-h-screen font-sans transition-colors duration-300 flex items-center justify-center p-6 ${
      isDarkMode ? "bg-[#0a0a0c] text-white" : "bg-slate-100 text-slate-900"
    }`} dir={lang === "ar" ? "rtl" : "ltr"}>
      
      <div className={`w-full max-w-md border rounded-3xl p-8 shadow-2xl space-y-6 relative transition-colors ${
        isDarkMode ? "bg-[#111116] border-white/10" : "bg-white border-slate-300"
      }`}>
        
        <div className="absolute top-5 left-5 flex items-center gap-2">
          <button
            onClick={toggleTheme}
            className={`p-2 rounded-xl border transition-all ${
              isDarkMode 
                ? "bg-white/5 border-white/10 text-amber-400 hover:bg-white/10" 
                : "bg-slate-100 border-slate-300 text-indigo-600 hover:bg-slate-200"
            }`}
          >
            {isDarkMode ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
          </button>

          <button
            onClick={toggleLang}
            className={`px-2.5 py-1.5 rounded-xl border text-[10px] font-black flex items-center gap-1 transition-all ${
              isDarkMode 
                ? "bg-white/5 border-white/10 text-gray-300 hover:bg-white/10" 
                : "bg-slate-100 border-slate-300 text-slate-800 hover:bg-slate-200"
            }`}
          >
            <Globe className="w-3 h-3 text-orange-500" />
            <span>{lang === "ar" ? "EN" : "عربي"}</span>
          </button>
        </div>

        <div className="text-center space-y-2 pt-2">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-orange-500 to-red-500 mx-auto flex items-center justify-center shadow-lg shadow-orange-500/20">
            <Shield className="w-7 h-7 text-white" />
          </div>
          <h2 className="text-2xl font-black pt-2">{t.title}</h2>
          <p className={`text-xs font-medium ${isDarkMode ? "text-gray-400" : "text-slate-500"}`}>{t.desc}</p>
        </div>

        {errorMsg && (
          <div className="p-3.5 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-500 text-xs font-bold flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-1">
            <label className={`text-xs font-bold ${isDarkMode ? "text-gray-300" : "text-slate-700"}`}>{t.emailLabel}</label>
            <div className="relative flex items-center">
              <Mail className="w-4 h-4 text-gray-500 absolute right-4" />
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="husseinrahim775@gmail.com"
                className={`w-full pl-4 pr-11 py-3.5 rounded-2xl border text-xs font-mono font-bold outline-none focus:border-orange-500 transition-all ${
                  isDarkMode 
                    ? "bg-white/5 border-white/10 text-white placeholder:text-gray-600" 
                    : "bg-slate-50 border-slate-300 text-slate-900 placeholder:text-slate-400"
                }`}
                dir="ltr"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className={`text-xs font-bold ${isDarkMode ? "text-gray-300" : "text-slate-700"}`}>{t.passLabel}</label>
            <div className="relative flex items-center">
              <Lock className="w-4 h-4 text-gray-500 absolute right-4" />
              <input 
                type="password" 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className={`w-full pl-4 pr-11 py-3.5 rounded-2xl border text-xs font-mono font-bold outline-none focus:border-orange-500 transition-all ${
                  isDarkMode 
                    ? "bg-white/5 border-white/10 text-white placeholder:text-gray-600" 
                    : "bg-slate-50 border-slate-300 text-slate-900 placeholder:text-slate-400"
                }`}
                dir="ltr"
              />
            </div>
          </div>

          <button 
            type="submit"
            disabled={isLoading}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-orange-500 to-red-500 hover:opacity-90 text-white font-black text-xs transition-all shadow-lg shadow-orange-500/20 flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <span>{t.loginBtn}</span>}
          </button>
        </form>

        <div className="text-center pt-2">
          <Link href="/" className={`text-xs font-bold hover:text-orange-500 transition-colors inline-flex items-center gap-1 ${
            isDarkMode ? "text-gray-400" : "text-slate-500"
          }`}>
            <span>{t.backHome}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

      </div>
    </div>
  );
}