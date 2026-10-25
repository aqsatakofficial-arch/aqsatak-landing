// تهيئة تطبيق Firebase الأساسي
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth"; // 1. استيراد getAuth



// جلب المفاتيح من إعدادات Firebase الخاص بك
const firebaseConfig = {
  apiKey: "AIzaSyC23GI1JxW_tc-7iCB3wNqGHaB_ePVY5fY",
  authDomain: "aqsatak-team.firebaseapp.com",
  projectId: "aqsatak-team",
  storageBucket: "aqsatak-team.firebasestorage.app",
  messagingSenderId: "752420244346",
  appId: "1:752420244346:web:ea49be5b4d461203bc64c3",
  measurementId: "G-SQJ0VB9399"
};
// تهيئة التطبيق لمرة واحدة فقط لمنع التكرار
const firebaseApp = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export const db = getFirestore(firebaseApp);
export const auth = getAuth(firebaseApp);