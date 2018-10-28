import routes from './routes';
import * as stores from './stores';
import controller from './controller';
import ModuleBreadcrumb from './components/portal/ModuleBreadcrumb';
import {
  registerActions,
  registerRoutes,
  registerStores,
  appendRenders
} from 'saas-plat-clientfx';

registerStores(stores);
registerRoutes(routes);
registerActions(controller);
appendRenders('breadcrumb', ModuleBreadcrumb);
