import { Controller, Get, Req, Res } from "@nestjs/common";
import { Request, Response } from "express";
import { AppService } from "./app.service";

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Get("*")
    public async serveClient(@Req() req: Request, @Res() res: Response) {
        const nextApp = await this.appService.mountNextApp();
        const handle = nextApp.getRequestHandler();
        handle(req, res);
    }
}
