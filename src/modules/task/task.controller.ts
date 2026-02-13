import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';
import { TaskSortableField, TaskStatus } from './types';

@ApiTags('Tasks')
@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new task' })
  @ApiCreatedResponse({ type: Task })
  create(@Body() createTaskDto: CreateTaskDto): Task {
    return this.taskService.create(createTaskDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Get all tasks, filter by status and assigned user',
  })
  @ApiOkResponse({ type: [Task] })
  @ApiQuery({ name: 'order', required: false, enum: ['asc', 'desc'] })
  @ApiQuery({ name: 'by', required: false, enum: TaskSortableField })
  @ApiQuery({ name: 'status', required: false, enum: TaskStatus })
  @ApiQuery({ name: 'assignedUserId', required: false, type: String })
  findAll(
    @Query('order') order: 'asc' | 'desc' = 'desc',
    @Query('by') by: TaskSortableField = TaskSortableField.STATUS,
    @Query('status') status?: TaskStatus,
    @Query('assignedUserId') assignedUserId?: string,
  ): Task[] {
    return this.taskService.findAll(order, by, status, assignedUserId);
  }

  @Get('by-userId/:userId')
  @ApiOperation({ summary: 'Get tasks by user ID' })
  @ApiOkResponse({ type: [Task] })
  @ApiParam({ name: 'userId', example: '1' })
  findByUserId(@Param('userId') userId: string): Task[] {
    return this.taskService.findByUserId(userId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get task by ID' })
  @ApiOkResponse({ type: Task })
  @ApiParam({ name: 'id', example: '1' })
  findOne(@Param('id') id: string): Task {
    return this.taskService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update task' })
  @ApiOkResponse({ type: Task })
  @ApiParam({ name: 'id', example: '1' })
  update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto): Task {
    return this.taskService.update(id, updateTaskDto);
  }

  @Patch(':id/set-task-status/:status')
  @ApiOperation({ summary: 'Change task status' })
  @ApiOkResponse({ type: Task })
  @ApiParam({ name: 'id', example: '1' })
  @ApiParam({ name: 'status', enum: TaskStatus, example: TaskStatus.COMPLETED })
  setTaskStatus(
    @Param('id') id: string,
    @Param('status') status: TaskStatus,
  ): Task {
    return this.taskService.setTaskStatus(id, status);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete task (soft delete)' })
  @ApiOkResponse({ type: Task })
  @ApiParam({ name: 'id', example: '1' })
  remove(@Param('id') id: string): Task {
    return this.taskService.remove(id);
  }
}
