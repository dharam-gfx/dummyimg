import 'dotenv/config';
import express from 'express';
import sharp from 'sharp';
import { createCanvas, registerFont  } from 'canvas';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

// 
const __filename = fileURLToPath( import.meta.url );
const __dirname = path.dirname( __filename );

const app = express();
app.use( cors( { origin: '*' } ) );
// Register the Google Font you downloaded
registerFont(path.join(__dirname, 'fonts', 'Roboto-Medium.ttf'), { family: 'Roboto' });

// Serve static files from the 'dist' directory (React app)
app.use( express.static( path.join( __dirname, '../dist' ) ) );

const validFormats = ['jpeg', 'png', 'webp', 'tiff'];

/**
 * This endpoint generates an image based on the query parameters.
 * The image is a simple text label with a background color and a
 * foreground color. The text is centered both horizontally and
 * vertically.
 *
 * @param {string} dimensions - The dimensions of the image in the format
 *   "widthxheight". If only one number is provided, it is used as both the
 *   width and height.
 * @param {string} [bgColor=cccccc] - The background color of the image in
 *   hexadecimal format.
 * @param {string} [fgColor=000000] - The foreground color of the image in
 *   hexadecimal format.
 * @param {string} [format=png] - The format of the image. Can be one of
 *   "jpeg", "png", "webp", or "tiff". If an invalid format is provided, it
 *   defaults to "png".
 * @param {string} [text] - The text to display on the image. If not provided,
 *   it defaults to the dimensions of the image.
 * @param {string} [fontsize] - The font size of the text. If not provided, it
 **/

app.get('/:dimensions/:bgColor?/:fgColor?/:format?', (req, res) => {
    const { dimensions, bgColor = 'cccccc', fgColor = '000000', format = 'png' } = req.params;
    const [widthStr, heightStr] = dimensions.split('x');
    const width = parseInt(widthStr) || 300;
    const height = heightStr ? parseInt(heightStr) : width;
    const imageFormat = validFormats.includes(format) ? format : 'png';
    const text = req.query.text || `${width} x ${height}`;
    const customFontSize = req.query?.fontsize?.trim() || '';
    const fontFamily = req.query?.fontFamily?.trim() || 'Roboto'; // Use Google font family

    // Create a canvas element
    const canvas = createCanvas(width, height);
    const ctx = canvas.getContext('2d');

    // Set background color
    ctx.fillStyle = `#${bgColor}`;
    ctx.fillRect(0, 0, width, height);

    // Set font size dynamically
    let fontSize = Math.min(width, height) / 5;
    if (fontSize < 10) fontSize = 10;
    if (customFontSize) {
        fontSize = parseInt(customFontSize);
    }

    // Set text settings with custom font and font-family
    ctx.fillStyle = `#${fgColor}`;
    ctx.font = `${fontSize}px ${fontFamily}`; // Use the provided font-family or default to Roboto
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    // Draw text on canvas
    ctx.fillText(decodeURIComponent(text), width / 2, height / 2);

    // Convert the canvas to a buffer and send the image
    canvas.toBuffer((err, buffer) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error generating image');
            return;
        }

        // Use Sharp to convert buffer to the requested format (if needed)
        sharp(buffer)
            .toFormat(imageFormat)
            .toBuffer()
            .then(data => {
                res.set('Content-Type', `image/${imageFormat}`);
                res.send(data);
            })
            .catch(sharpErr => {
                console.error(sharpErr);
                res.status(500).send('Error generating image');
            });
    });
});

// This is to make sure all other routes (not /) go to React's index.html
app.get( '*', ( req, res ) => {
    res.sendFile( path.join( __dirname, '../dist', 'index.html' ) );
} );

const port = process.env.PORT || 4000;

app.listen( port, () => {
    console.log( `Server listening on http://localhost:${port}` );
} );
