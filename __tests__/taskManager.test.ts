import { Task, TaskRepository, TaskState } from '../src/models';
import TaskManager from '../src/taskManager';
import Repository from '../src/repository'

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

    const testRepository: TaskRepository = {
        getAll: jest.fn(() => tasks)
    };

    const manager = new TaskManager(testRepository);
    const allTasks = manager.getAllTasks();

    expect(testRepository.getAll).toHaveBeenCalledTimes(1);
    expect(allTasks).toEqual(tasks);
});

test('get active tasks', () => {
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

    const testRepository: TaskRepository = {
        getAll: jest.fn(() => tasks)
    };

    const manager = new TaskManager(testRepository);
    const activeTasks = manager.getActiveTasks();

    const doneTasks = [
        {
            id: 1,
            name: 'task1',
            state: TaskState.done,
        }
    ];

    const testRepositoryDoneTasks: TaskRepository = {
        getAll: jest.fn(() => doneTasks)
    };

    const managerDoneTasks = new TaskManager(testRepositoryDoneTasks);
    const emptyActiveTasks = managerDoneTasks.getActiveTasks();

    expect(activeTasks).toEqual([
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
    ]);
    expect(emptyActiveTasks).toEqual([]);
});

test('add task', () => {
    const tasks: Array<Task> = [ 
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

    const newTask: Task = {
        id: 3,
        name: 'task3',
        state: TaskState.active,
    };

    const testRepository: TaskRepository = {
        addItem: jest.fn((newTask: Task) => {})
    };

    const manager = new TaskManager(testRepository);
    manager.addTask(newTask);

    expect(testRepository.addItem).toHaveBeenCalledWith(newTask);
});

test('delete task', () => {
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

    const deletedId = 2;

    const testRepository: TaskRepository = {
        deleteItem: jest.fn((number: number) => {})
    };

    const manager = new TaskManager(testRepository);
    manager.deleteTask(deletedId);

    expect(testRepository.deleteItem).toHaveBeenCalledWith(deletedId);
});

test('update task', () => {
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

    const updatedId = 1;
    const newData = {
        name: 'newName',
    };

    const testRepository: TaskRepository = {
        updateItem: jest.fn((number: number, data: Task) => {})
    };

    const manager = new TaskManager(testRepository);
    manager.updateTask(updatedId, newData);

    expect(testRepository.updateItem).toHaveBeenCalledWith(updatedId, newData);
});
