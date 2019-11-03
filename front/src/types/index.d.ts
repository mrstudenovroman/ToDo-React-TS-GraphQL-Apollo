declare module '*.gql' {
  // eslint-disable-next-line import/no-unresolved
  import { DocumentNode } from 'gql';

  const value: DocumentNode;
  export = value;
}
