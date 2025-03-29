import { CreateTaskDTO, UpdateTaskDTO } from "../commons/DTO/task.dto";
import { dataSource } from "../data-source";
import { TasksEntity } from "../entities/Tasks.entity";

const taskRepo = dataSource.getRepository(TasksEntity);

export class TasksService {

  async createTask(task: CreateTaskDTO) {
    const newTask = taskRepo.create({ ...task, user: { id: task.userId } });
    taskRepo.save(newTask);
    return `Task created successfully`;
  }

  async updateTask(task: UpdateTaskDTO) {
    const { id, userId } = task;
    const isTaskExists = await taskRepo.findOne({ where: { id: id, user: { id: userId } } });
    if (!isTaskExists) {
      throw new Error("Task not found");
    }
    Object.assign(isTaskExists, task);
    taskRepo.save(isTaskExists);
    return `Task updated successfully`;

  }

  async deleteTask(task: UpdateTaskDTO) {
    const { id, userId } = task;
    const isTaskExists = await taskRepo.findOne({ where: { id: id, user: { id: userId } } });
    if (!isTaskExists) {
      throw new Error("Task not found");
    }
    taskRepo.delete({ id });
    return `Task deleted successfully`;
  }

  async getOne(task: UpdateTaskDTO) {
    const { id, userId } = task;
    const isTaskExists = await taskRepo.findOne({ where: { id: id, user: { id: userId } } });
    if (!isTaskExists) {
      throw new Error("Task not found");
    }
    return isTaskExists;
  }

  async getAll(userId: string) {
    return await taskRepo.find({ where: { user: { id: userId } } });
  }
}
