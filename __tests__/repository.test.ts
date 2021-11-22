import { Task, TaskState } from '../src/models';
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

test('get all tasks', () => {
    const allTasks = testRepository.getAll();

    expect(allTasks).toEqual(tasks);
});

test('get active tasks', () => {
    const activeTasks = testRepository.getActive();

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

    testRepository.addItem(newTask);

    expect(testRepository.getAll()).toContainEqual(newTask);
});

test('delete task', () => {
    const deletedId = 2;
    testRepository.deleteItem(deletedId);

    expect(testRepository.getAll().map(task => task.id)).not.toContain(deletedId);
});

test('update task', () => {
    const updatedId = 1;
    const newData = {
        name: 'newName',
    };
    testRepository.updateItem(updatedId, newData);

    expect(testRepository.getAll().find(task => task.id === updatedId)).toMatchObject(newData);
});
