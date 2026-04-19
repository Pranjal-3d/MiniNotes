import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Note from '@/models/Note';

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const body = await request.json();
    await dbConnect();
    
    const { id } = await params;
    
    const note = await Note.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });
    
    if (!note) {
      return NextResponse.json({ success: false, error: 'Note not found' }, { status: 404 });
    }
    
    return NextResponse.json({ success: true, data: note });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to update note' },
      { status: 400 }
    );
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await dbConnect();
    const { id } = await params;
    const note = await Note.findByIdAndDelete(id);
    
    if (!note) {
      return NextResponse.json({ success: false, error: 'Note not found' }, { status: 404 });
    }
    
    return NextResponse.json({ success: true, data: {} });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to delete note' },
      { status: 400 }
    );
  }
}
