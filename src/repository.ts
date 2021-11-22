import { Task, TaskRepository, TaskState } from "./models";

class Repository implements TaskRepository {
    items: Task[];

    constructor(items: Array<Task>) {
        this.items = items;
    }

    getAll() {
        return this.items;
    }

    getActive() {
        return this.items.filter((item: Task) => item.state === TaskState.active);
    }

    addItem(newItem: Task) {
        this.items.push(newItem);
    }
    
    deleteItem(itemId: number) {
        const itemIndex = this.items.findIndex((item: Task) => item.id === itemId);
        this.items.splice(itemIndex, 1);
    }

    updateItem(itemId: number, newData: Task) {
        const updatedTask = { ...this.items.find((item: Task) => item.id === itemId), ...newData };
        const itemIndex = this.items.findIndex((item: Task) => item.id === itemId);
        this.items.splice(itemIndex, 1, updatedTask);
    }
};

export default Repository;
