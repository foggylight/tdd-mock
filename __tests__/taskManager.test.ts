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
    const allTasks = new TaskManager(repository).getAllTasks();

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
    const activeTasksTest = new TaskManager(repository).getActiveTasks();

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
    const activeTasksTest = new TaskManager(repository).getActiveTasks();

    expect(activeTasksTest).toEqual([]);
});

test('add task', () => {
    const repository: TaskRepository = {
        addItem: jest.fn((newTask: Task) => {})
    };

    const newTask: Task = {
        id: 3,
        name: 'task3',
        state: TaskState.active,
    };
    new TaskManager(repository).addTask(newTask);

    expect(repository.addItem).toHaveBeenCalledWith(newTask);
});

test('delete task', () => {
    const repository: TaskRepository = {
        deleteItem: jest.fn((number: number) => {})
    };

    const deletedTaskId = 2;
    new TaskManager(repository).deleteTask(deletedTaskId);

    expect(repository.deleteItem).toHaveBeenCalledWith(deletedTaskId);
});

test('update task', () => {
    const repository: TaskRepository = {
        updateItem: jest.fn((number: number, data: Task) => {})
    };

    const updatedTaskId = 1;
    const newTaskData = {
        name: 'newName',
    };
    new TaskManager(repository).updateTask(updatedTaskId, newTaskData);

    expect(repository.updateItem).toHaveBeenCalledWith(updatedTaskId, newTaskData);
});
