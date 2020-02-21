import { PUBLIC_ROUTES } from './routes';
import Dashboard from "../pages/Dashboard";
import Request from "../pages/Request/Request";

export const GLOBAL_ROUTES = [
  {
    Component: Dashboard,
    path: `/${PUBLIC_ROUTES.DASHBOARD}`,
  },
  {
    Component: Request,
    path: `/${PUBLIC_ROUTES.REQUEST}`,
  },

];

