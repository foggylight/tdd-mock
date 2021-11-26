import { Task, TaskRepository, TaskState } from '../src/models';
import TaskManager from '../src/taskManager';

const makeRepository = (items: Array<Task>): TaskRepository => ({
    getAll: jest.fn(() => items)
});

test('get all tasks', () => {
    const tasks = [ 
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
    ];

    const repository = makeRepository(tasks);
    const manager = new TaskManager(repository);
    const allTasks = manager.getAllTasks();

    expect(repository.getAll).toHaveBeenCalledTimes(1);
    expect(allTasks).toEqual(tasks);
});

test('get active tasks (there is active tasks in repository)', () => {
    const tasks = [ 
        {
            id: 1,
            name: 'task1',
            state: TaskState.active,
        }, 
        {
            id: 2,
            name: 'task2',
            state: TaskState.active,
        }, 
        {
            id: 3,
            name: 'task3',
            state: TaskState.done,
        }
    ];

    const repository = makeRepository(tasks);
    const manager = new TaskManager(repository);
    const activeTasksTest = manager.getActiveTasks();

    const activeTasks = [
        {
            id: 1,
            name: 'task1',
            state: TaskState.active,
        }, 
        {
            id: 2,
            name: 'task2',
            state: TaskState.active,
        } 
    ];

    expect(activeTasksTest).toEqual(activeTasks);
});

test('get active tasks (there is no active tasks in repository)', () => {
    const tasks = [
        {
            id: 1,
            name: 'task1',
            state: TaskState.done,
        }
    ];

    const repository = makeRepository(tasks);
    const manager = new TaskManager(repository);
    const activeTasksTest = manager.getActiveTasks();

    expect(activeTasksTest).toEqual([]);
});

test('add task', () => {
    const repository: TaskRepository = {
        addItem: jest.fn((newTask: Task) => {})
    };

    const manager = new TaskManager(repository);
    const newTask: Task = {
        id: 3,
        name: 'task3',
        state: TaskState.active,
    };
    manager.addTask(newTask);

    expect(repository.addItem).toHaveBeenCalledWith(newTask);
});

test('delete task', () => {
    const repository: TaskRepository = {
        deleteItem: jest.fn((number: number) => {})
    };

    const manager = new TaskManager(repository);
    const deletedTaskId = 2;
    manager.deleteTask(deletedTaskId);

    expect(repository.deleteItem).toHaveBeenCalledWith(deletedTaskId);
});

test('update task', () => {
    const repository: TaskRepository = {
        updateItem: jest.fn((number: number, data: Task) => {})
    };

    const manager = new TaskManager(repository);
    const updatedTaskId = 1;
    const newTaskData = {
        name: 'newName',
    };
    manager.updateTask(updatedTaskId, newTaskData);

    expect(repository.updateItem).toHaveBeenCalledWith(updatedTaskId, newTaskData);
});
