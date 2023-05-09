import { randomBytes } from "crypto";

export function randomHexString(length = 16): string {
  return randomBytes(length).toString("hex");
}
