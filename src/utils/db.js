import axios from "axios";

const baseURL = import.meta.env.VITE_FIREBASE_DATABASE_URL;

if (!baseURL) {
	throw new Error("Missing VITE_FIREBASE_DATABASE_URL environment variable.");
}

const db = axios.create({
	baseURL,
});

db.interceptors.request.use((config) => {
	// Firebase RTDB expects `.json` at the end of paths.
	// Normalize relative URLs like "/reviews/1" -> "reviews/1.json"
	if (typeof config.url === "string" && !/^https?:\/\//i.test(config.url)) {
		const strippedPath = config.url.replace(/^\/+/, "").replace(/\.json$/, "");
		config.url = `${strippedPath}.json`;
	}
	return config;
});

export default db;
