// backend/src/routes/leadRoutes.ts
import express from 'express';
import { 
  createLead, 
  getAllLeads, 
  updateLeadStatus, // 🌟 IMPORT
  getLeadStats      // 🌟 IMPORT
} from '../controllers/leadController';

const router = express.Router();

// Public route to create a lead
router.route('/').post(createLead);

// Admin route to get all leads
router.route('/').get(getAllLeads);

// 🌟 NEW: Super Admin route to get stats
// Place this before '/:id' to avoid 'stats' being read as an ID
router.route('/stats/all').get(getLeadStats);

// 🌟 NEW: Admin route to update lead status
router.route('/:id/status').put(updateLeadStatus);

export default router;