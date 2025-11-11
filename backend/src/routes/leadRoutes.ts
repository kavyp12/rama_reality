// backend/src/routes/leadRoutes.ts
import express from 'express';
import {
  createLead,
  getAllLeads,
  updateLeadStatus,
  deleteLead,  // 👈 Import the new function
  getLeadStats,
} from '../controllers/leadController';

const router = express.Router();

router.post('/', createLead);
router.get('/', getAllLeads);
router.put('/:id/status', updateLeadStatus);
router.delete('/:id', deleteLead);  // 👈 Add this route
router.get('/stats/all', getLeadStats);

export default router;