import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { name, phone, message } = await req.json();

    const data = await resend.emails.send({
      from: 'Aqsatak System <onboarding@resend.dev>', // تغيير اسم المرسل
      to: ['aqsatakofficial@gmail.com'],
      replyTo: 'aqsatakofficial@gmail.com', // يمنح موثوقية أعلى لمفلتر Gmail
      subject: `طلب تواصل جديد من: ${name}`,
      html: `
        <div dir="rtl" style="font-family: Arial, sans-serif; line-height: 1.6; padding: 20px; color: #333333;">
          <h2 style="color: #ea580c;">طلب تواصل جديد (منظومة أقساطك)</h2>
          <hr style="border: 0; border-top: 1px solid #cccccc;" />
          <p><strong>الاسم / الشركة:</strong> ${name}</p>
          <p><strong>رقم الهاتف:</strong> <span dir="ltr">${phone}</span></p>
          <p><strong>تفاصيل الطلب:</strong></p>
          <div style="background-color: #f1f5f9; padding: 15px; border-radius: 8px; border: 1px solid #cbd5e1;">
            ${message}
          </div>
        </div>
      `,
    });

    return NextResponse.json({ success: true, data });
  } catch (error) {
    return NextResponse.json({ success: false, error }, { status: 500 });
  }
}