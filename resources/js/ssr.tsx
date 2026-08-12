import ReactDOMServer from 'react-dom/server';
import { createInertiaApp } from '@inertiajs/react';
import createServer from '@inertiajs/react/server';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { route } from 'ziggy-js';
import Ziggy from './ziggy';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createServer((page) =>
    createInertiaApp({
        page,
        render: ReactDOMServer.renderToString,
        title: (title) => `${title} - ${appName}`,
        resolve: (name) =>
            resolvePageComponent(`./Pages/${name}.tsx`, import.meta.glob('./Pages/**/*.tsx')),
        setup: ({ App, props }) => {
            // Ambil data ziggy dari page props secara dinamis
            const pageZiggy = (page.props as any).ziggy;

            // Satukan konfigurasi untuk runtime SSR
            const ziggyConfig = {
                ...(pageZiggy ?? Ziggy),
                location: new URL(
                    (page.props as any).location ?? 
                    pageZiggy?.location ?? 
                    (Ziggy as any).url
                ),
            };

            // Injeksi fungsi global route dengan bypass type-overload mismatch
            (globalThis as any).route = (
                name?: string,
                params?: any,
                absolute?: boolean,
                config = ziggyConfig
            ) => route(name as any, params, absolute, config as any);

            return <App {...props} />;
        },
    })
);