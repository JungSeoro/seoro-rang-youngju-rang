import { useEffect } from 'react';

export const useScrollEvent = (listener) => {
    useEffect(() => {
        window.addEventListener('scroll', listener);
        return () => {
            window.removeEventListener('scroll', listener);
        };
    }, []);
};