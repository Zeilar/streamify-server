import { ConsoleLogger, Injectable } from "@nestjs/common";
import { mkdir, stat } from "fs/promises";
import { join } from "path";

@Injectable()
export class StorageService {
    public __STORAGE__: string;

    public constructor(private readonly logger: ConsoleLogger) {
        this.__STORAGE__ = join(__dirname, "../../storage");
    }

    public async createStoreIfNotExists() {
        try {
            const result = await stat(this.__STORAGE__);
            if (result.isDirectory()) {
                return;
            }
            await mkdir(this.__STORAGE__);
        } catch (error) {
            // If the directory didn't exist, it'll throw an error, which is to be expected the first time this executes
            await mkdir(this.__STORAGE__);
        } finally {
            this.logger.log(`Installed storage at ${this.__STORAGE__}`);
        }
    }

    public async store(path: string, file: any) {
        //
    }

    public async delete(pathToFile: string) {
        //
    }
}
