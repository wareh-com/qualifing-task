import { createGenerateClassName, Theme } from '@material-ui/core/styles';
import { StylesCreator } from '@material-ui/core/styles/withStyles';
import { isServer } from 'features/enviroment';
import { GenerateClassName, SheetsRegistry } from 'jss';

export interface MUIPageContext {
  sheetsManager: Map<StylesCreator, Map<Theme, any>>;
  sheetsRegistry: SheetsRegistry;
  generateClassName: GenerateClassName;
}

function createPageContext(): MUIPageContext {
  return {
    // The standard class name generator.
    generateClassName: createGenerateClassName(),
    // This is needed in order to deduplicate the injection of CSS in the page.
    sheetsManager: new Map(),
    // This is needed in order to inject the critical CSS.
    sheetsRegistry: new SheetsRegistry(),
  };
}

export default function getPageContext(): MUIPageContext {
  // Make sure to create a new context for every server-side request so that data
  // isn't shared between connections (which would be bad).
  if (isServer) {
    return createPageContext();
  }

  // Reuse context on the client-side.
  if (!(global as any).__INIT_MATERIAL_UI__) {
    (global as any).__INIT_MATERIAL_UI__ = createPageContext();
  }

  return (global as any).__INIT_MATERIAL_UI__;
}
