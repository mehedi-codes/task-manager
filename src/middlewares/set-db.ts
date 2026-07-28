import { db } from "@/config/db.js";
import { factory } from "@/utils/factory.js";

export const setDb = () => {
  return factory.createMiddleware(async (c, next) => {
    c.set("db", db);
    await next();
  });
};
