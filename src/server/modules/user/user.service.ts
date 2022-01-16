import {
    ConflictException,
    Injectable,
    NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { FindOneId } from "../../@types/repository";
import { UserSchema } from "../../@types/user";
import { EditUserDto } from "../../common/validators/editUser.validator";
import { CreateUserDto } from "../../common/validators/register.validator";
import { HashService } from "../hash/hash.service";
import { User } from "./user.entity";

@Injectable()
export class UserService {
    public constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private readonly hashService: HashService
    ) {}

    public async all() {
        const users = await this.userRepository.find();
        return users.map((user) => {
            const { password, ...rest } = user;
            return rest;
        });
    }

    public findOne(column: keyof UserSchema, value: any) {
        return this.userRepository.findOne({ [column]: value });
    }

    public async findById(id?: FindOneId, safe?: boolean) {
        const user = await this.userRepository.findOne(id);
        if (!user) {
            if (safe) {
                return null;
            }
            throw new NotFoundException();
        }
        return user;
    }

    public async exists(idOrcolumn: FindOneId): Promise<boolean>;
    public async exists(
        idOrColumn: keyof UserSchema,
        value: any
    ): Promise<boolean>;
    public async exists(idOrColumn: keyof UserSchema | FindOneId, value?: any) {
        const where =
            value !== undefined ? { [idOrColumn]: value } : { id: idOrColumn };
        const userCount = await this.userRepository.count({ where });
        return userCount > 0;
    }

    public async create(userDto: CreateUserDto) {
        if (await this.exists("email", userDto.email)) {
            throw new ConflictException("That email is taken.");
        }
        const user = this.userRepository.create({
            ...userDto,
            password: await this.hashService.hash(userDto.password),
        });
        await this.userRepository.insert(user);
        const { password, ...result } = user;
        return result;
    }

    public async edit(id: FindOneId, editUserDto: EditUserDto) {
        if (await this.exists("email", editUserDto.email)) {
            throw new ConflictException();
        }
        if (!(await this.exists(id))) {
            throw new NotFoundException();
        }
        const data: EditUserDto = { ...editUserDto };
        if (editUserDto.password) {
            data.password = await this.hashService.hash(editUserDto.password);
        }
        // Using TypeORM entity events don't work when calling update like this as it doesn't create an instance
        this.userRepository.update(id, data);
    }
}
