import TaskRepository from './models';

class TaskManager {
    constructor(private repository: TaskRepository ) {
        this.repository = repository;
    }

    getAll(): Array<string> {
        return this.repository.tasks;
    }
};

export default TaskManager;