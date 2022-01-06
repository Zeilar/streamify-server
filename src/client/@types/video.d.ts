import { Visibility } from "../../server/@types/video";

export interface Video {
    id: string;
    title: string;
    visibility: Visibility;
    userId: number | null;
    views: number;
    createdAt: string;
    updatedAt: string;
}
