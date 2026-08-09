import { Config } from 'ziggy-js';

export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at: string;
}

export interface Journal {
    id: number;
    title: string;
    category: string;
    content: string;
    created_at: string;
}

export interface PaginatedLinks {
    url: string | null;
    label: string;
    active: boolean;
}

export type PageProps<T extends Record<string, unknown> = Record<string, unknown>> = T & {
    auth: {
        user: User;
    };
    ziggy: Config & { location: string };
};
