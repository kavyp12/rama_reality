// backend/src/controllers/leadController.ts
import { Request, Response } from 'express';
import Lead from '../models/Lead'; // Default import

// @desc    Create a new lead
// @route   POST /api/leads
export const createLead = async (req: Request, res: Response) => {
  try {
    const { name, phone, email, projectId, source } = req.body;

    // 1. Validation now only requires name, phone, and email
    if (!name || !phone || !email) {
      return res.status(400).json({
        success: false,
        error: 'Please provide name, phone, and email',
      });
    }

    // 2. CHECK FOR DUPLICATES (handles optional project)
    let duplicateQuery: any = {
      $or: [{ phone: phone }, { email: email }],
    };

    if (projectId) {
      // If project is provided, check for duplicate ON THAT PROJECT
      duplicateQuery.project = projectId;
    } else {
      // If no project, check for duplicate "general inquiry" (project is null)
      duplicateQuery.project = null;
    }

    const existingLead = await Lead.findOne(duplicateQuery);

    if (existingLead) {
      const projectMsg = projectId ? `for project ${projectId}` : '(general inquiry)';
      console.log(`ℹ️ Duplicate lead attempt: ${name} ${projectMsg}`);
      // Return success so the frontend modal shows "Thank You"
      return res.status(200).json({
        success: true,
        message: 'Lead already registered.',
        data: existingLead,
      });
    }

    // 3. Create lead data object
    const leadData: any = {
      name,
      phone,
      email,
      source: source || 'Unknown', // Default source if not provided
    };

    // Only add project to data if it exists
    if (projectId) {
      leadData.project = projectId;
    }

    const lead = await Lead.create(leadData);

    const projectMsg = projectId ? `for project ${projectId}` : '(general inquiry)';
    console.log(`✅ New lead created: ${lead.name} ${projectMsg}`);
    res.status(201).json({
      success: true,
      data: lead,
    });
  } catch (error: any) {
    console.error('❌ Error creating lead:', error.message);
    res.status(500).json({
      success: false,
      error: 'Server Error',
      message: error.message,
    });
  }
};

// @desc    Get all leads (for admin)
// @route   GET /api/leads
export const getAllLeads = async (req: Request, res: Response) => {
  try {
    const leads = await Lead.find({})
      .populate('project', 'name city area') // Populate project info
      .sort({ createdAt: -1 }); // Newest first

    console.log(`✅ Fetched ${leads.length} leads for admin`);
    res.status(200).json({
      success: true,
      count: leads.length,
      data: leads,
    });
  } catch (error: any) {
    console.error('❌ Error fetching leads:', error.message);
    res.status(500).json({
      success: false,
      error: 'Server Error',
      message: error.message,
    });
  }
};

// @desc    Update Lead Status
// @route   PUT /api/leads/:id/status
export const updateLeadStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status || !['New', 'Consulted', 'Pending'].includes(status)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid status provided',
      });
    }

    const lead = await Lead.findById(id);

    if (!lead) {
      return res.status(404).json({
        success: false,
        error: 'Lead not found',
      });
    }

    lead.status = status as 'New' | 'Consulted' | 'Pending';
    await lead.save();

    console.log(`✅ Updated lead ${id} status to ${status}`);
    res.status(200).json({
      success: true,
      data: lead,
    });
  } catch (error: any) {
    console.error('❌ Error updating lead status:', error.message);
    res.status(500).json({
      success: false,
      error: 'Server Error',
      message: error.message,
    });
  }
};

// @desc    Get Lead Statistics
// @route   GET /api/leads/stats/all
export const getLeadStats = async (req: Request, res: Response) => {
  try {
    const totalLeads = await Lead.countDocuments();
    const newLeads = await Lead.countDocuments({ status: 'New' });
    const pendingLeads = await Lead.countDocuments({ status: 'Pending' });
    const consultedLeads = await Lead.countDocuments({ status: 'Consulted' });
    
    // const totalProjects = await Project.countDocuments(); // You would uncomment and import Project model

    console.log(`✅ Fetched stats for super admin`);
    res.status(200).json({
      success: true,
      data: {
        totalLeads,
        newLeads,
        pendingLeads,
        consultedLeads,
        totalProjects: 0, // Placeholder: replace with totalProjects
      },
    });
  } catch (error: any) {
    console.error('❌ Error fetching stats:', error.message);
    res.status(500).json({
      success: false,
      error: 'Server Error',
      message: error.message,
    });
  }
};