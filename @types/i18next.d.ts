import 'i18next';

import { resources } from '../core/resources/resources';

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'translation';
    resources: (typeof resources)['en'] | (typeof resources)['ru'];
  }
}
