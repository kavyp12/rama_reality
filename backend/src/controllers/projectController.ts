import { Request, Response } from 'express';
import slugify from 'slugify';
import Project from '../models/Project';

// ... (getAllProjects remains the same) ...
export const getAllProjects = async (req: Request, res: Response) => {
  try {
    console.log('📥 GET /api/projects - Fetching all projects...');

    const projects = await Project.find({}).sort({ createdAt: -1 });

    console.log(`✅ Found ${projects.length} projects`);

    res.status(200).json({
      success: true,
      count: projects.length,
      data: projects,
    });
  } catch (error: any) {
    console.error('❌ Error fetching projects:', error.message);
    res.status(500).json({
      success: false,
      error: 'Server Error',
      message: error.message,
    });
  }
};

// @desc    Get single project by ID
// @route   GET /api/projects/:id
export const getProjectById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    console.log(`📥 GET /api/projects/${id} - Fetching project...`);

    // 🌟 ADD .populate() HERE
    const project = await Project.findById(id).populate('similarProjects');

    if (!project) {
      console.log('❌ Project not found');
      return res.status(404).json({
        success: false,
        error: 'Project not found',
      });
    }

    console.log(`✅ Project found: ${project.name}`);

    res.status(200).json({
      success: true,
      data: project,
    });
  } catch (error: any) {
    console.error('❌ Error fetching project:', error.message);
    res.status(500).json({
      success: false,
      error: 'Server Error',
      message: error.message,
    });
  }
};

// @desc    Get project by slug (state/city/area/name)
// @route   GET /api/projects/slug/:state/:city/:area/:name
export const getProjectBySlug = async (req: Request, res: Response) => {
  try {
    const { state, city, area, name } = req.params;

    const slug = `${state}/${city}/${area}/${name}`;
    console.log(`📥 GET /api/projects/slug/${slug} - Fetching project...`);

    // 🌟 ADD .populate() HERE
    const project = await Project.findOne({ slug }).populate('similarProjects');

    if (!project) {
      console.log('❌ Project not found');
      return res.status(404).json({
        success: false,
        error: 'Project not found',
      });
    }

    console.log(`✅ Project found: ${project.name}`);

    res.status(200).json({
      success: true,
      data: project,
    });
  } catch (error: any) {
    console.error('❌ Error fetching project:', error.message);
    res.status(500).json({
      success: false,
      error: 'Server Error',
      message: error.message,
    });
  }
};

// ... (createProject, updateProject, deleteProject remain the same) ...
// (They will correctly save the array of IDs now, thanks to the model change)

export const createProject = async (req: Request, res: Response) => {
  try {
    console.log('📥 POST /api/projects - Creating new project...');
    console.log('Request body:', JSON.stringify(req.body, null, 2));

    const { name, description, developer, state, city, area } = req.body;

    // Validate required fields
    if (!name || !description || !developer || !state || !city || !area) {
      console.log('❌ Missing required fields');
      return res.status(400).json({
        success: false,
        error: 'Please provide name, description, developer, state, city, and area',
      });
    }

    const slug =
      `${slugify(state, { lower: true, strict: true })}/` +
      `${slugify(city, { lower: true, strict: true })}/` +
      `${slugify(area, { lower: true, strict: true })}/` +
      `${slugify(name, { lower: true, strict: true })}`;

    const project = await Project.create({ ...req.body, slug });

    console.log(`✅ Project created: ${project.name} (ID: ${project._id}, Slug: ${project.slug})`);

    res.status(201).json({
      success: true,
      data: project,
    });
  } catch (error: any) {
    console.error('❌ Error creating project:', error.message);

    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((err: any) => err.message);
      return res.status(400).json({
        success: false,
        error: 'Validation Error',
        messages,
      });
    }

    res.status(500).json({
      success: false,
      error: 'Server Error',
      message: error.message,
    });
  }
};

export const updateProject = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    console.log(`📥 PUT /api/projects/${id} - Updating project...`);

    let updateData = { ...req.body };

    if (req.body.state || req.body.city || req.body.area || req.body.name) {
      const currentProject = await Project.findById(id);
      if (!currentProject) {
        return res.status(404).json({ success: false, error: 'Project not found' });
      }

      const state = req.body.state || currentProject.state;
      const city = req.body.city || currentProject.city;
      const area = req.body.area || currentProject.area;
      const name = req.body.name || currentProject.name;

      updateData.slug =
        `${slugify(state, { lower: true, strict: true })}/` +
        `${slugify(city, { lower: true, strict: true })}/` +
        `${slugify(area, { lower: true, strict: true })}/` +
        `${slugify(name, { lower: true, strict: true })}`;
    }

    const project = await Project.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!project) {
      console.log('❌ Project not found');
      return res.status(404).json({
        success: false,
        error: 'Project not found',
      });
    }

    console.log(`✅ Project updated: ${project.name}`);

    res.status(200).json({
      success: true,
      data: project,
    });
  } catch (error: any) {
    console.error('❌ Error updating project:', error.message);
    res.status(500).json({
      success: false,
      error: 'Server Error',
      message: error.message,
    });
  }
};

export const deleteProject = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    console.log(`📥 DELETE /api/projects/${id} - Deleting project...`);

    const project = await Project.findByIdAndDelete(id);

    if (!project) {
      console.log('❌ Project not found');
      return res.status(404).json({
        success: false,
        error: 'Project not found',
      });
    }

    console.log(`✅ Project deleted: ${project.name}`);

    res.status(200).json({
      success: true,
      data: {},
      message: 'Project deleted successfully',
    });
  } catch (error: any) {
    console.error('❌ Error deleting project:', error.message);
    res.status(500).json({
      success: false,
      error: 'Server Error',
      message: error.message,
    });
  }
};