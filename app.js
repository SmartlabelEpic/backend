import express from 'express';
import user from './src/user/route.js'
import recipe from './src/recipe/route.js'
import label from './src/labels/route.js'
import team from './src/team/route.js'
import brand from './src/brand/route.js'
import consumerCare from './src/consumercare/route.js'
import storageInstruction from './src/storage-instruction/route.js'
import companyDetails from './src/company-details/route.js'
import foodName from './src/food-name/routes.js'
import subscription from "./src/subscription/model.js";
import authenticateUser from './middleware/authentication.js';
import cors from 'cors'
import address from './src/address/route.js';
const app = express();


app.use(cors())
// app.post('/upload', (req, res) => {
//     const form = new formidable.IncomingForm();

//     // Set upload directory and keep extensions
//     form.uploadDir = path.join(__dirname, 'uploads');
//     form.keepExtensions = true;

//     // Parse the incoming request
//     form.parse(req, (err, fields, files) => {
//       if (err) {
//         res.status(500).json({ error: 'File upload failed' });
//         return;
//       }
//       // Send back the file info
//       res.json({ file: files.file });
//     });
//   });
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(express.json())
app.use('/api/v1/me', user)
app.use('/api/v1/recipe', recipe)
app.use('/api/v1/label', label);
app.use('/api/v1/team', team);
app.use('/api/v1/subscription', subscription)
app.use(authenticateUser);
app.use('/api/v1/brand', brand)
app.use('/api/v1/address', address)
app.use('/api/v1/consumer-care', consumerCare)
app.use('/api/v1/storage-instruction', storageInstruction)
app.use('/api/v1/company-details', companyDetails)
app.use('/api/v1/food-name', foodName)




export default app;