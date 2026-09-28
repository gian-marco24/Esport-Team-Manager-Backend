import express from 'express';
import './config.js';
import app from './infrastructure/http/app.js';
const PORT = process.env.PORT || 5000;
if (process.env.NODE_ENV !== 'production' || !process.env.VERCEL) {
    app.listen(PORT, () => {
        console.log(`🚀 URS Gamara Backend Server listening on http://localhost:${PORT}`);
    });
}
export { express };
export default app;
//# sourceMappingURL=server.js.map