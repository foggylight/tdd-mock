import { Task, TaskState } from '../src/models';
import Repository from '../src/repository'

const makeRepository = () => {
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

    return new Repository(tasks);
};

test('get all tasks', () => {
    const allTasks = makeRepository().getAll();

    expect(allTasks).toEqual([ 
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
    ]);
});

test('add task', () => {
    const repository = makeRepository();
    const newTask: Task = {
        id: 3,
        name: 'task3',
        state: TaskState.active,
    };
    repository.addItem(newTask);

    expect(repository.getAll()).toContainEqual(newTask);
});

test('delete task', () => {
    const repository = makeRepository();
    const deletedTaskId = 2;
    repository.deleteItem(deletedTaskId);

    expect(repository.getAll().map(task => task.id)).not.toContain(deletedTaskId);
});

test('update task', () => {
    const repository = makeRepository();
    const updatedTaskId = 1;
    const newTaskData = {
        name: 'newName',
    };
    repository.updateItem(updatedTaskId, newTaskData);

    expect(repository.getAll().find(task => task.id === updatedTaskId)).toMatchObject(newTaskData);
});
