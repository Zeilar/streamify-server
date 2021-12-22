import { Visibility } from "../../server/@types/video";

export interface Video {
    id: string;
    title: string;
    visibility: Visibility;
    userId?: any;
    createdAt: string;
    updatedAt: string;
}
