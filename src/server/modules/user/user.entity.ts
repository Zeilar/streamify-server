import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    displayName: string;

    @Column({ unique: true, type: "text" })
    email: string;

    @Column()
    password: string;

    @Column({ type: "timestamp" })
    createdAt: Date;

    @Column({ type: "timestamp" })
    updatedAt: Date;
}
