import { TaskRepository, Task, TaskState } from './models';

class TaskManager {
    constructor(private repository: TaskRepository ) {
        this.repository = repository;
    }

    getAll() {
        return this.repository.tasks;
    }

    getActive() {
        return this.repository.tasks.filter(task => task.state === TaskState.active);
    }

    addTask(newTask: Task) {
        this.repository.tasks.push(newTask);
    }

    deleteTask(taskId: number) {
        const taskIndex = this.repository.tasks.findIndex(task => task.id === taskId);
        this.repository.tasks.splice(taskIndex, 1);
    }
};

export default TaskManager;
