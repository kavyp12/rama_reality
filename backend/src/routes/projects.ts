import express from 'express';
import {
  getAllProjects,
  getProjectById,
  getProjectBySlug, // 👈 IMPORT THIS
  createProject,
  updateProject,
  deleteProject,
} from '../controllers/projectController';

const router = express.Router();

router.route('/').get(getAllProjects).post(createProject);

// 👈 ADD THIS ROUTE for state/city/area/name
router.get('/slug/:state/:city/:area/:name', getProjectBySlug);

router.route('/:id').get(getProjectById).put(updateProject).delete(deleteProject);

export default router;