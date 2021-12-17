import { ConflictException, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { InjectRepository } from "@nestjs/typeorm";
import { compareSync, hashSync } from "bcrypt";
import { Repository } from "typeorm";
import { BcryptConfig } from "../../@types/config";
import { CreateUserDto } from "../../@types/user";
import { User } from "./user.entity";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private readonly configService: ConfigService<BcryptConfig>
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
        const saltRounds = this.configService.get<number>("bcrypt_saltRounds");
        const user = this.userRepository.create({
            ...userDto,
            createdAt: now,
            updatedAt: now,
            password: hashSync(userDto.password, saltRounds),
        });
        console.log(
            userDto.password,
            user.password,
            compareSync(userDto.password, user.password)
        );
        await this.userRepository.insert(user);
        const { password, ...result } = user;
        return result;
    }
}
