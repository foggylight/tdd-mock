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

    private getTaskIndex(taskId: number) {
        return this.tasks.findIndex(task => task.id === taskId);
    }

    deleteTask(taskId: number) {
        const taskIndex = this.getTaskIndex(taskId);
        this.tasks.splice(taskIndex, 1);
    }

    updateTask(taskId: number, newData: Task) {
        const updatedTask = { ...this.tasks.find(task => task.id === taskId), ...newData };
        const taskIndex = this.getTaskIndex(taskId);
        this.tasks.splice(taskIndex, 1, updatedTask);
    }
};

export default TaskManager;
