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

const testRepository = new Repository(tasks);

const manager = new TaskManager(testRepository);

test('get all tasks', () => {
    const allTasks = manager.getAllTasks();

    expect(allTasks).toEqual(tasks);
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
