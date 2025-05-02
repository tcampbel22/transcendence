export default {
	testEnvironment: 'node',
	transform: {},
	extensionsToTreatAsEsm: [".js"], // Treat .js files as ES modules
	moduleNameMapper: {
	  "^(\\.{1,2}/.*)\\.js$": "$1", // Fix imports by removing .js extensions
	},
	transformIgnorePatterns: [
		"/node_modules/(?!@error-lib)/", // Replace with the library name(s) you need to transform
	  ],
  };