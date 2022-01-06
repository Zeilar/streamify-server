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
