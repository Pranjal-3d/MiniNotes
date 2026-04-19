import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Note from '@/models/Note';

export async function GET() {
  try {
    await dbConnect();
    const notes = await Note.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: notes });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch notes' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    await dbConnect();
    const note = await Note.create(body);
    return NextResponse.json({ success: true, data: note }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to create note' },
      { status: 400 }
    );
  }
}
