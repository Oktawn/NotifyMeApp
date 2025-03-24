import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from "typeorm";
import { UsersEntity } from "./Users.entity";

@Entity("refresh_tokens")
export class RefreshTokensEntity {

  @PrimaryColumn()
  token: string;

  @OneToOne(() => UsersEntity)
  @JoinColumn()
  user: UsersEntity;

  @Column()
  expires_at: Date;
}