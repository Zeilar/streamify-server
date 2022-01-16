import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { initializeApp, FirebaseApp } from "firebase/app";
import {
    ref,
    uploadBytes,
    getStorage,
    FirebaseStorage,
    getDownloadURL,
} from "firebase/storage";
import { EnvConfig } from "../../@types/config";

@Injectable()
export class FirebaseService {
    private app: FirebaseApp;
    private storage: FirebaseStorage;

    public constructor(
        private readonly configService: ConfigService<EnvConfig, true>
    ) {}

    public init() {
        this.app = initializeApp({
            apiKey: this.configService.get("FIREBASE_API_KEY", { infer: true }),
            authDomain: this.configService.get("FIREBASE_AUTH_DOMAIN", {
                infer: true,
            }),
            projectId: this.configService.get("FIREBASE_PROJECT_ID", {
                infer: true,
            }),
            storageBucket: this.configService.get("FIREBASE_STORAGE_BUCKET", {
                infer: true,
            }),
            messagingSenderId: this.configService.get(
                "FIREBASE_MESSAGING_SENDER_ID",
                { infer: true }
            ),
            appId: this.configService.get("FIREBASE_APP_ID", { infer: true }),
        });
        this.storage = getStorage(this.app);
    }

    public async uploadVideo(id: string, videoFile: ArrayBufferLike) {
        uploadBytes(ref(this.storage, `/videos/${id}`), videoFile, {
            contentType: "video/mp4",
        });
    }

    public async uploadThumbnail(id: string, buffer: ArrayBufferLike) {
        uploadBytes(ref(this.storage, `/thumbnails/${id}`), buffer, {
            contentType: "image/jpeg",
        });
    }

    public getVideoFileUrl(id: string) {
        return getDownloadURL(ref(this.storage, `/videos/${id}`));
    }

    public getThumbnailUrl(id: string) {
        return getDownloadURL(ref(this.storage, `/thumbnails/${id}`));
    }
}
