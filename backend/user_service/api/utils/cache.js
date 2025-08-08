import { LRUCache } from "lru-cache"

const options = {
	maxSize: 100 * 1024 * 1024,
	ttl: 1000 * 60 * 60 * 24 * 28,
	onInsert: (value, key, reason) => {
		if (reason)
			console.log(key, value)
		else
			console.error(key, value)
	},
	sizeCalculation: (value) => {
		console.log("Buffersize: ", value.buffer.length);
		value.buffer.length
	}
}

export const cache = new LRUCache(options)
