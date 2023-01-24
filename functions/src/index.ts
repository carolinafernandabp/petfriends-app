import * as functions from "firebase-functions";
import { createUserApp } from "./create-user";

// // Start writing functions
// // https://firebase.google.com/docs/functions/typescript
//
export const createUser = functions.https.onRequest(createUserApp);
