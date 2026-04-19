import mongoose, { Schema, Document, Model } from 'mongoose';

export interface INote extends Document {
  title: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

const NoteSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
  },
  { timestamps: true }
);

const Note: Model<INote> = mongoose.models.Note || mongoose.model<INote>('Note', NoteSchema);

export default Note;
