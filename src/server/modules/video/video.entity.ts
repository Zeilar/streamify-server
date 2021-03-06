import { Entity, Column, PrimaryColumn, ManyToOne } from "typeorm";
import { User } from "../user/user.entity";
// import { VideoSchema, Visibility } from "../../@types/video";

export enum Visibility {
    PUBLIC = "public",
    UNLISTED = "unlisted",
}

export interface VideoSchema {
    id: string;
    title: string;
    visibility: Visibility;
    views: number;
    createdAt: string;
    updatedAt: string;
}

@Entity()
export class Video implements VideoSchema {
    @PrimaryColumn()
    public id: string;

    @ManyToOne(() => User, (user) => user.videos, { nullable: true })
    public user: User | null;

    @Column()
    public title: string;

    @Column({ type: "int", default: 0 })
    public views: number;

    @Column({ type: "enum", default: Visibility.PUBLIC, enum: Visibility })
    public visibility: Visibility;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    public createdAt: string;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    public updatedAt: string;
}
