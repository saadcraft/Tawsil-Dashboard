'use client'

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export function useSearchLoader(watchedParams: string[] = []) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(false);
    }, [searchParams]);

    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        const newParams: Record<string, string> = {};
        watchedParams.forEach((key) => {
            let value = (formData.get(key) as string)?.trim() || '';

            // Special logic: remove leading 0s from "client" input
            if (key === 'search' || key === 'livreur') {
                value = value.replace(/^0+(?=\d)/, '');
            }

            newParams[key] = value;
        });

        // Check if any value actually changed
        const shouldUpdate = watchedParams.some(
            (key) => searchParams.get(key) !== newParams[key]
        );

        if (shouldUpdate) setIsLoading(true);

        const searchQuery = new URLSearchParams(newParams).toString();
        router.push(`?${searchQuery}`);
    };

    return { isLoading, handleSearch };
}