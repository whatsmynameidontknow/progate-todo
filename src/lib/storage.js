const load = () => {
    try {
        const todos = localStorage.getItem('todos');
        return todos ? JSON.parse(todos) : [];
    } catch (error) {
        return [];
    }
};

const save = (todos) => {
    try {
        localStorage.setItem('todos', JSON.stringify(todos));
    } catch (error) {
        console.error(error);
    }
};

export { load, save };
