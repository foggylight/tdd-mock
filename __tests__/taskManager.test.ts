import { Task, TaskRepository, TaskState } from '../src/models';
import TaskManager from '../src/taskManager';

const repository: TaskRepository = {
    items: [ 
        {
            id: 1,
            name: 'task1',
            state: TaskState.active,
        }, 
        {
            id: 2,
            name: 'task2',
            state: TaskState.done,
        }
    ],

    getAll() {
        return this.items;
    },

    getActive() {
        return this.items.filter((item: Task) => item.state === TaskState.active);
    },

    addItem(newItem: Task) {
        this.items.push(newItem);
    },
    
    deleteItem(itemId: number) {
        const itemIndex = this.items.findIndex((item: Task) => item.id === itemId);
        this.items.splice(itemIndex, 1);
    },

    updateItem(itemId: number, newData: Task) {
        const updatedTask = { ...this.items.find((item: Task) => item.id === itemId), ...newData };
        const itemIndex = this.items.findIndex((item: Task) => item.id === itemId);
        this.items.splice(itemIndex, 1, updatedTask);
    },
};

const manager = new TaskManager(repository);

test('get all tasks', () => {
    const tasks = manager.getAllTasks();

    expect(tasks).toEqual(repository.items);
});

test('get active tasks', () => {
    const activeTasks = manager.getActiveTasks();

    expect(activeTasks).toEqual([{
        id: 1,
        name: 'task1',
        state: TaskState.active,
    }]);
});

test('add task', () => {
    const newTask: Task = {
        id: 3,
        name: 'task3',
        state: TaskState.active,
    };

    manager.addTask(newTask);

    expect(manager.getAllTasks()).toContainEqual(newTask);
});

test('delete task', () => {
    const deletedId = 2;
    manager.deleteTask(deletedId);

    expect(manager.getAllTasks().map(task => task.id)).not.toContain(deletedId);
});

test('update task', () => {
    const updatedId = 1;
    const newData = {
        name: 'newName',
    };
    manager.updateTask(updatedId, newData);

    expect(manager.getAllTasks().find(task => task.id === updatedId)).toMatchObject(newData);
});
