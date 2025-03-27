import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn, Timestamp } from "typeorm";
import { UsersEntity } from "./Users.entity";

@Entity("refresh_tokens")
export class RefreshTokensEntity {

  @PrimaryColumn()
  token: string;

  @OneToOne(() => UsersEntity)
  @JoinColumn()
  user: UsersEntity;

  @Column({ type: "timestamp" })
  expires_at: Timestamp;
}