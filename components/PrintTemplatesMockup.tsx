"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Printer, FileText, Receipt, CheckCircle2, 
  Layers
} from "lucide-react";

interface PrintTemplatesMockupProps {
  isDarkMode?: boolean;
}

export default function PrintTemplatesMockup({ isDarkMode = true }: PrintTemplatesMockupProps) {
  const [activeTab, setActiveTab] = useState<"contract" | "receipt" | "statement">("receipt");
  const [isPrinting, setIsPrinting] = useState(false);
  const [activeToast, setActiveToast] = useState("");

  const showToast = (msg: string) => {
    setActiveToast(msg);
    setTimeout(() => setActiveToast(""), 3000);
  };

  const handleSimulatePrint = () => {
    setIsPrinting(true);
    setTimeout(() => {
      setIsPrinting(false);
      showToast("تم إرسال المستند إلى الطابعة بنجاح!");
    }, 1200);
  };

  return (
    <div className={`w-full border rounded-3xl p-5 md:p-6 font-sans dir-rtl select-none shadow-xl relative overflow-hidden transition-colors duration-300 flex flex-col justify-between ${
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

      <div>
        {/* الترويسة الرئيسية */}
        <div className={`flex justify-between items-center gap-2 border-b pb-4 mb-4 ${
          isDarkMode ? "border-white/10" : "border-slate-200"
        }`}>
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center shrink-0">
              <Printer className="w-5 h-5 text-orange-500" />
            </div>
            <div>
              <h3 className="text-base font-black flex items-center gap-1.5">
                معاينة طباعة النماذج
                <span className="text-[10px] bg-orange-500/20 text-orange-500 border border-orange-500/30 px-2 py-0.5 rounded-full font-mono font-bold">
                  A4 & THERMAL
                </span>
              </h3>
              <p className={`text-xs font-medium ${isDarkMode ? "text-gray-400" : "text-slate-500"}`}>
                إيصالات وعقود بالدينار العراقي
              </p>
            </div>
          </div>

          <button
            onClick={handleSimulatePrint}
            disabled={isPrinting}
            className="flex items-center gap-1 bg-gradient-to-r from-orange-500 to-red-500 text-white px-3.5 py-2 rounded-xl text-xs font-bold hover:opacity-90 transition-opacity shadow-md shadow-orange-500/20 disabled:opacity-50 shrink-0"
          >
            <Printer className={`w-3.5 h-3.5 ${isPrinting ? "animate-bounce" : ""}`} />
            <span>{isPrinting ? "جاري..." : "طباعة"}</span>
          </button>
        </div>

        {/* شريط اختيار النموذج */}
        <div className={`flex items-center gap-1.5 border p-1 rounded-2xl mb-4 ${
          isDarkMode ? "bg-[#14141b] border-white/10" : "bg-slate-100 border-slate-200"
        }`}>
          <button
            onClick={() => setActiveTab("receipt")}
            className={`flex-1 py-1.5 px-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1 whitespace-nowrap ${
              activeTab === "receipt" 
                ? "bg-orange-500 text-white shadow-sm" 
                : isDarkMode ? "text-gray-400 hover:text-white" : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <Receipt className="w-3.5 h-3.5" />
            <span>وصل حراري</span>
          </button>

          <button
            onClick={() => setActiveTab("contract")}
            className={`flex-1 py-1.5 px-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1 whitespace-nowrap ${
              activeTab === "contract" 
                ? "bg-orange-500 text-white shadow-sm" 
                : isDarkMode ? "text-gray-400 hover:text-white" : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>عقد تقسيط</span>
          </button>

          <button
            onClick={() => setActiveTab("statement")}
            className={`flex-1 py-1.5 px-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1 whitespace-nowrap ${
              activeTab === "statement" 
                ? "bg-orange-500 text-white shadow-sm" 
                : isDarkMode ? "text-gray-400 hover:text-white" : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>كشف حساب</span>
          </button>
        </div>
      </div>

      {/* ورقة الطباعة متفاعلة مع الثيم */}
      <div className={`flex justify-center items-center p-3 rounded-2xl border transition-colors flex-1 min-h-[220px] ${
        isDarkMode ? "bg-[#070709] border-white/5" : "bg-slate-100/70 border-slate-200"
      }`}>
        <AnimatePresence mode="wait">
          
          {/* 1. وصل القبض الحراري */}
          {activeTab === "receipt" && (
            <motion.div
              key="receipt"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className={`w-full rounded-xl p-4 shadow-xl border-2 border-dashed space-y-3 text-right font-sans text-xs dir-rtl transition-colors ${
                isDarkMode 
                  ? "bg-[#16161e] text-white border-white/20" 
                  : "bg-white text-slate-900 border-slate-300"
              }`}
            >
              <div className={`text-center border-b pb-2 space-y-1 ${isDarkMode ? "border-white/10" : "border-slate-200"}`}>
                <h4 className={`font-black text-xs ${isDarkMode ? "text-white" : "text-slate-900"}`}>مكتب النور للتقسيط</h4>
                <span className={`text-[9px] px-2 py-0.5 rounded-full font-bold inline-block ${
                  isDarkMode ? "bg-white/10 text-orange-400 border border-orange-500/30" : "bg-slate-900 text-white"
                }`}>
                  وصل قبض مالي
                </span>
                <p className={`text-[9px] font-mono ${isDarkMode ? "text-gray-400" : "text-slate-500"}`}>2026/10/24 - #4812</p>
              </div>

              <div className={`space-y-1 text-[11px] border-b pb-2 ${isDarkMode ? "border-white/10 text-gray-200" : "border-slate-200 text-slate-800"}`}>
                <div className="flex justify-between">
                  <span className={isDarkMode ? "text-gray-400" : "text-slate-500"}>العميل:</span>
                  <span className="font-bold">ali abd</span>
                </div>
                <div className="flex justify-between">
                  <span className={isDarkMode ? "text-gray-400" : "text-slate-500"}>المادة:</span>
                  <span className="font-bold">آيفون 15 برو ماكس</span>
                </div>
              </div>

              <div className={`p-2 rounded-lg text-center border ${
                isDarkMode ? "bg-emerald-950/30 border-emerald-500/30" : "bg-slate-100 border-slate-200"
              }`}>
                <p className={`text-[9px] font-bold ${isDarkMode ? "text-emerald-400" : "text-slate-500"}`}>المبلغ المقبوض</p>
                <p className={`text-base font-black ${isDarkMode ? "text-emerald-400" : "text-emerald-700"}`}>75,000 د.ع</p>
              </div>

              <p className={`text-[9px] text-center pt-0.5 ${isDarkMode ? "text-gray-400" : "text-slate-500"}`}>
                شكراً لتسديدكم في الموعد المحدد!
              </p>
            </motion.div>
          )}

          {/* 2. عقد التقسيط (A4) */}
          {activeTab === "contract" && (
            <motion.div
              key="contract"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className={`w-full rounded-xl p-4 shadow-xl border space-y-3 text-right font-sans text-xs dir-rtl transition-colors ${
                isDarkMode 
                  ? "bg-[#16161e] text-white border-white/10" 
                  : "bg-white text-slate-900 border-slate-200"
              }`}
            >
              <div className={`border-b-2 pb-2 flex justify-between items-center ${isDarkMode ? "border-white/20" : "border-slate-900"}`}>
                <div>
                  <h4 className={`font-black text-xs ${isDarkMode ? "text-white" : "text-slate-900"}`}>مكتب النور للخدمات المالية</h4>
                  <p className={`text-[9px] ${isDarkMode ? "text-gray-400" : "text-slate-500"}`}>عقد بيع بالتقسيط والتزام تسديد</p>
                </div>
                <span className={`text-[9px] font-mono font-bold px-1.5 py-0.5 rounded border ${
                  isDarkMode ? "bg-white/5 border-white/10 text-gray-300" : "bg-slate-100 border-slate-300 text-slate-800"
                }`}>
                  FORM-A4
                </span>
              </div>

              <div className={`grid grid-cols-2 gap-1.5 p-2 rounded-lg text-[10px] border ${
                isDarkMode ? "bg-white/5 border-white/10" : "bg-slate-50 border-slate-200"
              }`}>
                <div>
                  <p className={`font-bold ${isDarkMode ? "text-orange-400" : "text-slate-900"}`}>البائع:</p>
                  <p className={isDarkMode ? "text-gray-300" : "text-slate-600"}>مكتب النور - المنصور</p>
                </div>
                <div>
                  <p className={`font-bold ${isDarkMode ? "text-orange-400" : "text-slate-900"}`}>العميل:</p>
                  <p className={isDarkMode ? "text-gray-300" : "text-slate-600"}>ali abd</p>
                </div>
              </div>

              <table className={`w-full text-center border text-[9px] ${isDarkMode ? "border-white/10" : "border-slate-200"}`}>
                <thead className={`font-bold border-b ${
                  isDarkMode ? "bg-white/5 border-white/10 text-gray-200" : "bg-slate-100 border-slate-200 text-slate-800"
                }`}>
                  <tr>
                    <th className={`p-1 border-r ${isDarkMode ? "border-white/10" : "border-slate-200"}`}>المادة</th>
                    <th className={`p-1 border-r ${isDarkMode ? "border-white/10" : "border-slate-200"}`}>الكلي</th>
                    <th className={`p-1 border-r ${isDarkMode ? "border-white/10" : "border-slate-200"}`}>المقدمة</th>
                    <th className="p-1">القسط</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className={`border-b ${isDarkMode ? "border-white/10 text-gray-300" : "border-slate-200 text-slate-800"}`}>
                    <td className={`p-1 border-r font-bold ${isDarkMode ? "border-white/10" : "border-slate-200"}`}>آيفون 15 برو</td>
                    <td className={`p-1 border-r ${isDarkMode ? "border-white/10" : "border-slate-200"}`}>1,800,000 د.ع</td>
                    <td className={`p-1 border-r ${isDarkMode ? "border-white/10" : "border-slate-200"}`}>300,000 د.ع</td>
                    <td className="p-1 font-bold text-orange-500">125,000 د.ع</td>
                  </tr>
                </tbody>
              </table>

              <div className={`pt-2 grid grid-cols-3 gap-1 text-center text-[9px] font-bold border-t ${
                isDarkMode ? "border-white/10 text-gray-400" : "border-slate-300 text-slate-700"
              }`}>
                <p>توقيع العميل</p>
                <p>توقيع الكفيل</p>
                <p>ختم البائع</p>
              </div>
            </motion.div>
          )}

          {/* 3. كشف حساب العميل */}
          {activeTab === "statement" && (
            <motion.div
              key="statement"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className={`w-full rounded-xl p-4 shadow-xl border space-y-3 text-right font-sans text-xs dir-rtl transition-colors ${
                isDarkMode 
                  ? "bg-[#16161e] text-white border-white/10" 
                  : "bg-white text-slate-900 border-slate-200"
              }`}
            >
              <div className={`border-b pb-2 flex justify-between items-center ${isDarkMode ? "border-white/10" : "border-slate-200"}`}>
                <div>
                  <h4 className={`font-black text-xs ${isDarkMode ? "text-white" : "text-slate-900"}`}>كشف حساب تفصيلي</h4>
                  <p className={`text-[9px] ${isDarkMode ? "text-gray-400" : "text-slate-500"}`}>العميل: ali abd</p>
                </div>
                <div className="text-left font-mono">
                  <span className="text-[9px] font-bold text-emerald-500 block">مسدد: 450,000 د.ع</span>
                  <span className="text-[9px] font-bold text-rose-500 block">متبقي: 1,050,000 د.ع</span>
                </div>
              </div>

              <table className={`w-full text-center border text-[9px] ${isDarkMode ? "border-white/10" : "border-slate-200"}`}>
                <thead className={`font-bold border-b ${
                  isDarkMode ? "bg-white/5 border-white/10 text-gray-200" : "bg-slate-100 border-slate-200 text-slate-800"
                }`}>
                  <tr>
                    <th className={`p-1 border-r ${isDarkMode ? "border-white/10" : "border-slate-200"}`}>التاريخ</th>
                    <th className={`p-1 border-r ${isDarkMode ? "border-white/10" : "border-slate-200"}`}>المادة</th>
                    <th className={`p-1 border-r ${isDarkMode ? "border-white/10" : "border-slate-200"}`}>المبلغ</th>
                    <th className="p-1">الحالة</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className={`border-b ${isDarkMode ? "border-white/10 text-gray-300" : "border-slate-200 text-slate-800"}`}>
                    <td className={`p-1 border-r ${isDarkMode ? "border-white/10" : "border-slate-200"}`}>2026/08/01</td>
                    <td className={`p-1 border-r ${isDarkMode ? "border-white/10" : "border-slate-200"}`}>آيفون 15</td>
                    <td className={`p-1 border-r font-bold text-emerald-500 ${isDarkMode ? "border-white/10" : "border-slate-200"}`}>75,000 د.ع</td>
                    <td className="p-1 font-bold text-emerald-500">مدفوع 🟢</td>
                  </tr>
                  <tr className={`border-b ${isDarkMode ? "border-white/10 text-gray-300" : "border-slate-200 text-slate-800"}`}>
                    <td className={`p-1 border-r ${isDarkMode ? "border-white/10" : "border-slate-200"}`}>2026/09/01</td>
                    <td className={`p-1 border-r ${isDarkMode ? "border-white/10" : "border-slate-200"}`}>آيفون 15</td>
                    <td className={`p-1 border-r font-bold text-emerald-500 ${isDarkMode ? "border-white/10" : "border-slate-200"}`}>75,000 د.ع</td>
                    <td className="p-1 font-bold text-emerald-500">مدفوع 🟢</td>
                  </tr>
                </tbody>
              </table>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  );
}