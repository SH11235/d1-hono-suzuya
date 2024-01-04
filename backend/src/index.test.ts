import { expect, test } from 'vitest'
import { Hono } from "hono";
import { Bindings } from "./types";

test('App initialization', () => {
    const app = new Hono<{ Bindings: Bindings }>();
    expect(app).toBeDefined();
});
