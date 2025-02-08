const express = require('express');
const multer = require('multer');
const sharp = require('sharp');
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const { S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand } = require('@aws-sdk/client-s3');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');
const router = express.Router();
const pool = require('../db');

const bucketName = process.env.BUCKET_NAME;
const bucketRegion = process.env.BUCKET_REGION;
const accessKey = process.env.ACCESS_KEY;
const secretAccessKey = process.env.SECRET_ACCESS_KEY;

// Initialized s3 with credentials.
const s3 = new S3Client({
  credentials: {
    accessKeyId: accessKey,
    secretAccessKey: secretAccessKey,
  },
  region: bucketRegion,
});

// need random unique name for each image to store in db.
const randomImageName = (bytes = 32) => crypto.randomBytes(bytes).toString('hex');

// Multer temporarily stores image before sending to db.
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Get all users
router.get('/getallids', (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) {
      console.error(err);
      res.status(500).send('Database connection error');
      return;
    }
    connection.query('SELECT * FROM cred', async (err, rows) => {
      connection.release();
      if (!err) {
        for (const user of rows) {
          // if image exists:
          if (user.image) {
            // For each image, get bucket name and user image name as key.
            const getObjectParams = { Bucket: bucketName, Key: user.image };
            // Getting data from aws.
            const command = new GetObjectCommand(getObjectParams);
            // Generating URL.            
            user.image = await getSignedUrl(s3, command, { expiresIn: 3600 });
          }
        }
        res.send(rows);
      } else {
        console.error(err);
        res.status(500).send('Error fetching data');
      }
    });
  });
});

// Add a user
router.post('/adduser', upload.single('image'), async (req, res) => {
  const { name, email, password } = req.body;
  let imageName = null;

  if (req.file) {
    imageName = randomImageName();
    // image being resized. Will be changed when putting back to frontend.
    const buffer = await sharp(req.file.buffer)
      .resize({ height: 1920, width: 1080, fit: 'contain' })
      .toBuffer();

    const params = {
      Bucket: bucketName,
      Key: imageName,
      Body: buffer,
      ContentType: req.file.mimetype,
    };

    const command = new PutObjectCommand(params);
    await s3.send(command);
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  pool.getConnection((err, connection) => {
    if (err) {
      console.error(err);
      res.status(500).send('Database connection error');
      return;
    }
    connection.query(
      'INSERT INTO cred (name, password, email, image) VALUES (?, ?, ?, ?)', 
      [name, hashedPassword, email, imageName], 
      (err, results) => {
        connection.release();
        if (!err) {
          res.send(`User ${name} added successfully`);
        } else {
          console.error(err);
          res.status(500).send('Error inserting user');
        }
      });
  });
});

// Update a user by ID
router.put('/updateuser/:id', upload.single('image'), async (req, res) => {
  const { name, email, password } = req.body;
  const { id } = req.params;
  let imageName = null;

  if (req.file) {
    imageName = randomImageName();
    const buffer = await sharp(req.file.buffer)
      .resize({ height: 1920, width: 1080, fit: 'contain' })
      .toBuffer();

    const params = {
      Bucket: bucketName,
      Key: imageName,
      Body: buffer,
      ContentType: req.file.mimetype,
    };
    const command = new PutObjectCommand(params);
    await s3.send(command);
  }

  const hashedPassword = password ? await bcrypt.hash(password, 10) : null;

  pool.getConnection((err, connection) => {
    if (err) {
      console.error(err);
      res.status(500).send('Database connection error');
      return;
    }
    const query = 'UPDATE cred SET name = ?, password = ?, email = ?, image = ? WHERE id = ?';
    connection.query(query, [name, hashedPassword, email, imageName, id], (err, results) => {
      connection.release();
      if (!err) {
        res.send(`User with ID ${id} updated successfully`);
      } else {
        console.error(err);
        res.status(500).send('Error updating user');
      }
    });
  });
});

// Delete a user by ID
router.delete('/getallids/:id', async (req, res) => {
  const { id } = req.params;

  pool.getConnection((err, connection) => {
    if (err) {
      console.error(err);
      res.status(500).send('Database connection error');
      return;
    }
    connection.query('SELECT image FROM cred WHERE id = ?', [id], async (err, results) => {
      if (err) {
        connection.release();
        console.error(err);
        res.status(500).send('Error fetching user');
        return;
      }

      const imageName = results[0]?.image;

      if (imageName) {
        const params = { Bucket: bucketName, Key: imageName };
        const command = new DeleteObjectCommand(params);
        await s3.send(command);
      }

      connection.query('DELETE FROM cred WHERE id = ?', [id], (err, results) => {
        connection.release();
        if (!err) {
          res.send(`ID ${id} deleted`);
        } else {
          console.error(err);
          res.status(500).send('Error deleting ID');
        }
      });
    });
  });
});

router.post('/signin', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  pool.getConnection((err, connection) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Database connection error' });
    }

    const query = 'SELECT * FROM cred WHERE email = ?';
    connection.query(query, [email], async (err, results) => {
      connection.release();
      if (err) {
        console.error(err);
        return res.status(500).json({ message: 'Error querying the database' });
      }

      if (results.length === 0) {
        return res.status(404).json({ message: 'User not found' });
      }
      const user = results[0];
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ message: 'Invalid password' });
      }
      res.status(200).json({ message: 'Login successful' });
    });
  });
});

module.exports = router;