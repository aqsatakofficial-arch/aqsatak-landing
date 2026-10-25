"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Settings, RefreshCw, UserPlus, 
  ShieldCheck, CheckCircle2, ChevronDown, ChevronUp, 
  CloudUpload, Sparkles, Loader2, Bot, Trash2, UserCheck
} from "lucide-react";

interface SettingsManagementMockupProps {
  isDarkMode?: boolean;
}

export default function SettingsManagementMockup({ isDarkMode = true }: SettingsManagementMockupProps) {
  const [openSection, setOpenSection] = useState<string>("updates");
  const [activeToast, setActiveToast] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const [useAutoApi, setUseAutoApi] = useState(true);

  const [users, setUsers] = useState([
    { id: "1", name: "علي حسن", role: "موظف مبيعات", username: "ali_sales" },
    { id: "2", name: "عمر خالد", role: "محاسب صندوق", username: "omar_cash" }
  ]);

  const showToast = (msg: string) => {
    setActiveToast(msg);
    setTimeout(() => setActiveToast(""), 3000);
  };

  const handleCheckUpdate = () => {
    setIsUpdating(true);
    setTimeout(() => {
      setIsUpdating(false);
      showToast("تطبيق أقساطك محدّث لأحدث إصدار v1.0.1 تلقائياً!");
    }, 1500);
  };

  const removeUser = (id: string, name: string) => {
    setUsers(users.filter((u) => u.id !== id));
    showToast(`تم إلغاء صلاحيات الموظف (${name}) بنجاح.`);
  };

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
          <div className="w-10 h-10 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center shrink-0">
            <Settings className="w-5 h-5 text-purple-500" />
          </div>
          <div>
            <h3 className="text-base font-black flex items-center gap-2">
              مركز الإعدادات والأمان
              <span className="text-[10px] bg-purple-500/20 text-purple-500 border border-purple-500/30 px-2 py-0.5 rounded-full font-mono font-bold">
                SETTINGS
              </span>
            </h3>
            <p className={`text-xs font-medium ${isDarkMode ? "text-gray-400" : "text-slate-500"}`}>
              الصلاحيات، التحديثات، والتزامن السحابي
            </p>
          </div>
        </div>

        <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-bold ${
          isDarkMode ? "bg-white/5 border-white/10 text-gray-300" : "bg-slate-100 border-slate-200 text-slate-700"
        }`}>
          <ShieldCheck className="w-4 h-4 text-emerald-500" />
          <span>حساب المالك الرئيسي</span>
        </div>
      </div>

      <div className="space-y-3">
        {/* 1. قسم التحديثات */}
        <div className={`border rounded-2xl overflow-hidden transition-colors ${
          isDarkMode ? "border-white/10 bg-[#14141b]" : "border-slate-200 bg-slate-50"
        }`}>
          <button
            onClick={() => setOpenSection(openSection === "updates" ? "" : "updates")}
            className="w-full p-3 flex items-center justify-between text-right"
          >
            <div className="flex items-center gap-2 font-bold text-xs">
              <RefreshCw className="w-4 h-4 text-orange-500" />
              <span>التحديثات المباشرة للنظام</span>
            </div>
            {openSection === "updates" ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
          </button>

          {openSection === "updates" && (
            <div className={`p-3.5 border-t space-y-3 text-xs ${
              isDarkMode ? "border-white/5 bg-black/20" : "border-slate-200 bg-white"
            }`}>
              <div className="flex justify-between items-center">
                <span className={isDarkMode ? "text-gray-400" : "text-slate-500"}>الإصدار الحالي:</span>
                <span className="font-mono font-bold text-orange-500">v1.0.1 (Latest)</span>
              </div>
              <button
                onClick={handleCheckUpdate}
                disabled={isUpdating}
                className="w-full py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold rounded-xl flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
              >
                {isUpdating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                <span>فحص وجود تحديث جديد</span>
              </button>
            </div>
          )}
        </div>

        {/* 2. قسم الموظفين */}
        <div className={`border rounded-2xl overflow-hidden transition-colors ${
          isDarkMode ? "border-white/10 bg-[#14141b]" : "border-slate-200 bg-slate-50"
        }`}>
          <button
            onClick={() => setOpenSection(openSection === "users" ? "" : "users")}
            className="w-full p-3 flex items-center justify-between text-right"
          >
            <div className="flex items-center gap-2 font-bold text-xs">
              <UserPlus className="w-4 h-4 text-blue-500" />
              <span>إدارة الموظفين والصلاحيات ({users.length})</span>
            </div>
            {openSection === "users" ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
          </button>

          {openSection === "users" && (
            <div className={`p-3.5 border-t space-y-2 text-xs ${
              isDarkMode ? "border-white/5 bg-black/20" : "border-slate-200 bg-white"
            }`}>
              {users.map((u) => (
                <div key={u.id} className={`p-2 rounded-xl border flex items-center justify-between ${
                  isDarkMode ? "bg-white/5 border-white/5" : "bg-slate-50 border-slate-200"
                }`}>
                  <div className="flex items-center gap-2">
                    <UserCheck className="w-4 h-4 text-emerald-500" />
                    <div>
                      <p className="font-bold">{u.name}</p>
                      <p className={`text-[10px] font-mono ${isDarkMode ? "text-gray-400" : "text-slate-500"}`}>
                        @{u.username} • {u.role}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => removeUser(u.id, u.name)}
                    className="p-1.5 text-rose-500 hover:bg-rose-500/10 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 3. قسم أوتوماتيكية الواتساب و Google Drive */}
        <div className={`border rounded-2xl overflow-hidden transition-colors ${
          isDarkMode ? "border-white/10 bg-[#14141b]" : "border-slate-200 bg-slate-50"
        }`}>
          <button
            onClick={() => setOpenSection(openSection === "automation" ? "" : "automation")}
            className="w-full p-3 flex items-center justify-between text-right"
          >
            <div className="flex items-center gap-2 font-bold text-xs">
              <Bot className="w-4 h-4 text-emerald-500" />
              <span>ربط الواتساب والنسخ السحابي</span>
            </div>
            {openSection === "automation" ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
          </button>

          {openSection === "automation" && (
            <div className={`p-3.5 border-t space-y-3 text-xs ${
              isDarkMode ? "border-white/5 bg-black/20" : "border-slate-200 bg-white"
            }`}>
              <div className={`flex items-center justify-between p-2 rounded-xl border ${
                isDarkMode ? "bg-white/5 border-white/5" : "bg-slate-50 border-slate-200"
              }`}>
                <span className="font-bold">إرسال الواتساب تلقائياً:</span>
                <input
                  type="checkbox"
                  checked={useAutoApi}
                  onChange={(e) => {
                    setUseAutoApi(e.target.checked);
                    showToast(e.target.checked ? "تم تفعيل إرسال الواتساب التلقائي" : "تم تعطيل الإرسال التلقائي");
                  }}
                  className="w-4 h-4 accent-emerald-500 rounded"
                />
              </div>

              <button
                onClick={() => showToast("تم النسخ الاحتياطي التلقائي مع Google Drive بنجاح!")}
                className="w-full py-2 bg-blue-600/10 border border-blue-500/30 text-blue-500 rounded-xl font-bold flex items-center justify-center gap-1.5 hover:bg-blue-600/20 transition-colors"
              >
                <CloudUpload className="w-4 h-4 text-blue-500" />
                <span>مزامنة مع Google Drive</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}