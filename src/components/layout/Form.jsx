import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { cn } from '@/lib/class';
import { epochToTimeString } from '@/utils/datetime';
import { Button } from '@/components/ui/button';

const Form = ({
    onSubmit,
    todo = {
        ID: null,
        title: '',
        deadline: undefined,
        isDone: false,
    },
    buttonText,
    className,
    inputFieldClassName,
    buttonClassName,
}) => {
    const { register, handleSubmit, getValues, setValue } = useForm({
        shouldUseNativeValidation: true,
        defaultValues: {
            title: todo.title,
            deadline: epochToTimeString(
                todo.deadline || Date.now() + 10 * 60000
            ),
        },
    });

    return (
        <form
            onSubmit={handleSubmit(() => {
                todo = {
                    ...todo,
                    ...getValues(),
                    ID: todo.ID || Date.now(),
                };
                onSubmit(todo);
                setValue('title', '');
                setValue(
                    'deadline',
                    epochToTimeString(Date.now() + 10 * 60000)
                );
            })}
            className={cn('flex flex-col space-y-2 h-full w-full', className)}
        >
            <div className={cn('w-full h-2/3 space-y-1', inputFieldClassName)}>
                <input
                    name="title"
                    type="text"
                    className={cn(
                        'w-full h-1/2 rounded-md border-gray-400 border-2 p-2',
                        todo.isDone && 'hover:cursor-not-allowed'
                    )}
                    placeholder="Enter your todo title"
                    {...register('title', {
                        required: "Todo's title is required",
                        disabled: todo.isDone,
                    })}
                />
                <input
                    name="deadline"
                    type="datetime-local"
                    title="Todo deadline"
                    className={cn(
                        'w-full h-1/2 rounded-md border-gray-400 border-2 p-2',
                        todo.isDone && 'hover:cursor-not-allowed'
                    )}
                    {...register('deadline', {
                        required: 'Todo deadline is required',
                        validate: (value) => {
                            const inputDate = new Date(value);
                            const minDate = new Date();
                            if (inputDate < minDate) {
                                return 'Todo deadline must be at least 1 minute ahead of current time';
                            }
                            if (inputDate instanceof Date && isNaN(inputDate)) {
                                return 'Invalid date';
                            }
                            return true;
                        },
                        setValueAs: (value) => new Date(value).getTime(),
                        disabled: todo.isDone,
                    })}
                    max="9999-12-31T23:59"
                />
            </div>
            <div className={cn('h-1/3', buttonClassName)}>
                <Button
                    type="submit"
                    className={cn(
                        todo.isDone &&
                            'bg-gray-500 hover:cursor-not-allowed hover:bg-gray-500'
                    )}
                    disabled={todo.isDone}
                >
                    {buttonText}
                </Button>
            </div>
        </form>
    );
};

Form.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    todo: PropTypes.object,
    buttonText: PropTypes.string.isRequired,
    className: PropTypes.string,
    inputFieldClassName: PropTypes.string,
    buttonClassName: PropTypes.string,
};

export default Form;
