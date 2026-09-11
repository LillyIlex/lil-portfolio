/**
 * Single source of truth for every in-app route path. Reference `ROUTES.x`
 * anywhere a path is needed (routing config, <Link>/navigate calls, nav
 * data, CTAs) instead of hardcoding strings — renaming or restructuring a
 * route then only means changing it here.
 */
export const ROUTES = {
    home: "/",
    projects: "/projects",
    development: "/development",
    code: "/code",
  } as const;
  
  export type RouteKey = keyof typeof ROUTES;
  export type RoutePath = (typeof ROUTES)[RouteKey];