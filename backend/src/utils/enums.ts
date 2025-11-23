import { registerEnumType } from '@nestjs/graphql';

export enum Rank {
  F = 'F',
  E = 'E',
  D = 'D',
  C = 'C',
  B = 'B',
  A = 'A',
  S = 'S',
}

registerEnumType(Rank, {
  name: 'Rank',
  description: 'The ranks available for users',
});
