import {
    ConflictException,
    Injectable,
    NotFoundException,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { InjectRepository } from "@nestjs/typeorm";
import { hash } from "bcrypt";
import { Repository } from "typeorm";
import { BcryptConfig } from "../../@types/config";
import { FindOneId } from "../../@types/repository";
import { UserSchema } from "../../@types/user";
import { EditUserDto } from "../../common/validators/editUser.validator";
import { CreateUserDto } from "../../common/validators/register.validator";
import { User } from "./user.entity";

@Injectable()
export class UserService {
    public constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private readonly configService: ConfigService<BcryptConfig>
    ) {}

    public async all() {
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

    public async findById(id: FindOneId) {
        return await this.findOne("id", id);
    }

    public async exists(idOrcolumn: number): Promise<boolean>;
    public async exists(
        idOrColumn: keyof UserSchema,
        value: any
    ): Promise<boolean>;
    public async exists(idOrColumn: keyof UserSchema | number, value?: any) {
        const where =
            typeof idOrColumn === "number"
                ? { id: idOrColumn }
                : { [idOrColumn]: value };
        const userCount = await this.userRepository.count({ where });
        return userCount > 0;
    }

    public async create(userDto: CreateUserDto) {
        if (await this.exists("email", userDto.email)) {
            throw new ConflictException("That email is taken.");
        }
        const now = new Date().toISOString();
        const saltRounds = this.configService.get<number>("bcrypt_saltRounds");
        const user = this.userRepository.create({
            ...userDto,
            password: await hash(userDto.password, saltRounds),
        });
        await this.userRepository.insert(user);
        const { password, ...result } = user;
        return result;
    }

    public async edit(id: FindOneId, editUserDto: EditUserDto) {
        if (await this.exists("email", editUserDto.email)) {
            throw new ConflictException("That email is taken.");
        }
        const data: EditUserDto = { ...editUserDto };
        // Using TypeORM entity events don't work when calling update like this as it doesn't create an instance
        if (editUserDto.password) {
            data.password = await hash(
                editUserDto.password,
                this.configService.get("bcrypt_saltRounds")
            );
        }
        await this.userRepository.update(id, data);
    }
}
