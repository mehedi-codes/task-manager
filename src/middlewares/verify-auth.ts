import { auth } from "@/config/auth.js";
import { factory } from "@/utils/factory.js";
import { httpStatus, sendResponse } from "@/utils/response.js";

export const verifyAuth = () => {
  return factory.createMiddleware(async (c, next) => {
    const session = await auth.api.getSession({ headers: c.req.raw.headers });
    if (!session) {
      return sendResponse(c, {
        message: "Unauthorized",
        statusCode: httpStatus.UNAUTHORIZED,
        success: false,
      });
    }
    c.set("user", session.user);
    c.set("session", session.session);
    await next();
  });
};
