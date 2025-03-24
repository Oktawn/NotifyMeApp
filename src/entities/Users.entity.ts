import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { TasksEntity } from "./Tasks.entity";


@Entity("users")
export class UsersEntity {

  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @OneToMany(() => TasksEntity, task => task.user)
  tasks: TasksEntity[];
}