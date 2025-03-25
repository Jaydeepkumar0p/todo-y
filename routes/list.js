import User from '../models/user.js';
import List from '../models/list.js';
import express from 'express';

const router = express.Router();

// Add a Task
router.post('/addTask', async (req, res) => {
    try {
        const { title, body, id } = req.body;

        // Find the user by ID
        const existingUser = await User.findOne({ _id: id });
        if (!existingUser) {
            return res.status(404).json({ message: "User not found" });
        }

        // Create and save the new task
        const newList = new List({ title, body, user: existingUser._id });
        await newList.save();

        // Push task into user's list and save user
        existingUser.lists.push(newList._id);
        await existingUser.save();

        res.status(200).json({ message: "Task added successfully", list: newList });
    } catch (err) {
        res.status(500).json({ message: "Internal server error", error: err.message });
    }
});

// Update a Task
router.put('/updateTask/:id', async (req, res) => {
    try {
        const { title, body } = req.body;

        // Find and update the task
        const updatedTask = await List.findByIdAndUpdate(
            req.params.id,
            { title, body },
            { new: true } // Return updated document
        );

        if (!updatedTask) {
            return res.status(404).json({ message: "Task not found" });
        }

        res.status(200).json({ message: "Task updated successfully", list: updatedTask });
    } catch (err) {
        res.status(500).json({ message: "Internal server error", error: err.message });
    }
});

// Delete a Task
router.delete('/deleteTask/:id', async (req, res) => {
    try {
        const { id: userId } = req.body;

        // Find and update the user by removing the task from their list
        const existingUser = await User.findOneAndUpdate(
            { _id: userId },
            { $pull: { lists: req.params.id } },
            { new: true }
        );

        if (!existingUser) {
            return res.status(404).json({ message: "User not found" });
        }

        // Delete the task
        const deletedTask = await List.findByIdAndDelete(req.params.id);
        if (!deletedTask) {
            return res.status(404).json({ message: "Task not found" });
        }

        res.status(200).json({ message: "Task deleted successfully", list: deletedTask });
    } catch (err) {
        res.status(500).json({ message: "Internal server error", error: err.message });
    }
});

// Get Tasks for a User
router.get('/getTasks/:id', async (req, res) => {
    try {
        // Fetch tasks associated with the user and sort by creation date
        const tasks = await List.find({ user: req.params.id }).sort({ createdAt: -1 });

        res.status(200).json({
            message: tasks.length ? "Tasks fetched successfully" : "No tasks found",
            list: tasks
        });
    } catch (err) {
        res.status(500).json({ message: "Internal server error", error: err.message });
    }
});

export default router;
