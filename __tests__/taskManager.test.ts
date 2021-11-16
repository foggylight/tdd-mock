import { TaskRepository, TaskState } from '../src/models';
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
