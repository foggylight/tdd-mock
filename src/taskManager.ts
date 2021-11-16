import { TaskRepository, Task, TaskState } from './models';

class TaskManager {
    constructor(private repository: TaskRepository ) {
        this.repository = repository;
    }

    getAll(): Array<Task> {
        return this.repository.tasks;
    }

    getActive() {
        return this.repository.tasks.filter(task => task.state === TaskState.active);
    }

    addTask(newTask: Task) {
        this.repository.tasks.push(newTask);
    }
};

export default TaskManager;
