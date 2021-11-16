import { TaskRepository, Task, TaskState } from './models';

class TaskManager {
    private tasks: Task[];

    constructor(private repository: TaskRepository ) {
        this.tasks = repository.tasks;
    }

    getAll() {
        return this.tasks;
    }

    getActive() {
        return this.tasks.filter(task => task.state === TaskState.active);
    }

    addTask(newTask: Task) {
        this.tasks.push(newTask);
    }

    deleteTask(taskId: number) {
        const taskIndex = this.tasks.findIndex(task => task.id === taskId);
        this.tasks.splice(taskIndex, 1);
    }
};

export default TaskManager;
