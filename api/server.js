import 'dotenv/config';
import express from 'express';
import sharp from 'sharp';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

// 
const __filename = fileURLToPath( import.meta.url );
const __dirname = path.dirname( __filename );

const app = express();
app.use( cors( { origin: '*' } ) );

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

app.get( '/:dimensions/:bgColor?/:fgColor?/:format?', ( req, res ) => {
    const { dimensions, bgColor = 'cccccc', fgColor = '000000', format = 'png' } = req.params;
    const [widthStr, heightStr] = dimensions.split( 'x' );
    const width = parseInt( widthStr ) || 300;
    const height = heightStr ? parseInt( heightStr ) : width;
    const imageFormat = validFormats.includes( format ) ? format : 'png';
    const text = req.query.text || `${width} x ${height}`;
    const customFontSize = req.query?.fontsize?.trim() || '';
    // Calculate font size based on image size
    let fontSize = Math.min( width, height ) / 5; // Base font size = 1/5 of the smallest dimension
    if ( fontSize < 10 ) fontSize = 10; // Minimum font size to prevent it from being too small

    // Create SVG with dynamic font size and padding
    const svg = `
                <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
                <style>
                @import url('https://fonts.googleapis.com/css2?family=Arial');
                </style>
                <rect width="100%" height="100%" fill="#${bgColor}"/>
                <text 
                    x="${width / 2}" 
                    y="${height / 1.7}" 
                    font-family="'Arial', sans-serif" 
                    font-size="${customFontSize ? customFontSize : fontSize}px" 
                    fill="#${fgColor}" 
                    text-anchor="middle" 
                    dominant-baseline="central"
                    alignment-baseline="middle"
                >
                    ${text}
                </text>
                </svg>`;


    // Generate image using Sharp
    sharp( Buffer.from( svg ) )
        .toFormat( imageFormat )
        .toBuffer()
        .then( ( data ) => {
            res.set( 'Content-Type', `image/${imageFormat}` );
            res.send( data );
        } )
        .catch( ( err ) => {
            console.error( err );
            res.status( 500 ).send( 'Error generating image' );
        } );
} );

// This is to make sure all other routes (not /) go to React's index.html
app.get( '*', ( req, res ) => {
    res.sendFile( path.join( __dirname, '../dist', 'index.html' ) );
} );

const port = process.env.PORT || 4000;

app.listen( port, () => {
    console.log( `Server listening on http://localhost:${port}` );
} );
