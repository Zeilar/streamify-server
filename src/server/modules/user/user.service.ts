import {
    ConflictException,
    Injectable,
    NotFoundException,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { InjectRepository } from "@nestjs/typeorm";
import { compareSync, hashSync } from "bcrypt";
import { Repository } from "typeorm";
import { BcryptConfig } from "../../@types/config";
import { CreateUserDto } from "../../common/validators/register.validator";
import { User } from "./user.entity";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private readonly configService: ConfigService<BcryptConfig>
    ) {}

    public async findAll() {
        const users = await this.userRepository.find();
        return users.map((user) => {
            const { password, ...rest } = user;
            return rest;
        });
    }

    public async findOne(column: keyof User, value: any) {
        const user = await this.userRepository.findOne({
            where: { [column]: value },
        });
        if (!user) {
            throw new NotFoundException();
        }
        return user;
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
        const saltRounds = this.configService.get<number>("bcrypt_saltRounds");
        const user = this.userRepository.create({
            ...userDto,
            createdAt: now,
            updatedAt: now,
            password: hashSync(userDto.password, saltRounds),
        });
        await this.userRepository.insert(user);
        const { password, ...result } = user;
        return result;
    }
}
