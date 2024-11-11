const DailyReports = require('../../Database/Models/dailyReports');
const User = require('../../Database/Models/user');
const Task = require('../../Database/Models/task');

// Create a new DailyReports entry
const createReport = async (req, res) => {
  const { userId, taskName, tasks, status } = req.body;

  try {
    // Check if user exists
    if (userId) {
      const user = await User.findOne({ where: { id: userId } });
      if (!user) {
        return res.status(404).json({ message: 'User does not exist.' });
      }
    } else {
      return res.status(400).json({ message: 'User ID is required.' });
    }

    // Validation for tasks: Ensure it's a valid JSON object or array
    let parsedTasks = [];
    if (tasks) {
      // If tasks is not an array or an object, treat it as an empty array
      if (typeof tasks !== 'object') {
        try {
          parsedTasks = JSON.parse(tasks);
        } catch (error) {
          return res.status(400).json({ message: 'Tasks must be a valid JSON object or array.' });
        }
      } else {
        parsedTasks = tasks;  // If it's already a valid object/array, use it as is
      }
    }

    // Ensure taskName and status are strings
    if (taskName && typeof taskName !== 'string') {
      return res.status(400).json({ message: 'Task name must be a string.' });
    }

    if (status && typeof status !== 'string') {
      return res.status(400).json({ message: 'Status must be a string.' });
    }

    // Create a new report entry in the database
    const newReport = await DailyReports.create({
      userId,
      taskName: taskName || null,
      tasks: JSON.stringify(parsedTasks) || null,  // Ensure tasks is stringified
      status: status || 'In Progress',
    });

    // Fetch the newly created report entry including tasks field
    const createdReport = await DailyReports.findOne({
      where: { id: newReport.id },
      attributes: ['id', 'userId', 'taskName', 'tasks', 'status', 'createdAt', 'updatedAt'],
    });

    // Return the newly created report entry with tasks included
    res.status(201).json({
      message: 'New Report Entry Created Successfully.',
      newReport: createdReport
    });

  } catch (error) {
    console.error('Error creating task:', error);
    return res.status(500).json({ message: 'Error creating task.', error: error.message });
  }
};



// Get all DailyReports entries
const getAllReports = async (req, res) => {
  try {
    const dailyReports = await DailyReports.findAll();
    res.status(200).json(dailyReports);
  } catch (error) {
    console.error('Error retrieving DailyReports entries:', error);
    return res.status(500).json({ message: 'Error retrieving DailyReports Entries.' });
  }
};

// Get a DailyReports entry by ID
const getReportByID = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ message: 'ID parameter is required.' });
  }
  try {
    const dailyReport = await DailyReports.findOne({
      where: { id }
    });
    if (!dailyReport) {
      return res.status(404).json({ message: 'Entry Not Found' });
    }
    return res.status(200).json(dailyReport);
  } catch (error) {
    console.error('Error retrieving entry:', error);
    return res.status(500).json({ message: 'Error retrieving Entry.' });
  }
};

// Delete a DailyReports entry by ID
const deleteReportByID = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: 'ID parameter is required.' });
  }

  try {
    const dailyReport = await DailyReports.findOne({
      where: { id }
    });
    if (!dailyReport) {
      return res.status(404).json({ message: 'Entry Not Found' });
    }

    await dailyReport.destroy();
    return res.status(200).json("Entry deleted Successfully");
  } catch (error) {
    console.error('Error retrieving entry:', error);
    return res.status(500).json({ message: 'Error retrieving Entry.' });
  }
};

//Get DailyReports entries by UserID
const getReportsByUserID = async (req, res) => {
  const { userId } = req.params;
  if (!userId) {
    return res.status(400).json({ message: 'UserId is required.' });
  }
  try {
    if (userId) {
      const user = await User.findOne({
        where: { id: userId }
      });
      if (!user) {
        return res.status(404).json({ message: 'User does not exist.' });
      }
    }

    const entries = await DailyReports.findAll({ where: { userId } });
    return res.status(200).json(entries);
  } catch (error) {
    console.error('Error retrieving Entries by UserID:', error);
    return res.status(500).json({ message: 'Error retrieving Entries by UserId.' });

  }


}

module.exports = {
  createReport,
  getAllReports,
  getReportByID,
  deleteReportByID,
  getReportsByUserID
}
