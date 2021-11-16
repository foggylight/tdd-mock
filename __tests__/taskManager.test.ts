import { Task, TaskRepository, TaskState } from '../src/models';
import TaskManager from '../src/taskManager';

const repository: TaskRepository = {
    tasks: [ 
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
};

const manager = new TaskManager(repository);

test('get all tasks', () => {
    const tasks = manager.getAll();

    expect(tasks).toEqual(repository.tasks);
});

test('get active tasks', () => {
    const activeTasks = manager.getActive();

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

    expect(manager.getAll()).toContainEqual(newTask);
});

test('delete task', () => {
    const deletedId = 2;
    manager.deleteTask(deletedId);

    expect(manager.getAll().map(task => task.id)).not.toContain(deletedId);
});

test('update task', () => {
    const updatedId = 1;
    const newData = {
        name: 'newName',
    };
    manager.updateTask(updatedId, newData);

    expect(manager.getAll().find(task => task.id === updatedId)).toMatchObject(newData);
});
