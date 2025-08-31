import { ButtonHTMLAttributes, ReactNode } from 'react';

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean;
  icon?: ReactNode;
};

export function Button({ children, className, loading, icon, ...props }: Props) {
  return (
    <button
      className={`px-3 py-1 rounded-xl bg-gray-400 text-white font-medium hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
      disabled={loading || props.disabled}
      {...props}
    >
      {loading ? (
        'Loading...'
      ) : (
        <>
          {icon}
          {children}
        </>
      )}
    </button>
  );
}
