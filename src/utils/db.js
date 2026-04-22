import axios from "axios";

const db = axios.create({
	baseURL: "https://evans-multi-shop-default-rtdb.firebaseio.com/",
});

export default db;
