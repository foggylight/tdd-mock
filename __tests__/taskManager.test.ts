import { Task, TaskState } from '../src/models';
import TaskManager from '../src/taskManager';
import Repository from '../src/repository'

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

jest.mock('../src/repository');

const TaskRepositoryMock = Repository as jest.MockedClass<typeof Repository>;

beforeEach(() => {
    TaskRepositoryMock.mockClear();
});

test('repository have been called', () => {
    const testRepository = new Repository(tasks);
    new TaskManager(testRepository);

    expect(TaskRepositoryMock).toHaveBeenCalledTimes(1);
});

test('get all tasks', () => {
    const testRepository = new Repository(tasks);
    const manager = new TaskManager(testRepository);
    manager.getAllTasks();

    expect(TaskRepositoryMock.prototype.getAll).toHaveBeenCalledTimes(1);
});

test('get active tasks', () => {
    const testRepository = new Repository(tasks);
    const manager = new TaskManager(testRepository);
    manager.getActiveTasks();

    expect(TaskRepositoryMock.prototype.getActive).toHaveBeenCalledTimes(1);
});

test('add task', () => {
    const newTask: Task = {
        id: 3,
        name: 'task3',
        state: TaskState.active,
    };

    const testRepository = new Repository(tasks);
    const manager = new TaskManager(testRepository);
    manager.addTask(newTask);

    expect(TaskRepositoryMock.prototype.addItem).toHaveBeenCalledTimes(1);
});

test('delete task', () => {
    const testRepository = new Repository(tasks);
    const manager = new TaskManager(testRepository);
    const deletedId = 2;
    manager.deleteTask(deletedId);

    expect(TaskRepositoryMock.prototype.deleteItem).toHaveBeenCalledTimes(1);
});

test('update task', () => {
    const updatedId = 1;
    const newData = {
        name: 'newName',
    };

    const testRepository = new Repository(tasks);
    const manager = new TaskManager(testRepository);
    manager.updateTask(updatedId, newData);

    expect(TaskRepositoryMock.prototype.updateItem).toHaveBeenCalledTimes(1);
});
