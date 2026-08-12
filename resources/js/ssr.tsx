import ReactDOMServer from 'react-dom/server';
import { createInertiaApp } from '@inertiajs/react';
import createServer from '@inertiajs/react/server';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { route } from 'ziggy-js';
import { Ziggy } from './ziggy';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createServer((page) =>
    createInertiaApp({
        page,
        render: ReactDOMServer.renderToString,
        title: (title) => `${title} - ${appName}`,
        resolve: (name) =>
            resolvePageComponent(`./Pages/${name}.tsx`, import.meta.glob('./Pages/**/*.tsx')),
        setup: ({ App, props }) => {
            const pageProps = page.props as unknown as {
                ziggy?: typeof Ziggy;
                location?: string;
            };

            const ziggyConfig = {
                ...(pageProps.ziggy ?? Ziggy),
                location: new URL(pageProps.location ?? pageProps.ziggy?.location ?? Ziggy.url),
            };

            (globalThis as unknown as { route: typeof route }).route = (name, params, absolute, config = ziggyConfig) =>
                route(name, params, absolute, config);

            return <App {...props} />;
        },
    })
);