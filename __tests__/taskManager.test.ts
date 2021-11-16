import TaskManager from '../src/taskManager';

const repository = {
    tasks: [ 'task1', 'task2' ],
};

test('get all tasks', () => {
    const manager = new TaskManager(repository);
    const tasks = manager.getAll();

    expect(tasks).toEqual(repository.tasks);
});
