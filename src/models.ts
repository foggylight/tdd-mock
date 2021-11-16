export enum TaskState {
    active = 'active',
    done = 'done',
}

export interface Task {
    id: number;
    name: string;
    state: TaskState;
}

export interface TaskRepository {
    tasks: Array<Task>;
}
