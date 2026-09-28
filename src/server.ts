import './config.js';
import app from './infrastructure/http/app.js';

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 URS Gamara Backend Server listening on http://localhost:${PORT}`);
});
