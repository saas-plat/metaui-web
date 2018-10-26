import routes from './routes';
import * as stores from './stores';
import controller from './controller';
import {
  registerActions,
  registerRoutes,
  registerStores,
  extendRender
} from 'saas-plat-clientfx';
import ModuleBreadcrumb from './components/portal/ModuleBreadcrumb';

registerStores(stores);
registerRoutes(routes);
registerActions(controller);
extendRender.breadcrumb = [...(extendRender.breadcrumb || []), ModuleBreadcrumb];
