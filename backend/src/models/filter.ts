// backend/models/FilterOption.ts
import mongoose, { Document, Schema, Model } from 'mongoose';

export interface IFilterOption extends Document {
  localities: string[];
  cities: string[];
  states: string[];
  bhk: string[];
  possession: string[];
  propertyType: string[];
  sortBy: string[];
  useManualOverride: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const FilterOptionSchema = new Schema<IFilterOption>(
  {
    localities: {
      type: [String],
      default: []
    },
    cities: {
      type: [String],
      default: []
    },
    states: {
      type: [String],
      default: []
    },
    bhk: {
      type: [String],
      default: ['1 BHK', '2 BHK', '3 BHK', '4 BHK', '5 BHK']
    },
    possession: {
      type: [String],
      default: ['Ready to Move', 'Upto 1 Year', 'Upto 2 Years', '2+ Years']
    },
    propertyType: {
      type: [String],
      default: ['Flat', 'Villa', 'House', 'Penthouse', 'Duplex']
    },
    sortBy: {
      type: [String],
      default: ['Relevance', 'New Launch', 'Price: Low to High', 'Price: High to Low', 'Near Possession']
    },
    useManualOverride: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
);

const FilterOption: Model<IFilterOption> = 
  mongoose.models.FilterOption || 
  mongoose.model<IFilterOption>('FilterOption', FilterOptionSchema);

export default FilterOption;