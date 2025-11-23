/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { GraphQLResolveInfo } from 'graphql';
import graphqlFields from 'graphql-fields';

export function getSelectedFields(info: GraphQLResolveInfo): string[] {
  const fields = graphqlFields(info);

  const selectedFields = Object.keys(fields);

  if (!selectedFields.includes('id') && !selectedFields.includes('uid')) {
    selectedFields.push('id');
  }

  return selectedFields;
}
