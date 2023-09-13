import mongoose, { ObjectId, Schema } from 'mongoose';
import { ProjectSchema } from '../server';

const ProjectSchema = new Schema<ProjectSchema>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },

    stories: [
      {
        title: String,
        content: String,
        tone: { type: String, default: 'base' },
      },
    ],

    data: {
      parsed: {},
      contents: String,
      details: { file_name: String, file_size: String },
      file_url: String,
    },

    template: String,

    features: [
      {
        _id: { type: Schema.Types.ObjectId, unique: true },
        nameL: String,
        type: { type: String, enum: ['data', 'custom'], default: 'data' },
        field_ref: String,
        formula: String,
      },
    ],

    status: {
      id: Number,
      text: String,
      complete: Boolean,
    },

    user: { type: Schema.Types.ObjectId, ref: 'users' },
  },
  { collection: 'projects', timestamps: true }
);

const ProjectModel = mongoose.model('projects', ProjectSchema);

export default ProjectModel;
