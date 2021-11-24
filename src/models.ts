export enum TaskState {
    active = 'active',
    done = 'done',
}

export interface Task {
    id?: number;
    name?: string;
    state?: TaskState;
}

export interface TaskRepository {
    getAll?: () => Array<Task>;
    addItem?: (newItem: Task) => void;
    deleteItem?: (itemId: number) => void;
    updateItem?: (itemId: number, newData: Task) => void;
}
