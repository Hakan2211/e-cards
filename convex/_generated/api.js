/* eslint-disable */
/**
 * Generated API stub - will be replaced by `npx convex dev`
 * This file exists so that imports resolve during development.
 */

// This is a placeholder. Run `npx convex dev` to generate the real API.
export const api = new Proxy(
  {},
  {
    get(_target, prop) {
      return new Proxy(
        {},
        {
          get(_target2, prop2) {
            return `${String(prop)}:${String(prop2)}`;
          },
        }
      );
    },
  }
);
