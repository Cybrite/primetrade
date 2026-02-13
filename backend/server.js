import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import swaggerUi from "swagger-ui-express";
import connectDB, { checkDBConnection } from "./config/database.js";
import swaggerSpec from "./config/swagger.js";
import authRoutes from "./routes/authRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";
import errorHandler from "./middleware/errorHandler.js";

dotenv.config();
connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());

app.use(
  cors({
    origin: process.env.NODE_ENV === "production" ? "your-frontend-url" : "*",
    credentials: true,
  }),
);

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

const limiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 100,
  message: "Too many requests from this IP, please try again later.",
});

app.use("/api/", limiter);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "PrimeTrade API is running",
    version: "1.0.0",
    documentation: "/api-docs",
  });
});

app.get("/health", (req, res) => {
  const dbStatus = checkDBConnection();

  res.status(dbStatus.isConnected ? 200 : 503).json({
    success: dbStatus.isConnected,
    message: dbStatus.isConnected
      ? "API is healthy"
      : "API is unhealthy - Database disconnected",
    timestamp: new Date().toISOString(),
    database: {
      status: dbStatus.status,
      host: dbStatus.host,
      name: dbStatus.name,
    },
  });
});

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/tasks", taskRoutes);

app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: "Route not found",
  });
});

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`
  ╔════════════════════════════════════════════════════════╗
  ║                                                        ║
  ║   🚀 Server running in ${process.env.NODE_ENV} mode           ║
  ║   📡 Port: ${PORT}                                      ║
  ║   📚 API Docs: http://localhost:${PORT}/api-docs        ║
  ║   🏥 Health Check: http://localhost:${PORT}/health      ║
  ║                                                        ║
  ╔════════════════════════════════════════════════════════╗
  `);
});

process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`);
  server.close(() => process.exit(1));
});

export default app;
