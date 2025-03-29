import { IsDate, IsEnum, IsNotEmpty, IsString } from "class-validator";
import { enumStatusTasks } from "../enums";


class TaskDTO {
  @IsString()
  title?: string;

  @IsString()
  description?: string;

  @IsEnum(enumStatusTasks)
  status?: enumStatusTasks;
}


class CreateTaskDTO extends TaskDTO {

  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsDate()
  remainderTime?: Date;
}

class UpdateTaskDTO extends TaskDTO {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  userId: string;

}


export {
  TaskDTO,
  CreateTaskDTO,
  UpdateTaskDTO,
}