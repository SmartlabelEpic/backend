import express from "express";
import cors from "cors";
import morgan from 'morgan';
import chalk from 'chalk';
import userRoutes from "./src/user/route.js";
import recipeRoutes from "./src/recipe/route.js";
import labelRoutes from "./src/labels/route.js";
import teamRoutes from "./src/team/route.js";
import brandRoutes from "./src/brand/route.js";
import consumerCareRoutes from "./src/consumercare/route.js";
import storageInstructionRoutes from "./src/storage-instruction/route.js";
import companyDetailsRoutes from "./src/company-details/route.js";
import foodNameRoutes from "./src/food-name/routes.js";
import addressRoutes from "./src/address/route.js";
import subscriptionRoutes from "./src/subscription/route.js";
import authenticateUser from "./middleware/authentication.js";

const app = express();
app.use(cors());
app.use(express.json());
morgan.token('statusColored', (req, res) => {
    const status = res.statusCode;
    if (status >= 500) return chalk.red(status); // Server errors
    if (status >= 400) return chalk.yellow(status); // Client errors
    if (status >= 300) return chalk.cyan(status); // Redirects
    if (status >= 200) return chalk.green(status); // Success
    return status;
});

// Apply the custom format
app.use(morgan((tokens, req, res) => {
    return [
        chalk.blue(tokens.method(req, res)), // Method (GET, POST, etc.)
        chalk.white(tokens.url(req, res)), // Requested URL
        tokens.statusColored(req, res), // Colorized status code
        chalk.magenta(tokens['response-time'](req, res) + ' ms'), // Response time
    ].join(' ');
}));

app.use("/uploads", express.static("uploads"));
app.use(authenticateUser);
app.use("/api/v1/me", userRoutes);
app.use("/api/v1/recipe", recipeRoutes);

app.use("/api/v1/team", teamRoutes);
app.use("/api/v1/brand", brandRoutes);
app.use("/api/v1/address", addressRoutes);
app.use("/api/v1/consumer-care", consumerCareRoutes);
app.use("/api/v1/storage-instruction", storageInstructionRoutes);
app.use("/api/v1/company-details", companyDetailsRoutes);
app.use("/api/v1/food-name", foodNameRoutes);
app.use("/api/v1/subscription", subscriptionRoutes);


app.use("/api/v1/label", labelRoutes);
export default app;
