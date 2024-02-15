import { JwtAdminPayloadType } from "../types/jwtType";
import { decode } from "js-base64";

export const decodePayload = (token: string): JwtAdminPayloadType => {
    // JWTは、`.`で区切られた3つの部分から成り立っている
    // ヘッダー（Header）: トークンのタイプと、使用されているハッシュアルゴリズムを含む
    // ペイロード（Payload）: トークンに含まれるクレーム（情報）を含む
    // 署名（Signature）: ヘッダーとペイロードを確認し、その内容が変更されていないことを保証する
    const payload = token.split(".")[1];
    const decodedPayload = decode(payload);
    return JSON.parse(decodedPayload) as JwtAdminPayloadType;
};
