import PropTypes from 'prop-types';

const TodoItemPropTypes = PropTypes.shape({
    ID: PropTypes.number,
    title: PropTypes.string,
    deadline: PropTypes.number,
    isDone: PropTypes.bool,
});

export default TodoItemPropTypes;
