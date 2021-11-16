import { TaskRepository } from '../src/models';
import TaskManager from '../src/taskManager';

const repository: TaskRepository = {
    tasks: [ 
        {
            id: 1,
            name: 'task1',
        }, 
        {
            id: 2,
            name: 'task2',
        }
    ],
};

test('get all tasks', () => {
    const manager = new TaskManager(repository);
    const tasks = manager.getAll();

    expect(tasks).toEqual(repository.tasks);
});
