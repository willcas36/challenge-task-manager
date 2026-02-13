import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsString,
  IsDate,
  IsArray,
  IsOptional,
} from 'class-validator';
import { Type } from 'class-transformer';
import { TaskPriority, TaskStatus } from '../types';

export class CreateTaskDto {
  @ApiProperty({ example: 'Diseñar mockups de login' })
  @IsString({ message: 'invalid-title-type' })
  @IsNotEmpty({ message: 'title-is-required' })
  title: string;

  @ApiProperty({ example: 'Crear wireframes para la pantalla de login' })
  @IsString({ message: 'invalid-description-type' })
  @IsNotEmpty({ message: 'description-is-required' })
  description: string;

  @ApiProperty({ example: TaskStatus.PENDING, enum: TaskStatus })
  @IsEnum(TaskStatus, {
    message: `invalid-status. Valid values: ${Object.values(TaskStatus).join(', ')}`,
  })
  @IsNotEmpty({ message: 'status-is-required' })
  status: TaskStatus;

  @ApiProperty({ example: TaskPriority.HIGH, enum: TaskPriority })
  @IsEnum(TaskPriority, {
    message: `invalid-priority. Valid values: ${Object.values(TaskPriority).join(', ')}`,
  })
  @IsNotEmpty({ message: 'priority-is-required' })
  priority: TaskPriority;

  @ApiProperty({ example: '2026-03-01T00:00:00.000Z' })
  @Type(() => Date)
  @IsDate({ message: 'invalid-due-date-type' })
  @IsNotEmpty({ message: 'due-date-is-required' })
  dueDate: Date;

  @ApiProperty({ example: '1', description: 'ID del usuario asignado' })
  @IsString({ message: 'invalid-userId-type' })
  @IsNotEmpty({ message: 'user-id-is-required' })
  assigneeUserId: string;

  @ApiProperty({ example: ['Comentario 1'], required: false })
  @IsArray({ message: 'invalid-comments-type' })
  @IsOptional()
  comments?: string[];

  @ApiProperty({ example: ['archivo.pdf'], required: false })
  @IsArray({ message: 'invalid-attachments-type' })
  @IsOptional()
  attachments?: string[];
}
