"use client";

import React from "react";

export default function PromoVideo() {
  return (
    <div className="w-full max-w-5xl mx-auto my-8 p-2 rounded-2xl bg-gradient-to-r from-amber-500/20 via-slate-800 to-amber-500/20 border border-amber-500/30 shadow-2xl backdrop-blur-md">
      <div className="relative w-full overflow-hidden rounded-xl bg-black aspect-video">
        <video
          className="w-full h-full object-cover"
          controls
          autoPlay
          muted
          loop
          playsInline
          poster="/logo.png" // يمكنك استخدام اللوجو كغلاف قبل التشغيل
        >
          <source src="/heritage-transformation.mp4" type="video/mp4" />
          متصفحك لا يدعم تشغيل هذا الفيديو.
        </video>
      </div>
    </div>
  );
}