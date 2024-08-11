import app from "./app.js"

const PORT = 3000;
const HOST = 'localhost';

app.listen(PORT, function() {
  console.log(`Server starting on http://${HOST}:${PORT}`);
});