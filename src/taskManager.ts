import { TaskRepository, Task, TaskState } from './models';

class TaskManager {
    constructor(private repository: TaskRepository ) {
    }

    getAllTasks() {
        return this.repository.getAll();
    }

    getActiveTasks() {
        return this.repository.getActive();
    }

    addTask(newTask: Task) {
        this.repository.addItem(newTask);
    }

    deleteTask(taskId: number) {
        this.repository.deleteItem(taskId);
    }

    updateTask(taskId: number, data: Task) {
        this.repository.updateItem(taskId, data);
    }
};

export default TaskManager;
