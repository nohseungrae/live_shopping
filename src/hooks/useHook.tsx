import React, { useCallback } from 'react';
import { useState } from 'react';

export const useHook = (initialValue = null) => {
    const [value, setValue] = useState<any>(initialValue);
    const handler = useCallback((player: any) => {
        setValue(player);
    }, []);
    return [value, handler, setValue];
};
