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
    items: Array<Task>;
    getAll: () => Array<Task>;
    getActive: () => Array<Task>;
    addItem: (newItem: Task) => void;
    deleteItem: (itemId: number) => void;
    updateItem: (itemId: number, newData: Task) => void;
}
