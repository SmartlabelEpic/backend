import express from 'express';
import { createTeam, getAllTeams, getTeamById, updateTeam, deleteTeam } from './controller.js';
import { isAdmin } from "../../middleware/auth.js";

const router = express.Router();

// Admin routes for team management
router.post('/teams', isAdmin, createTeam); // Only admin can create a team
router.get('/teams', getAllTeams); // Everyone can view all teams
router.get('/teams/:id', getTeamById); // Everyone can view a specific team
router.put('/teams/:id', isAdmin, updateTeam); // Only admin can update a team
router.delete('/teams/:id', isAdmin, deleteTeam); // Only admin can delete a team

export default router;
