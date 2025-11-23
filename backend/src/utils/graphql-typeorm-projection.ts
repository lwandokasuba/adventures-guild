/* eslint-disable @typescript-eslint/no-unsafe-member-access */
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

export interface GetQueryStructureResult {
  select?: string[];
  relations?: string[];
}

export function getQueryStructure(
  info: GraphQLResolveInfo,
): GetQueryStructureResult {
  const fields = graphqlFields(info);
  const select: string[] = [];
  const relations: string[] = [];

  for (const fieldName in fields) {
    if (Object.keys(fields[fieldName]).length === 0) {
      select.push(fieldName);
    } else {
      relations.push(fieldName);

      if (!select.includes('id') && !select.includes('uid')) {
        select.push('id');
      }
    }
  }

  if (!select.includes('id') && !select.includes('uid')) {
    select.push('id');
  }

  return { select, relations };
}
