import { get, push, ref, remove, set } from "firebase/database";
import { db as firebaseDb } from "../firebase";

const normalizePath = (path) => {
	return path.replace(/^\/+/, "").replace(/\.json$/, "");
};

const db = {
	async get(path) {
		const snapshot = await get(ref(firebaseDb, normalizePath(path)));
		return { data: snapshot.exists() ? snapshot.val() : null };
	},

	async post(path, payload) {
		const newRecordRef = await push(ref(firebaseDb, normalizePath(path)), payload);
		return { data: { name: newRecordRef.key } };
	},

	async put(path, payload) {
		await set(ref(firebaseDb, normalizePath(path)), payload);
		return { data: payload };
	},

	async delete(path) {
		await remove(ref(firebaseDb, normalizePath(path)));
		return { data: null };
	},
};

export default db;
