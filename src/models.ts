export interface Task {
    id: number;
    name: string;
}

export interface TaskRepository {
    tasks: Array<Task>;
}
