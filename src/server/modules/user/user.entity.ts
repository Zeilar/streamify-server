import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";
import { UserSchema } from "../../@types/user";

@Entity()
export class User implements UserSchema {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public displayName: string;

    @Column({ unique: true, type: "text" })
    public email: string;

    @Column()
    public password: string;

    @Column({ type: "timestamp" })
    public createdAt: Date;

    @Column({ type: "timestamp" })
    public updatedAt: Date;
}
