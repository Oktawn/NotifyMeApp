import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, Timestamp, UpdateDateColumn } from "typeorm";
import { enumStatusTasks } from "../commons/enums";
import { UsersEntity } from "./Users.entity";

@Entity("tasks")
export class TasksEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  title: string;

  @Column({ nullable: true })
  description: string;

  @Column({ type: "enum", enum: enumStatusTasks, default: enumStatusTasks.OPEN })
  status: string;

  @Column({ nullable: true })
  deadline: Date;

  @CreateDateColumn()
  created_at: Timestamp;

  @UpdateDateColumn()
  updated_at: Timestamp;

  @ManyToOne(() => UsersEntity, user => user.tasks)
  user: UsersEntity;


}