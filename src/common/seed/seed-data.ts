import { User } from 'src/modules/users/entities/user.entity';
import { Task } from 'src/modules/task/entities/task.entity';
import { TaskStatus } from 'src/modules/task/types/task-status';
import { TaskPriority } from 'src/modules/task/types/task-priority';

export const SEED_USERS: User[] = [
  {
    id: '1',
    name: 'William',
    lastName: 'Quiñones',
    isDeleted: false,
    createdAt: new Date('2026-01-10'),
    updatedAt: new Date('2026-01-10'),
  },
  {
    id: '2',
    name: 'Adrian',
    lastName: 'López',
    isDeleted: false,
    createdAt: new Date('2026-01-15'),
    updatedAt: new Date('2026-01-15'),
  },
  {
    id: '3',
    name: 'Catarina',
    lastName: 'Magalí',
    isDeleted: false,
    createdAt: new Date('2026-01-20'),
    updatedAt: new Date('2026-01-20'),
  },
];

const [william, adrian, catarina] = SEED_USERS;

export const SEED_TASKS: Task[] = [
  {
    id: '1',
    title: 'Diseñar mockups de login',
    description:
      'Crear wireframes y mockups para la pantalla de inicio de sesión',
    status: TaskStatus.COMPLETED,
    priority: TaskPriority.HIGH,
    dueDate: new Date('2026-02-01'),
    assignee: william,
    comments: ['Revisión aprobada', 'Entregado a desarrollo'],
    attachments: ['login-mockup-v1.fig'],
    isDeleted: false,
    createdAt: new Date('2026-01-12'),
    updatedAt: new Date('2026-02-01'),
  },
  {
    id: '2',
    title: 'Configurar pipeline CI/CD',
    description:
      'Implementar pipeline de integración continua con GitHub Actions',
    status: TaskStatus.IN_PROGRESS,
    priority: TaskPriority.MEDIUM,
    dueDate: new Date('2026-02-20'),
    assignee: william,
    comments: ['Pipeline base creado'],
    attachments: [],
    isDeleted: false,
    createdAt: new Date('2026-01-18'),
    updatedAt: new Date('2026-02-10'),
  },
  {
    id: '3',
    title: 'Implementar módulo de reportes',
    description: 'Desarrollar el módulo de generación de reportes en PDF',
    status: TaskStatus.PENDING,
    priority: TaskPriority.HIGH,
    dueDate: new Date('2026-03-01'),
    assignee: adrian,
    comments: [],
    attachments: ['reporte-spec.pdf'],
    isDeleted: false,
    createdAt: new Date('2026-01-20'),
    updatedAt: new Date('2026-01-20'),
  },
  {
    id: '4',
    title: 'Corregir bug en filtro de búsqueda',
    description:
      'El filtro no retorna resultados cuando hay tildes en el texto',
    status: TaskStatus.COMPLETED,
    priority: TaskPriority.LOW,
    dueDate: new Date('2026-01-28'),
    assignee: adrian,
    comments: ['Bug reproducido', 'Fix aplicado con normalización UTF-8'],
    attachments: ['bug-screenshot.png'],
    isDeleted: false,
    createdAt: new Date('2026-01-22'),
    updatedAt: new Date('2026-01-28'),
  },
  {
    id: '5',
    title: 'Documentar API de usuarios',
    description:
      'Escribir documentación Swagger completa para todos los endpoints de usuarios',
    status: TaskStatus.IN_PROGRESS,
    priority: TaskPriority.MEDIUM,
    dueDate: new Date('2026-02-15'),
    assignee: catarina,
    comments: ['Endpoints GET documentados'],
    attachments: [],
    isDeleted: false,
    createdAt: new Date('2026-01-25'),
    updatedAt: new Date('2026-02-08'),
  },
  {
    id: '6',
    title: 'Crear tests unitarios del módulo de tareas',
    description: 'Cobertura mínima del 80% para service y repository',
    status: TaskStatus.PENDING,
    priority: TaskPriority.HIGH,
    dueDate: new Date('2026-02-28'),
    assignee: catarina,
    comments: [],
    attachments: ['test-plan.md'],
    isDeleted: false,
    createdAt: new Date('2026-02-01'),
    updatedAt: new Date('2026-02-01'),
  },
];
