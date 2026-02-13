import { ApiProperty } from '@nestjs/swagger';
import { TimeStamps } from 'src/common/types/timestamps';
import { TaskPriority, TaskStatus } from '../types';
import { User } from 'src/modules/users/entities/user.entity';

export class Task extends TimeStamps {
  @ApiProperty({ example: '1' })
  id: string;

  @ApiProperty({ example: 'Diseñar mockups de login' })
  title: string;

  @ApiProperty({ example: 'Crear wireframes para la pantalla de login' })
  description: string;

  @ApiProperty({ example: TaskStatus.PENDING, enum: TaskStatus })
  status: TaskStatus;

  @ApiProperty({ example: TaskPriority.HIGH, enum: TaskPriority })
  priority: TaskPriority;

  @ApiProperty({ example: '2026-03-01T00:00:00.000Z' })
  dueDate: Date;

  @ApiProperty({ type: () => User })
  assignee: User;

  @ApiProperty({ example: ['Comentario 1', 'Comentario 2'] })
  comments: string[];

  @ApiProperty({ example: ['archivo.pdf', 'imagen.png'] })
  attachments: string[];

  @ApiProperty({ example: false })
  isDeleted?: boolean;
}
