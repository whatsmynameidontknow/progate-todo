import PropTypes from 'prop-types';
import TodoItem from '@/components/TodoItem';
import TodoItemPropTypes from '@/components/props/Todo';
import { Button } from '@/components/ui/button';

const TodoList = ({ todos, onClear }) => {
    // order : uncompleted(sort by deadline, asc), completed(sort by deadline, desc). if deadline is same, sort by ID
    todos.sort((a, b) => {
        if (a.isDone && b.isDone) {
            if (a.deadline === b.deadline) {
                return a.ID - b.ID;
            }
            return b.deadline - a.deadline;
        }
        if (a.isDone) {
            return 1;
        }
        if (b.isDone) {
            return -1;
        }
        if (a.deadline === b.deadline) {
            return a.ID - b.ID;
        }
        return a.deadline - b.deadline;
    });
    return (
        <div className="h-full border-2 rounded-md border-gray-800 p-2 w-full">
            {todos.length === 0 && (
                <p className="flex items-center justify-center h-full font-extrabold text-xl font-rocksalt">
                    No todos yet
                </p>
            )}
            {todos.length > 0 && (
                <>
                    <div className="w-full overflow-y-auto h-[85%] lg:h-5/6">
                        {todos.map((todo) => (
                            <TodoItem key={todo.ID} todo={todo} />
                        ))}
                    </div>
                    <Button
                        className="w-full h-[15%] lg:h-1/6"
                        onClick={() => {
                            if (
                                window.confirm(
                                    'Are you sure you want to clear all todos?'
                                )
                            ) {
                                onClear();
                            }
                        }}
                    >
                        Clear All
                    </Button>
                </>
            )}
        </div>
    );
};

TodoList.propTypes = {
    todos: PropTypes.arrayOf(TodoItemPropTypes),
    onClear: PropTypes.func,
};

export default TodoList;
