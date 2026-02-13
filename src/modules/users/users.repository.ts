import { Injectable, OnModuleInit } from '@nestjs/common';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { SEED_USERS } from 'src/common/seed/seed-data';

type UserSortableField = 'id' | 'name' | 'lastName';

@Injectable()
export class UserRepository implements OnModuleInit {
  private users: User[] = [];

  onModuleInit() {
    this.users = [...SEED_USERS];
  }

  create(createUserDto: CreateUserDto): User {
    const newUser: User = {
      ...createUserDto,
      id: (this.users.length + 1).toString(),
      isDeleted: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.users.push(newUser);
    return newUser;
  }

  findAll(
    order: 'asc' | 'desc' = 'desc',
    by: UserSortableField = 'name',
    search?: string,
  ): User[] {
    let result = this.users.filter((user) => !user.isDeleted);

    if (search) {
      const term = search.toLowerCase();
      result = result.filter(
        (user) =>
          user.name.toLowerCase().includes(term) ||
          user.lastName.toLowerCase().includes(term),
      );
    }

    const multiplier = order === 'asc' ? 1 : -1;
    result.sort((a, b) => {
      const strA = a[by] ?? '';
      const strB = b[by] ?? '';
      return strA.localeCompare(strB) * multiplier;
    });

    return result;
  }

  findOne(id: string): User | undefined {
    return this.users.find((user) => user.id === id && !user.isDeleted);
  }

  update(id: string, updateUserDto: UpdateUserDto): User | undefined {
    const index = this.users.findIndex(
      (user) => user.id === id && !user.isDeleted,
    );
    if (index === -1) return undefined;

    this.users[index] = {
      ...this.users[index],
      ...updateUserDto,
      updatedAt: new Date(),
    };

    return this.users[index];
  }

  remove(id: string): User | undefined {
    const index = this.users.findIndex(
      (user) => user.id === id && !user.isDeleted,
    );
    if (index === -1) return undefined;

    this.users[index] = {
      ...this.users[index],
      isDeleted: true,
      deletedAt: new Date(),
    };

    return this.users[index];
  }
}
