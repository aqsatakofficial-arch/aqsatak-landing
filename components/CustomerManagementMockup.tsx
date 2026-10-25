"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Users, Search, PlusCircle, CheckCircle2, 
  Phone, Sparkles, Ban
} from "lucide-react";

interface CustomerManagementMockupProps {
  isDarkMode?: boolean;
}

export default function CustomerManagementMockup({ isDarkMode = true }: CustomerManagementMockupProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState<"all" | "debts" | "blocked">("all");
  const [activeToast, setActiveToast] = useState("");

  const [customers, setCustomers] = useState([
    {
      id: "1",
      name: "على محسن",
      phone: "07738754970",
      status: "ممتاز",
      statusColor: "emerald",
      remainingDebt: 450000,
      product: "آيفون 15 برو ماكس",
      isBlocked: false,
    },
    {
      id: "2",
      name: "أحمد علي جاسم",
      phone: "07701234567",
      status: "خالي من الديون",
      statusColor: "blue",
      remainingDebt: 0,
      product: "شاشة سامسونج 55 بوصة",
      isBlocked: false,
    },
    {
      id: "3",
      name: "سعد كامل الناصري",
      phone: "07809876543",
      status: "قائمة سوداء (متأخر)",
      statusColor: "rose",
      remainingDebt: 1200000,
      product: "مولدة كتم 7 KVA",
      isBlocked: true,
    }
  ]);

  const showToast = (msg: string) => {
    setActiveToast(msg);
    setTimeout(() => setActiveToast(""), 3000);
  };

  const toggleBlockCustomer = (id: string, currentName: string) => {
    setCustomers(customers.map(c => {
      if (c.id === id) {
        const nextBlocked = !c.isBlocked;
        showToast(nextBlocked ? `تم إضافة (${currentName}) للقائمة السوداء!` : `تم فك حظر العميل (${currentName}) بنجاح`);
        return {
          ...c,
          isBlocked: nextBlocked,
          status: nextBlocked ? "قائمة سوداء (متأخر)" : "التزام منتظم",
          statusColor: nextBlocked ? "rose" : "emerald"
        };
      }
      return c;
    }));
  };

  const filteredCustomers = customers.filter(c => {
    const matchesSearch = c.name.includes(searchTerm) || c.phone.includes(searchTerm);
    if (activeFilter === "debts") return matchesSearch && c.remainingDebt > 0;
    if (activeFilter === "blocked") return matchesSearch && c.isBlocked;
    return matchesSearch;
  });

  return (
    <div className={`w-full border rounded-3xl p-5 md:p-6 font-sans dir-rtl select-none shadow-xl relative overflow-hidden transition-colors duration-300 ${
      isDarkMode 
        ? "bg-[#0d0d12] border-white/10 text-white" 
        : "bg-white border-slate-200 text-slate-900"
    }`} dir="rtl">
      
      {/* إشعار التوست */}
      <AnimatePresence>
        {activeToast && (
          <motion.div
            initial={{ opacity: 0, y: -20, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: -20, x: "-50%" }}
            className="absolute top-4 left-1/2 z-50 bg-emerald-500 text-white text-xs font-bold px-4 py-2 rounded-full shadow-lg border border-emerald-400/40 flex items-center gap-2"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>{activeToast}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* الترويسة الرئيسية */}
      <div className={`flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b pb-4 mb-5 ${
        isDarkMode ? "border-white/10" : "border-slate-200"
      }`}>
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-2xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center shrink-0">
            <Users className="w-5 h-5 text-orange-500" />
          </div>
          <div>
            <h3 className="text-base font-black flex items-center gap-2">
              سجلات العملاء والتقييم الآلي
              <span className="text-[10px] bg-orange-500/20 text-orange-500 border border-orange-500/30 px-2 py-0.5 rounded-full font-mono font-bold">
                LIVE DEMO
              </span>
            </h3>
            <p className={`text-xs font-medium ${isDarkMode ? "text-gray-400" : "text-slate-500"}`}>
              معاينة حية لإدارة الديون والقائمة السوداء
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => showToast("شاشة إضافة العقد الجديد جاهزة للاستخدام")}
            className="px-3.5 py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl text-xs font-bold hover:opacity-90 transition-opacity flex items-center gap-1.5 shadow-md shadow-orange-500/20"
          >
            <PlusCircle className="w-4 h-4" />
            <span>إضافة قسط</span>
          </button>
        </div>
      </div>

      {/* أدوات البحث والتصفية */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mb-5">
        <div className={`relative w-full sm:w-72 border rounded-xl overflow-hidden ${
          isDarkMode ? "bg-white/5 border-white/10" : "bg-slate-100 border-slate-200"
        }`}>
          <Search className={`w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 ${isDarkMode ? "text-gray-400" : "text-slate-400"}`} />
          <input
            type="text"
            placeholder="بحث عن اسم أو رقم..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`w-full pr-9 pl-3 py-2 text-xs outline-none bg-transparent font-bold ${
              isDarkMode ? "text-white placeholder:text-gray-500" : "text-slate-900 placeholder:text-slate-400"
            }`}
          />
        </div>

        <div className={`flex items-center gap-1 border p-1 rounded-xl w-full sm:w-auto ${
          isDarkMode ? "bg-white/5 border-white/10" : "bg-slate-100 border-slate-200"
        }`}>
          {[
            { id: "all", label: "الكل" },
            { id: "debts", label: "عليها ديون" },
            { id: "blocked", label: "محظورة" }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveFilter(tab.id as any)}
              className={`flex-1 sm:flex-none px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeFilter === tab.id 
                  ? "bg-orange-500 text-white shadow-sm" 
                  : isDarkMode ? "text-gray-400 hover:text-white" : "text-slate-600 hover:text-slate-900"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* عرض بطاقات العملاء أفقياً بدون سكرول */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {filteredCustomers.map((customer) => (
          <motion.div
            key={customer.id}
            layout
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`p-4 rounded-2xl border transition-all flex flex-col justify-between space-y-3 ${
              customer.isBlocked
                ? isDarkMode 
                  ? "bg-rose-500/10 border-rose-500/30 text-rose-200" 
                  : "bg-rose-50 border-rose-200 text-rose-900"
                : isDarkMode 
                  ? "bg-white/[0.03] border-white/10 text-white" 
                  : "bg-slate-50 border-slate-200 text-slate-900"
            }`}
          >
            <div className="flex items-start justify-between gap-2">
              <div>
                <h4 className="font-black text-sm">{customer.name}</h4>
                <p className={`text-[11px] font-mono flex items-center gap-1 mt-0.5 ${
                  isDarkMode ? "text-gray-400" : "text-slate-500"
                }`}>
                  <Phone className="w-3 h-3 text-orange-500" />
                  <span>{customer.phone}</span>
                </p>
              </div>

              <button
                onClick={() => toggleBlockCustomer(customer.id, customer.name)}
                title={customer.isBlocked ? "فك الحظر" : "حظر العميل"}
                className={`p-1.5 rounded-lg border transition-all ${
                  customer.isBlocked
                    ? "bg-rose-500 text-white border-rose-400"
                    : isDarkMode
                      ? "bg-white/5 border-white/10 text-gray-400 hover:text-rose-400 hover:border-rose-500/30"
                      : "bg-white border-slate-200 text-slate-500 hover:text-rose-600 hover:border-rose-300"
                }`}
              >
                <Ban className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between items-center">
                <span className={isDarkMode ? "text-gray-400" : "text-slate-500"}>التقييم:</span>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${
                  customer.isBlocked 
                    ? "bg-rose-500/20 text-rose-500 border-rose-500/30" 
                    : "bg-emerald-500/20 text-emerald-500 border-emerald-500/30"
                }`}>
                  {customer.status}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className={isDarkMode ? "text-gray-400" : "text-slate-500"}>إجمالي المتبقي:</span>
                <span className="font-black text-sm font-mono text-orange-500">
                  {customer.remainingDebt.toLocaleString()} د.ع
                </span>
              </div>

              <div className={`text-[11px] pt-1 border-t truncate ${
                isDarkMode ? "border-white/5 text-gray-400" : "border-slate-200 text-slate-600"
              }`}>
                المادة: <span className="font-bold">{customer.product}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}