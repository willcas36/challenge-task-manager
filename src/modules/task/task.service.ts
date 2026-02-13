import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskRepository } from './task.repository';
import { Task } from './entities/task.entity';
import { User } from '../users/entities/user.entity';
import { UserRepository } from '../users/users.repository';
import { TaskSortableField, TaskStatus } from './types';

@Injectable()
export class TaskService {
  constructor(
    private readonly taskRepository: TaskRepository,
    private readonly userRepository: UserRepository,
  ) {}

  create(createTaskDto: CreateTaskDto): Task {
    const user = this.userRepository.findOne(createTaskDto.assigneeUserId);
    if (!user) {
      throw new NotFoundException(
        `User with ID ${createTaskDto.assigneeUserId} not found`,
      );
    }
    return this.taskRepository.create(createTaskDto, user);
  }

  findAll(
    order: 'asc' | 'desc' = 'desc',
    by: TaskSortableField = TaskSortableField.STATUS,
    status?: TaskStatus,
    assignedUserId?: string,
  ): Task[] {
    return this.taskRepository.findAll(order, by, status, assignedUserId);
  }

  findOne(id: string): Task {
    const task = this.taskRepository.findOne(id);
    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    return task;
  }

  findByUserId(userId: string): Task[] {
    return this.taskRepository.findByUserId(userId);
  }

  update(id: string, updateTaskDto: UpdateTaskDto): Task {
    let assignee: User | undefined;

    if (updateTaskDto.assigneeUserId) {
      assignee = this.userRepository.findOne(updateTaskDto.assigneeUserId);
      if (!assignee) {
        throw new NotFoundException(
          `User with ID ${updateTaskDto.assigneeUserId} not found`,
        );
      }
    }

    const updatedTask = this.taskRepository.update(id, updateTaskDto, assignee);
    if (!updatedTask) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    return updatedTask;
  }

  setTaskStatus(id: string, status: TaskStatus): Task {
    const updatedTask = this.taskRepository.update(id, { status });
    if (!updatedTask) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    return updatedTask;
  }

  remove(id: string): Task {
    const task = this.taskRepository.remove(id);
    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    return task;
  }
}
