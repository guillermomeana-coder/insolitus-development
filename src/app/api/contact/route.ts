import { NextRequest, NextResponse } from 'next/server';
import { getDatabase } from '@/lib/mongodb';

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

    const db = await getDatabase();
    const result = await db.collection('contacts').insertOne(sanitizedContact);

    if (result.acknowledged) {
      return NextResponse.json({ success: true, id: result.insertedId.toString() });
    } else {
      return NextResponse.json(
        { error: 'Failed to save contact' },
        { status: 500 }
      );
    }
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
