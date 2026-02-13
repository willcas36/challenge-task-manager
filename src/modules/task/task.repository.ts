import { Injectable, OnModuleInit } from '@nestjs/common';
import { Task } from './entities/task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskSortableField, TaskStatus } from './types';
import { User } from '../users/entities/user.entity';
import { SEED_TASKS } from 'src/common/seed/seed-data';

@Injectable()
export class TaskRepository implements OnModuleInit {
  private tasks: Task[] = [];

  onModuleInit() {
    this.tasks = [...SEED_TASKS];
  }

  create(createTaskDto: CreateTaskDto, assignee: User): Task {
    const newTask: Task = {
      ...createTaskDto,
      id: (this.tasks.length + 1).toString(),
      assignee,
      isDeleted: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    } as Task;

    this.tasks.push(newTask);
    return newTask;
  }

  findAll(
    order: 'asc' | 'desc' = 'desc',
    by: TaskSortableField = TaskSortableField.STATUS,
    status?: TaskStatus,
    assignedUserId?: string,
  ): Task[] {
    let result = this.tasks.filter((task) => !task.isDeleted);

    if (status) {
      result = result.filter((task) => task.status === status);
    }

    if (assignedUserId) {
      result = result.filter((task) => task.assignee?.id === assignedUserId);
    }

    result.sort((a, b) => {
      const multiplier = order === 'asc' ? 1 : -1;

      if (
        by === TaskSortableField.CREATED_AT ||
        by === TaskSortableField.UPDATED_AT ||
        by === TaskSortableField.DUE_DATE
      ) {
        const timeA = a[by]?.getTime() ?? 0;
        const timeB = b[by]?.getTime() ?? 0;
        return (timeA - timeB) * multiplier;
      }

      const strA = a[by] ?? '';
      const strB = b[by] ?? '';
      return strA.localeCompare(strB) * multiplier;
    });

    return result;
  }

  findOne(id: string): Task | undefined {
    return this.tasks.find((task) => task.id === id && !task.isDeleted);
  }

  findByUserId(userId: string): Task[] {
    return this.tasks.filter(
      (task) => task.assignee?.id === userId && !task.isDeleted,
    );
  }

  update(
    id: string,
    updateTaskDto: UpdateTaskDto,
    assignee?: User,
  ): Task | undefined {
    const index = this.tasks.findIndex(
      (task) => task.id === id && !task.isDeleted,
    );
    if (index === -1) return undefined;

    this.tasks[index] = {
      ...this.tasks[index],
      ...updateTaskDto,
      updatedAt: new Date(),
      ...(assignee !== undefined && { assignee }),
    } as Task;

    return this.tasks[index];
  }

  remove(id: string): Task | undefined {
    const index = this.tasks.findIndex(
      (task) => task.id === id && !task.isDeleted,
    );
    if (index === -1) return undefined;

    this.tasks[index] = {
      ...this.tasks[index],
      isDeleted: true,
      deletedAt: new Date(),
    } as Task;

    return this.tasks[index];
  }
}
