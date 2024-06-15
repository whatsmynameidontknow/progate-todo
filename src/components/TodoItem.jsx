import { useContext } from 'react';
import TodoContext from '@/contexts/TodoContext';
import { getDueTime } from '@/lib/todo';
import { useState } from 'react';
import Modal from '@/components/Modal';
import TodoItemPropTypes from '@/components/props/Todo';
import { cn } from '@/lib/class';
import { useEffect } from 'react';
import { Button } from '@/components/ui/button';

const TodoItem = ({ todo }) => {
    const { toggleCompletion } = useContext(TodoContext);
    const [showModal, setShowModal] = useState(false);
    const [dueTime, setDueTime] = useState(getDueTime(todo.deadline));
    const openModal = () => {
        setShowModal(true);
    };
    const closeModal = () => {
        setShowModal(false);
    };

    useEffect(() => {
        setDueTime(getDueTime(todo.deadline));
        const interval = setInterval(() => {
            setDueTime(getDueTime(todo.deadline));
        }, 30000);
        return () => clearInterval(interval);
    }, [todo.deadline]);

    const { className, displayText, hasPassed } = dueTime;

    return (
        <>
            <div className="flex flex-row justify-between items-center w-full h-16 py-1 border-b-2 border-gray-400">
                <div className="flex flex-row items-center justify-left h-full w-9/12 lg:w-11/12">
                    <div className="flex items-center justify-center h-full w-1/6 lg:w-[5%]">
                        <input
                            type="checkbox"
                            className={cn(
                                'h-5 w-5 lg:h-6 lg:w-6',
                                hasPassed && 'hover:cursor-not-allowed'
                            )}
                            title={
                                todo.isDone ? 'Mark as undone' : 'Mark as done'
                            }
                            checked={todo.isDone}
                            onChange={() => {
                                toggleCompletion(todo.ID);
                            }}
                            disabled={hasPassed}
                        />
                    </div>
                    <div className="flex flex-col justify-center text-left h-full w-5/6 lg:w-[95%] px-1">
                        <h3
                            className={cn(
                                'text-lg truncate w-full',
                                todo.isDone && 'line-through'
                            )}
                        >
                            {todo.title}
                        </h3>
                        <p
                            className={cn(
                                'text-sm w-full',
                                className,
                                todo.isDone && 'line-through text-blue-500'
                            )}
                        >
                            {displayText}
                        </p>
                    </div>
                </div>
                <div className="h-full w-3/12 lg:w-1/12">
                    <Button onClick={openModal}>Modify</Button>
                </div>
            </div>
            {showModal && <Modal todo={todo} onClose={closeModal} />}
        </>
    );
};

TodoItem.propTypes = {
    todo: TodoItemPropTypes.isRequired,
};

export default TodoItem;
