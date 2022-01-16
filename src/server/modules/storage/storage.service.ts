import { ConsoleLogger, Injectable } from "@nestjs/common";
import { mkdir, stat, rm, writeFile, readFile } from "fs/promises";
import { v4 as uuidv4 } from "uuid";
import { join } from "path";

@Injectable()
export class StorageService {
    public __STORAGE__: string;

    public constructor(private readonly logger: ConsoleLogger) {
        this.__STORAGE__ = join(__dirname, "../../storage");
    }

    private async createStorage() {
        await mkdir(`${this.__STORAGE__}/public`, { recursive: true });
        this.logger.log(`Installed storage at ${this.__STORAGE__}`);
    }

    public async createStorageIfNotExists() {
        try {
            const result = await stat(this.__STORAGE__);
            if (result.isDirectory()) {
                return;
            }
            await rm(this.__STORAGE__);
            await this.createStorage();
        } catch (error) {
            // If nothing at the path existed, it'll throw an error, which is to be expected on the first app bootstrap
            await this.createStorage();
        }
    }

    public async storeMulterFile(file: Express.Multer.File, path: string) {
        const fileName = uuidv4();
        await writeFile(
            join(this.__STORAGE__, path, fileName),
            Buffer.from(file.buffer)
        );
        return fileName;
    }

    public async delete(...pathToFile: string[]) {
        pathToFile.forEach((path) => {
            rm(path);
        });
    }

    public path(path: string) {
        return join(this.__STORAGE__, path);
    }

    public async getFileBuffer(path: string) {
        const fileBuffer = await readFile(path);
        return fileBuffer.buffer;
    }
}
