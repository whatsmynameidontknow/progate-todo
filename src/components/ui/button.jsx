import { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { cn } from '@/lib/class';

const Button = forwardRef(
    ({ children, className, type = 'button', ...props }, ref) => {
        return (
            <button
                ref={ref}
                className={cn(
                    'w-full h-full border-2 rounded-md bg-gray-600 text-slate-200 hover:bg-gray-800',
                    className
                )}
                type={type}
                {...props}
            >
                {children}
            </button>
        );
    }
);

Button.displayName = 'Button';
Button.propTypes = {
    className: PropTypes.string,
    type: PropTypes.string,
    props: PropTypes.object,
    children: PropTypes.node,
};

export { Button };
