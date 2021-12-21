export enum Visibility {
    PUBLIC = "public",
    UNLISTED = "unlisted",
}

export interface VideoSchema {
    id: string;
    title: string;
    visibility: Visibility;
    createdAt: Date;
    updatedAt: Date;
}
