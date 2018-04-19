import { getMetadataArgsStorage } from 'routing-controllers';

/**
 * Injects a request's http header value to the controller action parameter.
 * Must be applied on a controller action parameter.
 */
export function authorizeRequire(): Function {
  return (clsOrObject: Function | Object, method?: string) => {
    getMetadataArgsStorage().responseHandlers.push({
      method,
      type: 'authorized',
      target: method ? clsOrObject.constructor : clsOrObject as Function,
      value: 'test',
    });
  };
}
