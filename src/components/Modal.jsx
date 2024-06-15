import { useContext } from 'react';
import PropTypes from 'prop-types';
import TodoContext from '@/contexts/TodoContext';
import Form from '@/components/layout/Form';
import TodoItemPropTypes from '@/components/props/Todo';
import { Button } from '@/components/ui/button';

const Modal = ({ todo, onClose }) => {
    const { deleteTodo, updateTodo } = useContext(TodoContext);

    return (
        <div className="fixed z-10 inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-4 rounded-md w-96 h-96">
                <div className="h-[10%] w-full border-b-2 border-gray-600 mb-2">
                    <h1 className="text-xl font-bold">Modify Todo</h1>
                </div>
                <div className="h-[90%] w-full">
                    <div className="h-5/6">
                        <Form
                            todo={todo}
                            onSubmit={(todo) => {
                                updateTodo(todo);
                                onClose();
                            }}
                            buttonText="Update"
                        />
                    </div>
                    <div className="w-full h-1/6">
                        <Button
                            className="w-1/2"
                            onClick={() => {
                                if (
                                    window.confirm(
                                        'Are you sure you want to deletedo?'
                                    )
                                ) {
                                    deleteTodo(todo.ID);
                                    onClose();
                                }
                            }}
                        >
                            Delete
                        </Button>
                        <Button className="w-1/2" onClick={onClose}>
                            Cancel
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

Modal.propTypes = {
    todo: TodoItemPropTypes.isRequired,
    onClose: PropTypes.func.isRequired,
};

export default Modal;
