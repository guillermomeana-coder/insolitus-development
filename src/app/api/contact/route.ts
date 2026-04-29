import { NextRequest, NextResponse } from 'next/server';
import { getDatabase } from '@/lib/mongodb';
import { Resend } from 'resend';

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;
const CONTACT_EMAIL = process.env.CONTACT_EMAIL || 'insolitusdevelopment@gmail.com';

function sanitize(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .trim();
}

function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, message, language, honeypot } = body;

    if (honeypot) {
      return NextResponse.json({ success: true });
    }

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required' },
        { status: 400 }
      );
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    if (name.length > 100 || email.length > 100 || message.length > 5000) {
      return NextResponse.json(
        { error: 'Field length exceeds maximum allowed' },
        { status: 400 }
      );
    }

    const sanitizedContact = {
      name: sanitize(name),
      email: sanitize(email),
      message: sanitize(message),
      language: language === 'es' ? 'es' : 'en',
      createdAt: new Date(),
      status: 'new',
    };

    // Save to MongoDB
    let dbSaved = false;
    try {
      const db = await getDatabase();
      const result = await db.collection('contacts').insertOne(sanitizedContact);
      dbSaved = result.acknowledged;
    } catch (dbError) {
      console.error('MongoDB save error:', dbError);
    }

    // Send email notification
    if (resend) {
      try {
        await resend.emails.send({
          from: 'Insolitus Website <onboarding@resend.dev>',
          to: [CONTACT_EMAIL],
          subject: `New Contact: ${sanitize(name)}`,
          html: `
            <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px;">
              <div style="border-bottom: 2px solid #A14A32; padding-bottom: 20px; margin-bottom: 30px;">
                <h1 style="color: #1A2530; font-size: 24px; margin: 0;">New Contact Form Submission</h1>
                <p style="color: #7A7369; font-size: 14px; margin-top: 8px;">insolitusdev.com</p>
              </div>
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 12px 0; color: #7A7369; font-size: 14px; width: 100px;">Name</td>
                  <td style="padding: 12px 0; color: #1A2530; font-size: 14px; font-weight: 500;">${sanitize(name)}</td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; color: #7A7369; font-size: 14px;">Email</td>
                  <td style="padding: 12px 0; color: #1A2530; font-size: 14px;">
                    <a href="mailto:${sanitize(email)}" style="color: #A14A32;">${sanitize(email)}</a>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; color: #7A7369; font-size: 14px;">Language</td>
                  <td style="padding: 12px 0; color: #1A2530; font-size: 14px;">${language === 'es' ? 'Español' : 'English'}</td>
                </tr>
              </table>
              <div style="background: #F6F6F6; padding: 20px; margin-top: 20px; border-left: 3px solid #A14A32;">
                <p style="color: #7A7369; font-size: 12px; margin: 0 0 8px 0; text-transform: uppercase; letter-spacing: 1px;">Message</p>
                <p style="color: #1A2530; font-size: 14px; line-height: 1.6; margin: 0; white-space: pre-wrap;">${sanitize(message)}</p>
              </div>
            </div>
          `,
        });
      } catch (emailError) {
        console.error('Email send error:', emailError);
      }
    }

    return NextResponse.json({ success: true, saved: dbSaved });
  } catch (error) {
    console.error('Contact API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const db = await getDatabase();
    const contacts = await db
      .collection('contacts')
      .find({})
      .sort({ createdAt: -1 })
      .limit(100)
      .toArray();

    const sanitizedContacts = contacts.map(({ _id, ...rest }) => ({
      id: _id.toString(),
      ...rest,
    }));

    return NextResponse.json(sanitizedContacts);
  } catch (error) {
    console.error('Contact GET error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
