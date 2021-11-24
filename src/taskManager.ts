import { TaskRepository, Task, TaskState } from './models';

class TaskManager {
    constructor(private repository: TaskRepository) {
    }

    getAllTasks() {
        return this.repository.getAll();
    }

    getActiveTasks() {
        return this.repository.getAll().filter((task: Task) => task.state === TaskState.active);
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
