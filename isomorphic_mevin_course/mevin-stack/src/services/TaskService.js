import { http } from './HttpService'

export function getAllTasks() {
    return http().get('/api/task');
}

export function getTaskById(id) {
    return http().get(`/api/task/${id}`);
}

export function createTask(task) {
    return http().post('/api/task', task);
}

export function deleteTask(id) {
    return http().delete(`/api/task/${id}`);
}

export function updateTask(task) {
    return http().put('/api/task', task);
}