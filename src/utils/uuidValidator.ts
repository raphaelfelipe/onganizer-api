import { version as uuidVersion, validate as uuidValidate } from "uuid";

export default function uuidValidateV4(id: string) {
  return uuidValidate(id) && uuidVersion(id) === 4;
}
