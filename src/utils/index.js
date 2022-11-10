//**Function removes object keys with empty values


import axios from "axios";

export const clearObject = (obj) => {
	for (const key in obj) {
		if (obj[key] === '' || null || undefined) {
			delete obj[key]
		}
	}
	return obj
};

//**Formats price number
export const formatter = new Intl.NumberFormat("ru", {
	maximumFractionDigits: 2,
	minimumFractionDigits: 2,
	// style: "currency",
	// currency: "RUR"
});

//** Adds new key-value to existing json formatted data
export const injectKeyValueInArray = (array, keyValues) => {
	return new Promise((resolve, reject) => {
		if (!array.length)
			return resolve(array);

		array.forEach((object) => {
			for (let key in keyValues) {
				object[key] = keyValues[key]
			}
		});
		resolve(array);
	})
};

//** Function that executes axios
/*
export const executeAxios = async (url, payload) => {
	try {
		const res = await fetch(url, {
			method: "POST",
			body: JSON.stringify(payload)
		});
		if (!res.ok) {
			console.log( 'Ошибка загрузки данных' )
		}
		return await res.json()
	}catch (e) {
		console.log(e.message)
	}

}
*/

export const executeAxios = async (url, payload) => await axios.post(url, payload);
