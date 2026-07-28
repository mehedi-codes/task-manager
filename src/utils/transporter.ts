import nodemailer from "nodemailer";
import { env } from "@/config/env.js";

export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    pass: env.GOOGLE_APP_PASS,
    user: env.GOOGLE_APP_USER,
  },
});
