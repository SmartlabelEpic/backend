import Team from './model.js';

// Create a new team
export const createTeam = async (req, res) => {
  try {
    const { name, members, accessLevel } = req.body;
    const newTeam = new Team({ name, members, accessLevel, createdBy: req.user.id });
    await newTeam.save();
    res.status(201).json(newTeam);
  } catch (error) {
    res.status(500).json({ message: 'Error creating team', error });
  }
};

// Get all teams
export const getAllTeams = async (req, res) => {
  try {
    const teams = await Team.find().populate('members createdBy');
    res.status(200).json(teams);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching teams', error });
  }
};

// Get a team by ID
export const getTeamById = async (req, res) => {
  try {
    const { id } = req.params;
    const team = await Team.findById(id).populate('members createdBy');
    if (!team) return res.status(404).json({ message: 'Team not found' });
    res.status(200).json(team);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching team', error });
  }
};

// Update a team
export const updateTeam = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, members, accessLevel } = req.body;
    const updatedTeam = await Team.findByIdAndUpdate(id, { name, members, accessLevel }, { new: true });
    if (!updatedTeam) return res.status(404).json({ message: 'Team not found' });
    res.status(200).json(updatedTeam);
  } catch (error) {
    res.status(500).json({ message: 'Error updating team', error });
  }
};

// Delete a team
export const deleteTeam = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTeam = await Team.findByIdAndDelete(id);
    if (!deletedTeam) return res.status(404).json({ message: 'Team not found' });
    res.status(200).json({ message: 'Team deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting team', error });
  }
};
