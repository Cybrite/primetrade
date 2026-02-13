import Task from "../models/Task.js";
import { successResponse, errorResponse } from "../utils/responseHandler.js";

/**
 * @desc    Get all tasks
 * @route   GET /api/v1/tasks
 * @access  Private
 */
export const getTasks = async (req, res, next) => {
  try {
    const { status, priority, sortBy = "-createdAt" } = req.query;

    let query = {};

    if (req.user.role !== "admin") {
      query.user = req.user.id;
    }

    if (status) {
      query.status = status;
    }

    if (priority) {
      query.priority = priority;
    }

    const tasks = await Task.find(query)
      .populate("user", "name email")
      .sort(sortBy);

    return successResponse(res, "Tasks retrieved successfully", {
      count: tasks.length,
      tasks,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get single task
 * @route   GET /api/v1/tasks/:id
 * @access  Private
 */
export const getTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id).populate(
      "user",
      "name email",
    );

    if (!task) {
      return errorResponse(res, "Task not found", 404);
    }

    if (task.user._id.toString() !== req.user.id && req.user.role !== "admin") {
      return errorResponse(res, "Not authorized to access this task", 403);
    }

    return successResponse(res, "Task retrieved successfully", { task });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Create new task
 * @route   POST /api/v1/tasks
 * @access  Private
 */
export const createTask = async (req, res, next) => {
  try {
    req.body.user = req.user.id;

    const task = await Task.create(req.body);

    return successResponse(res, "Task created successfully", { task }, 201);
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update task
 * @route   PUT /api/v1/tasks/:id
 * @access  Private
 */
export const updateTask = async (req, res, next) => {
  try {
    let task = await Task.findById(req.params.id);

    if (!task) {
      return errorResponse(res, "Task not found", 404);
    }

    if (task.user.toString() !== req.user.id && req.user.role !== "admin") {
      return errorResponse(res, "Not authorized to update this task", 403);
    }

    task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    return successResponse(res, "Task updated successfully", { task });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Delete task
 * @route   DELETE /api/v1/tasks/:id
 * @access  Private
 */
export const deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return errorResponse(res, "Task not found", 404);
    }

    if (task.user.toString() !== req.user.id && req.user.role !== "admin") {
      return errorResponse(res, "Not authorized to delete this task", 403);
    }

    await task.deleteOne();

    return successResponse(res, "Task deleted successfully", null);
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get task statistics
 * @route   GET /api/v1/tasks/stats
 * @access  Private (Admin only)
 */
export const getTaskStats = async (req, res, next) => {
  try {
    const stats = await Task.aggregate([
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 },
        },
      },
    ]);

    const totalTasks = await Task.countDocuments();

    return successResponse(res, "Task statistics retrieved successfully", {
      totalTasks,
      stats,
    });
  } catch (error) {
    next(error);
  }
};
