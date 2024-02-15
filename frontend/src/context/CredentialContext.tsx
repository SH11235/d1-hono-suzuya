"use client";

import { createContext } from "react";
import { IJwtAdminContext } from "../types/jwtType";

const JwtContext = createContext<IJwtAdminContext | undefined>(undefined);

export { JwtContext };
