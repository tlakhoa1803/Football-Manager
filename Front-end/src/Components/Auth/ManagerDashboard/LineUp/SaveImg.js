import express from 'express';
import fs from 'fs';

const app = express();

app.use(express.json({ limit: '50mb' })); // Increase the limit for incoming request bodies

app.post('/lineup', (req, res) => {
  const img = req.body.img;
  const filename = req.body.filename || 'output.png';
  // Remove 'data:image/png;base64,' from the start of the string
  const base64Data = img.replace(/^data:image\/png;base64,/, "");

  fs.writeFile(filename, base64Data, 'base64', (err) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error saving image');
      return;
    }
    console.log("Image saved successfully!");
    res.send('Image saved successfully!');
  });
});

app.listen(8888, () => {
  console.log('Server is running on port 8888');
});