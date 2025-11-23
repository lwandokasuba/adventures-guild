import { ValueTransformer } from 'typeorm';

export const dateTransformer: ValueTransformer = {
  // Runs when reading from the database (DB value -> JS object)
  from: (dbValue: string): Date | null => {
    if (!dbValue) return null;
    return new Date(dbValue);
  },
  // Runs when writing to the database (JS object -> DB value)
  to: (jsValue: Date | null): string | null => {
    if (!jsValue) return null;
    return jsValue.toISOString().split('T')[0]; // Format as YYYY-MM-DD string
  },
};
