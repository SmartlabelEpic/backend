import express from 'express';
import user from './src/user/route.js'
import recipe from './src/recipe/route.js'
import label from './src/labels/route.js'
import team from './src/team/route.js'
import subscription from "./src/subscription/model.js";
import authenticateUser from './middleware/authentication.js';
import cors from 'cors'
const app = express();


app.use(cors())
app.use(express.json())
app.use('/api/v1/me', user)
app.use('/api/v1/recipe', authenticateUser, recipe)
app.use('/api/v1/label', label);
app.use('/api/v1/team', team);
app.use('/api/v1/subscription', subscription)




export default app;