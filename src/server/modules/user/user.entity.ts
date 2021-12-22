import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { UserSchema } from "../../@types/user";
import { Video } from "../video/video.entity";

@Entity()
export class User implements UserSchema {
    @PrimaryGeneratedColumn()
    public id: number;

    @OneToMany(() => Video, (video) => video.user, { cascade: true })
    public videos: Video[];

    @Column()
    public displayName: string;

    @Column({ unique: true, type: "text" })
    public email: string;

    @Column()
    public password: string;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    public createdAt: string;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    public updatedAt: string;
}
