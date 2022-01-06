import { ConsoleLogger, Injectable } from "@nestjs/common";
import { mkdir, stat, rm, writeFile } from "fs/promises";
import { v4 as uuidv4 } from "uuid";
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
            if (!result.isDirectory()) {
                await rm(this.__STORAGE__);
                await mkdir(this.__STORAGE__);
            }
        } catch (error) {
            // If nothing at the path existed, it'll throw an error, which is to be expected on the first app bootstrap
            await mkdir(this.__STORAGE__);
        } finally {
            this.logger.log(`Installed storage at ${this.__STORAGE__}`);
        }
    }

    public async storeMulterFile(file: Express.Multer.File) {
        const fileName = uuidv4();
        await writeFile(
            join(this.__STORAGE__, fileName),
            Buffer.from(file.buffer)
        );
        return fileName;
    }

    public async delete(pathToFile: string) {
        await rm(pathToFile);
    }

    public path(path: string) {
        return join(this.__STORAGE__, path);
    }
}
