import { ConflictException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateUserArgs } from "../../@types/repository";
import { User } from "./user.entity";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>
    ) {}

    public async findAll() {
        return await this.userRepository.find();
    }

    public async findOne(column: keyof User, value: any) {
        return await this.userRepository.findOneOrFail({
            where: { [column]: value },
        });
    }

    public async create(user: CreateUserArgs) {
        const now = new Date();
        const userCount = await this.userRepository.count({
            where: { email: user.email },
        });
        if (userCount > 0) {
            throw new ConflictException(
                "A user with that email already exists."
            );
        }
        return await this.userRepository.insert({
            created_at: now,
            updated_at: now,
            ...user,
        });
    }
}
