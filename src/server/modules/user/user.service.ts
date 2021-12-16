import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateUserArgs, FindOneId } from "../../@types/repository";
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

    public async findOne(id?: FindOneId) {
        return await this.userRepository.findOneOrFail(id);
    }

    public create(user: CreateUserArgs) {
        const now = new Date();
        return this.userRepository.create({
            created_at: now,
            updated_at: now,
            ...user,
        });
    }
}
