"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
// Configurar variables de entorno
dotenv_1.default.config();
const app = (0, express_1.default)();
// Middlewares
app.use((0, cors_1.default)({
    origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
    credentials: true
}));
app.use(express_1.default.json({ limit: '10mb' }));
app.use(express_1.default.urlencoded({ extended: true }));
// Middleware de logging
app.use((req, _res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
    next();
});
// Rutas
app.get('/api/health', (_req, res) => {
    res.json({
        ok: true,
        message: 'API is running',
        timestamp: new Date().toISOString()
    });
});
// Ruta de bienvenida
app.get('/', (_req, res) => {
    res.json({
        message: 'Qualifica o seu Professor - API',
        version: '1.0.0',
        documentation: '/api/health'
    });
});
// Manejo de rutas no encontradas
app.use('*', (_req, res) => {
    res.status(404).json({
        message: 'Route not found',
        timestamp: new Date().toISOString()
    });
});
// Manejo global de errores
app.use((error, _req, res, _next) => {
    console.error('Error:', error);
    res.status(500).json({
        message: 'Internal server error',
        ...(process.env.NODE_ENV === 'development' && { error: error.message })
    });
});
exports.default = app;
//# sourceMappingURL=app.js.map