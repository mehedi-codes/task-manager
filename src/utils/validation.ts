import type { ZodType } from "zod";
import { z } from "zod";

export const envInteger = (name: string, defaultValue: number) =>
  z.coerce
    .number({ error: `Provide a valid ${name} number` })
    .int({ error: `${name} must be an integer` })
    .positive({ error: `${name} must be greater than 0` })
    .default(defaultValue);

export const envEnum = <T extends [string, ...string[]]>(values: T, defaultValue: T[number]) =>
  z.enum(values).default(defaultValue);

const printErrorTree = (tree: Record<string, unknown>, path: string[] = []): void => {
  const errors = (tree as { errors?: string[] }).errors;
  if (errors?.length) {
    const label = path.length ? path.join(".") : "(root)";
    console.error(`  • ${label}: ${errors.join(", ")}`);
  }

  const properties = (tree as { properties?: Record<string, unknown> }).properties;
  if (properties) {
    for (const [key, value] of Object.entries(properties)) {
      printErrorTree(value as Record<string, unknown>, [...path, key]);
    }
  }
};

export const validateEnv = <T extends ZodType>(schema: T): z.infer<T> => {
  const parsed = schema.safeParse(process.env);

  if (!parsed.success) {
    const tree = z.treeifyError(parsed.error);

    console.error("\nInvalid environment variables\n");
    printErrorTree(tree);
    console.error();

    process.exit(1);
  }

  return parsed.data;
};
