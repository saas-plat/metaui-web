import Module from './pages/Module';

export default [{
  path: '/:orgid/:mid([^/]+/[^/]+)/:code?',
  component: Module,
}]
