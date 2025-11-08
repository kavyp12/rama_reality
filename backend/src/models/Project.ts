// src/models/Project.ts

import mongoose, { Document, Schema, Model } from 'mongoose';

// ... (FloorPlanSchema, OverviewSchema, AmenitySchema, LocationDataSchema, NearbySchema remain the same) ...
const FloorPlanSchema = new Schema({
  type: String,
  image: String,
  area: String,
  price: String,
  pricePerSqFt: String, 
  details: {
    beds: Number,
    baths: Number,
    balconies: Number,
    parking: Number,
  },
});

const OverviewSchema = new Schema({
  propertyType: String,
  totalArea: String,
  possessionDate: String,
  totalUnits: String,
  purchaseType: String,
  residenceType: String,
  projectStage: String,
  launchDate: String,
});

const AmenitySchema = new Schema({
  name: String,
  icon: String,
});

const LocationDataSchema = new Schema({
  coordinates: String,
  address: String,
  googleMapsUrl: String,
  mapImage: String,
});

const NearbySchema = new Schema({
  category: String,
  name: String,
  distance: String,
  icon: String,
});

// ❌ REMOVE THIS
// const SimilarProjectSchema = new Schema({
//   name: String,
//   developer: String,
//   price: String,
//   configuration: String,
//   area: String,
//   possession: String,
//   image: String,
// });

const ConfigurationSchema = new Schema({
  type: { type: String, required: true },
  area: { type: String, required: true },
  price: { type: String, required: true },
});

const TowerDetailSchema = new Schema({
  tower: String,
  bedroom: String,
  unitsOfFloor: String,
  lift: String,
  storey: String,
});

// Interface Definition
export interface IProject extends Document {
  name: string;
  description: string;
  developer: string;
  status: string;
  reraId?: string;
  videoUrl?: string; 
  image: string;
  brochureUrl?: string; 
  heroImages: string[];
  configurations: mongoose.InferSchemaType<typeof ConfigurationSchema>[]; 
  floorPlans: mongoose.InferSchemaType<typeof FloorPlanSchema>[];
  overview: mongoose.InferSchemaType<typeof OverviewSchema>;
  towerDetails: mongoose.InferSchemaType<typeof TowerDetailSchema>[];
  keyFeatures: string[];
  amenities: mongoose.InferSchemaType<typeof AmenitySchema>[];
  locationData: mongoose.InferSchemaType<typeof LocationDataSchema>;
  nearby: mongoose.InferSchemaType<typeof NearbySchema>[];
  
  // 🌟 CHANGE THIS: It's an array of references (IDs)
  similarProjects: mongoose.Types.ObjectId[];

  builder: string;
  price: string;
  bhk: string;
  possession: string;
  state: string;
  city: string;
  area: string;
  slug: string;
  about: string;
}

const ProjectSchema = new Schema<IProject>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    developer: { type: String, required: true },
    status: { type: String, required: true },
    reraId: String,
    brochureUrl: String,
    videoUrl: String, 
    image: { type: String, required: true },
    heroImages: [String],
    configurations: [ConfigurationSchema], 
    floorPlans: [FloorPlanSchema], 
    overview: OverviewSchema,
    towerDetails: [TowerDetailSchema],
    keyFeatures: [String],
    amenities: [AmenitySchema],
    locationData: LocationDataSchema,
    nearby: [NearbySchema],
    
    // 🌟 CHANGE THIS: Store an array of ObjectIds referencing the 'Project' model
    similarProjects: [{
      type: Schema.Types.ObjectId,
      ref: 'Project'
    }],

    builder: String,
    price: String,
    bhk: String,
    possession: String,
    city: { type: String, required: true },
    state: { type: String, required: true },
    area: { type: String, required: true },
    slug: { type: String, unique: true, required: true },
    about: { type: String },
  },
  {
    timestamps: true,
  }
);

const Project: Model<IProject> = mongoose.models.Project || mongoose.model<IProject>('Project', ProjectSchema);

export default Project;