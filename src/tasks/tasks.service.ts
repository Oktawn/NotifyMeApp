import { dataSource } from "../data-source";
import { TasksEntity } from "../entities/Tasks.entity";

const taskRepo = dataSource.getRepository(TasksEntity);

export class TasksService {


  async getOne(id: string) {
    const task = await taskRepo.findOne({ where: { id } });
    if (!task) {
      throw new Error("Task not found");
    }
    return task;
  }

  async getAll() {
    return taskRepo.find();
  }
}
