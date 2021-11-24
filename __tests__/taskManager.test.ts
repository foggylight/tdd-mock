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

test.skip('add task', () => {
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

    const newTask: Task = {
        id: 3,
        name: 'task3',
        state: TaskState.active,
    };

    const testRepository: TaskRepository = {
        addItem: jest.fn(() => tasks)
    };

    const manager = new TaskManager(testRepository);
    const activeTasks = manager.getActiveTasks();

    // expect(TaskRepositoryMock.prototype.addItem).toHaveBeenCalledTimes(1);
});

test.skip('delete task', () => {
    // const testRepository = new Repository(tasks);
    // const manager = new TaskManager(testRepository);
    const deletedId = 2;
    // manager.deleteTask(deletedId);

    // expect(TaskRepositoryMock.prototype.deleteItem).toHaveBeenCalledTimes(1);
});

test.skip('update task', () => {
    const updatedId = 1;
    const newData = {
        name: 'newName',
    };

    // const testRepository = new Repository(tasks);
    // const manager = new TaskManager(testRepository);
    // manager.updateTask(updatedId, newData);

    // expect(TaskRepositoryMock.prototype.updateItem).toHaveBeenCalledTimes(1);
});
