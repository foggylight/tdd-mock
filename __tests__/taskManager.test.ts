import TaskManager from '../src/taskManager';

test('get all tasks', () => {
    const manager = new TaskManager();
    const tasks = manager.getAll();

    expect(tasks).not.toBeNull();
});
