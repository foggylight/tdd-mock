import { TaskRepository, Task } from './models';

class TaskManager {
    constructor(private repository: TaskRepository ) {
        this.repository = repository;
    }

    getAll(): Array<Task> {
        return this.repository.tasks;
    }
};

export default TaskManager;
