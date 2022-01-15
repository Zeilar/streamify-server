import { Controller, Get, Req, Res } from "@nestjs/common";
import { Request, Response } from "express";
import { ViewService } from "./view.service";

@Controller()
export class ViewController {
    public constructor(private readonly viewService: ViewService) {}

    @Get("*")
    public serveClient(@Req() req: Request, @Res() res: Response) {
        const nextServer = this.viewService.getNextServer();
        const handler = nextServer.getRequestHandler();
        handler(req, res);
    }
}
