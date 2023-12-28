import { test } from 'vitest'
import { adminRoutes } from "./adminRoutes";
import { Hono } from "hono";
import { Bindings } from "../types";
import { createMockContext } from 'hono/testing';

test('adminRoutes', async () => {
  const app = new Hono<{ Bindings: Bindings }>();
  adminRoutes(app);

  const mockContext = createMockContext({
    method: 'POST',
    url: '/admin-login',
    body: {
      email: 'test@example.com',
      password: 'password',
    },
  });

  const response = await app.handle(mockContext);

  // レスポンスが期待通りであることを確認します。
  // この例では、ステータスコードが200であること、ボディにtokenが含まれていることを確認します。
  expect(response.status).toBe(200);
  expect(response.body.token).toBeDefined();
})
