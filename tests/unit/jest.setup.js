/* eslint-disable no-undef */
// This will be set before every test
beforeEach(() => {
  // const { error } = global.console;
  global.console.error = (...args) => {
    for (let i = 0; i < args.length; i++) {
      const arg = args[i];
      if (typeof arg === "string") {
        throw new Error(format(...args));
      }
    }
  };
});
