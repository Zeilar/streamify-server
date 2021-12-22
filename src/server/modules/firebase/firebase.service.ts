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

@Injectable()
export class FirebaseService {
    private app: FirebaseApp;
    private storage: FirebaseStorage;

    public constructor(private readonly configService: ConfigService) {}

    public async init() {
        this.app = initializeApp({
            apiKey: this.configService.get<string>("FIREBASE_API_KEY"),
            authDomain: this.configService.get<string>("FIREBASE_AUTH_DOMAIN"),
            projectId: this.configService.get<string>("FIREBASE_PROJECT_ID"),
            storageBucket: this.configService.get<string>(
                "FIREBASE_STORAGE_BUCKET"
            ),
            messagingSenderId: this.configService.get<string>(
                "FIREBASE_MESSAGING_SENDER_ID"
            ),
            appId: this.configService.get<string>("FIREBASE_APP_ID"),
        });
        this.storage = getStorage(this.app);
    }

    public async uploadVideo(id: string, videoFile: ArrayBufferLike) {
        await uploadBytes(ref(this.storage, `/videos/${id}`), videoFile, {
            contentType: "video/mp4",
        });
    }

    public async findFile() {
        const storage = getStorage();
    }
}
