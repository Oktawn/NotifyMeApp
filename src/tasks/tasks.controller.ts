import { Router } from "express";
import { TasksService } from "./tasks.service";
import { CreateTaskDTO, UpdateTaskDTO } from "../commons/DTO/task.dto";

const tasksController = Router();
const tasksService = new TasksService();

tasksController.post("/create", async (req, res) => {
  try {
    const userId = (req as any).user.userId;
    const dataTask: CreateTaskDTO = {
      ...req.body,
      userId: userId
    }
    const task = await tasksService.createTask(dataTask);
    res.status(201).json(task);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

tasksController.put("/update", async (req, res) => {
  try {
    const userId = (req as any).user.userId;
    const dataTask: UpdateTaskDTO = {
      ...req.body,
      userId: userId
    }
    const task = await tasksService.updateTask(dataTask);
    res.status(200).json(task);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
tasksController.delete("/delete", async (req, res) => {
  try {
    const userId = (req as any).user.userId;
    const dataTask: UpdateTaskDTO = {
      ...req.body,
      userId: userId
    }
    const task = await tasksService.deleteTask(dataTask);
    res.status(200).json(task);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}
);
tasksController.get("/getOne", async (req, res) => {
  try {
    const userId = (req as any).user.userId;
    const dataTask: UpdateTaskDTO = {
      ...req.body,
      userId: userId
    }
    const task = await tasksService.getOne(dataTask);
    res.status(200).json(task);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}
);
tasksController.get("/getAll", async (req, res) => {
  try {
    const userId = (req as any).user.userId;
    const task = await tasksService.getAll(userId);
    res.status(200).json(task);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}
);

export { tasksController };