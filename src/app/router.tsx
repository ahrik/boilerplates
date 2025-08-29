import { createRootRoute, createRoute, createRouter, lazyRouteComponent } from '@tanstack/react-router';
import { ForbiddenPage } from '@pages/Forbidden.page';
import { NotFoundPage } from '@pages/NotFound.page';
import { ROUTERS } from '@shared/constants';
import { ThemeProvider } from '@shared/theme';
import { ThemeLoader } from '@/app/loaders/ThemeLoader';
import { AppLayout } from './layouts/app-layout';
import { ProtectedLayout } from './layouts/protected-layout';
import { PublicLayout } from './layouts/public-layout';
import { AppLoader } from './loaders/AppLoader';
import { AppProvider } from './providers/AppProvider';
import { QueryProvider } from './providers/QueryProvider';

const rootRoute = createRootRoute({
  component: () => (
    <>
      <QueryProvider>
        <ThemeProvider>
          <AppLoader>
            <ThemeLoader>
              <AppProvider>
                <AppLayout />
              </AppProvider>
            </ThemeLoader>
          </AppLoader>
        </ThemeProvider>
      </QueryProvider>
    </>
  ),
  notFoundComponent: NotFoundPage,
});

const protectedLayoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: 'protectedLayout',
  component: () => <ProtectedLayout />,
});

const publicLayoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: 'publicLayout',
  component: () => <PublicLayout />,
});

const homeRoute = createRoute({
  getParentRoute: () => protectedLayoutRoute,
  path: ROUTERS.ROOT,
  component: lazyRouteComponent(() => import('@pages/home'), 'HomePage'),
});

const signInRoute = createRoute({
  getParentRoute: () => publicLayoutRoute,
  path: ROUTERS.SIGN_IN,
  component: lazyRouteComponent(() => import('@pages/sign-in'), 'SignInPage'),
});

const forbiddenRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: ROUTERS.FORBIDDEN,
  component: ForbiddenPage,
});

const routeTree = rootRoute.addChildren([
  protectedLayoutRoute.addChildren([homeRoute]),
  publicLayoutRoute.addChildren([signInRoute]),
  forbiddenRoute,
]);

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export const router = createRouter({ routeTree });
