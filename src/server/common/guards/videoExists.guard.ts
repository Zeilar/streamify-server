import {
    ExecutionContext,
    Injectable,
    CanActivate,
    NotFoundException,
} from "@nestjs/common";
import { VideoService } from "../../modules/video/video.service";

@Injectable()
export class VideoExistsGuard implements CanActivate {
    public constructor(private readonly videoService: VideoService) {}

    public async canActivate(context: ExecutionContext) {
        const request = context.switchToHttp().getRequest();
        const { id } = request.params;
        const video = await this.videoService.findById(id);
        if (!video) {
            console.log("rip");
            throw new NotFoundException();
        }
        return request;
    }
}
