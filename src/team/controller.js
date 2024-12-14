import Team from './model.js';

// Create a new team
export const createTeam = async (req, res) => {
  try {
    const { name, members, accessLevel } = req.body;
    
    // Create a new team with the logged-in user's ID as the creator
    const newTeam = new Team({
      name,
      members,
      accessLevel,
      createdBy: req.user.id,
    });

    await newTeam.save();
    res.status(201).json(newTeam);
  } catch (error) {
    res.status(500).json({ message: 'Error creating team', error });
  }
};

// Get all teams created by the logged-in user
export const getAllTeams = async (req, res) => {
  try {
    const teams = await Team.find({ createdBy: req.user.id }).populate('members createdBy');
    res.status(200).json(teams);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching teams', error });
  }
};

// Get a team by ID (accessible only if the logged-in user is the creator)
export const getTeamById = async (req, res) => {
  try {
    const { id } = req.params;
    const team = await Team.findOne({ _id: id, createdBy: req.user.id }).populate('members createdBy');
    
    if (!team) return res.status(404).json({ message: 'Team not found' });
    res.status(200).json(team);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching team', error });
  }
};

// Update a team (only the creator can update their own team)
export const updateTeam = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, members, accessLevel } = req.body;

    // Ensure the team belongs to the logged-in user before updating
    const updatedTeam = await Team.findOneAndUpdate(
      { _id: id, createdBy: req.user.id }, // Check ownership
      { name, members, accessLevel },
      { new: true }
    );

    if (!updatedTeam) return res.status(404).json({ message: 'Team not found or you do not have permission to update' });

    res.status(200).json(updatedTeam);
  } catch (error) {
    res.status(500).json({ message: 'Error updating team', error });
  }
};

// Delete a team (only the creator can delete their own team)
export const deleteTeam = async (req, res) => {
  try {
    const { id } = req.params;

    // Ensure the team belongs to the logged-in user before deleting
    const deletedTeam = await Team.findOneAndDelete({ _id: id, createdBy: req.user.id });

    if (!deletedTeam) return res.status(404).json({ message: 'Team not found or you do not have permission to delete' });

    res.status(200).json({ message: 'Team deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting team', error });
  }
};
