const App = require('./app');

async function main() {
    const app = new App(4000);
    await app.Listening_port();
}

main();