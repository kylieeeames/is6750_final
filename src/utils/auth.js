import axios from "axios";
import { redirect } from "react-router-dom";
import db from "./db";

const FIREBASE_API_KEY =
  import.meta.env.VITE_FIREBASE_WEB_API_KEY || import.meta.env.VITE_FIREBASE_API_KEY;

async function sendAuthRequest(email, password, endpoint) {
  if (!FIREBASE_API_KEY) {
    throw new Error("Missing VITE_FIREBASE_WEB_API_KEY environment variable.");
  }

  const authUrl = `https://identitytoolkit.googleapis.com/v1/accounts:${endpoint}?key=${FIREBASE_API_KEY}`;

  const response = await axios.post(authUrl, {
    email,
    password,
    returnSecureToken: true,
  });

  return response;
}

function getRedirectTarget(request) {
  const url = new URL(request.url);
  return url.searchParams.get("redirectTo") || "/";
}

function parseAuthError(error) {
  const code = error.response?.data?.error?.message;

  const mappedMessages = {
    CONFIGURATION_NOT_FOUND:
      "Firebase Authentication is not configured for this project. In Firebase Console, enable Authentication and Email/Password sign-in.",
    OPERATION_NOT_ALLOWED:
      "Email/Password sign-in is disabled. Enable it in Firebase Console > Authentication > Sign-in method.",
    INVALID_API_KEY:
      "Invalid Firebase API key. Verify VITE_FIREBASE_WEB_API_KEY in .env.local and restart the dev server.",
    EMAIL_EXISTS: "An account with this email already exists. Try logging in.",
  };

  return mappedMessages[code] || code || error.message || "Authentication failed.";
}

export async function signupAction({ request }) {
  try {
    const formData = await request.formData();
    const firstname = formData.get("firstName");
    const lastname = formData.get("lastName");
    const email = formData.get("email");
    const password = formData.get("password");

    const response = await sendAuthRequest(email, password, "signUp");
    const expiresInMs = Number(response.data.expiresIn) * 1000;
    const expiration = new Date(Date.now() + expiresInMs).toISOString();

    const userData = {
      firstname,
      lastname,
      email,
      localId: response.data.localId,
      token: response.data.idToken,
      expiration,
    };

    localStorage.setItem("userData", JSON.stringify(userData));

    await db.put(`/users/${response.data.localId}`, {
      firstname,
      lastname,
      email,
      userId: response.data.localId,
    });

    return redirect(getRedirectTarget(request));
  } catch (error) {
    return {
      success: false,
      message: parseAuthError(error),
    };
  }
}

export async function loginAction({ request }) {
  try {
    const formData = await request.formData();
    const email = formData.get("email");
    const password = formData.get("password");

    const response = await sendAuthRequest(email, password, "signInWithPassword");
    const expiresInMs = Number(response.data.expiresIn) * 1000;
    const expiration = new Date(Date.now() + expiresInMs).toISOString();
    const localId = response.data.localId;

    const userRecordResponse = await db.get(`/users/${localId}`);
    const userRecord = userRecordResponse.data || {};

    const userData = {
      firstname: userRecord.firstname || "",
      lastname: userRecord.lastname || "",
      email: userRecord.email || response.data.email || email,
      localId,
      token: response.data.idToken,
      expiration,
    };

    localStorage.setItem("userData", JSON.stringify(userData));

    return redirect(getRedirectTarget(request));
  } catch (error) {
    return {
      success: false,
      message: parseAuthError(error),
    };
  }
}

export function logoutLoader() {
  localStorage.removeItem("userData");
  return redirect("/");
}

export function authStatusLoader() {
  const storedUserData = localStorage.getItem("userData");

  if (!storedUserData) {
    return null;
  }

  const userData = JSON.parse(storedUserData);

  if (!userData.expiration || new Date(userData.expiration) <= new Date()) {
    return redirect("/logout");
  }

  return userData;
}
