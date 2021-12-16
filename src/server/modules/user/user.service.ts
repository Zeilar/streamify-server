import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { FindOneId } from "../../@types/repository";
import { User } from "./user.entity";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>
    ) {}

    public findAll() {
        return this.usersRepository.find();
    }

    public findOne(id?: FindOneId) {
        return this.usersRepository.findOneOrFail(id);
    }
}
