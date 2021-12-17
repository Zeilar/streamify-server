import { ConflictException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateUserDto } from "../../@types/user";
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

    public async create(userDto: CreateUserDto) {
        const now = new Date();
        const userCount = await this.userRepository.count({
            where: { email: userDto.email },
        });
        if (userCount > 0) {
            throw new ConflictException(
                "A user with that email already exists."
            );
        }
        const user = this.userRepository.create({
            createdAt: now,
            updatedAt: now,
            ...userDto,
        });
        await this.userRepository.insert(user);
        const { password, ...result } = user;
        return result;
    }
}
