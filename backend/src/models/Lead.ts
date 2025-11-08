// backend/src/models/Lead.ts
import mongoose, { Document, Schema, Model } from 'mongoose';

export interface ILead extends Document {
  name: string;
  phone: string;
  email: string;
  project?: mongoose.Types.ObjectId; // 👈 CHANGED: Made optional
  status: 'New' | 'Consulted' | 'Pending';
  source?: string;
  createdAt: Date;
}

const LeadSchema = new Schema<ILead>(
  {
    name: { type: String, required: [true, 'Please provide a name'] },
    phone: { type: String, required: [true, 'Please provide a phone number'] },
    email: { type: String, required: [true, 'Please provide an email'] },
    project: {
      type: Schema.Types.ObjectId,
      ref: 'Project',
      required: false, // 👈 CHANGED: from true to false
    },
    status: {
      type: String,
      enum: ['New', 'Consulted', 'Pending'],
      default: 'New',
    },
    source: { type: String, required: false }, // Source is optional
  },
  {
    timestamps: true, // This will add `createdAt` and `updatedAt`
  }
);

const Lead: Model<ILead> = mongoose.models.Lead || mongoose.model<ILead>('Lead', LeadSchema);

export default Lead;