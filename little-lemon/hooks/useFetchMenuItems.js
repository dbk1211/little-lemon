import { useState, useEffect } from "react";

const useFetchMenuItems = (url) => {
	const [menuItems, setMenuItems] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		fetch(url)
			.then((response) => {
				if (response.ok) {
					return response.json();
				}
				throw new Error("Network response failure.");
			})
			.then((data) => setMenuItems(data.menu))
			.catch((error) => setError(error))
			.finally(() => setLoading(false));
	}, [url]);

	return { menuItems, loading, error };
};

export default useFetchMenuItems;
