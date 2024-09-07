Here’s the updated `README.md` with a preview of the generated image link:

---

# dummyImg

`dummyImg` is a full-stack application that allows users to generate custom dummy images with specific dimensions, colors, and text. It includes a backend for image processing and a front-end for interacting with the image generator. The website supports both light and dark mode themes.

## Project Structure

```
DUMMYIMG/
├── api/                   # Backend folder (Express server and image generation logic)
├── dist/                  # Build folder for production files (frontend)
├── front-end/             # Frontend folder (Next.js app)
│   ├── dist/              # Build folder for production files (frontend)
│   ├── node_modules/      # Frontend dependencies
│   ├── public/            # Static assets for frontend
│   ├── src/               # Source files for the frontend
│   │   ├── assets/        # Assets like images, fonts, etc.
│   │   ├── components/    # Reusable React components
│   │   ├── App.css        # Global styling
│   │   ├── App.jsx        # Main React App component
│   │   ├── index.css      # Global CSS file
│   │   ├── main.jsx       # Main entry point for React app
│   ├── .eslintrc.cjs      # ESLint configuration for linting
│   ├── .gitignore         # Files to ignore in version control
│   ├── index.html         # Main HTML template
│   ├── package-lock.json  # Lockfile for npm dependencies
│   ├── package.json       # Project metadata and dependencies
│   ├── postcss.config.js  # PostCSS configuration
│   ├── README.md          # Project documentation
│   ├── tailwind.config.js # Tailwind CSS configuration
│   ├── vite.config.js     # Vite bundler configuration
├── node_modules/          # Backend dependencies
├── public/                # Static assets (root-level)
├── .gitignore             # Files to ignore in version control
├── package-lock.json      # Lockfile for backend npm dependencies
├── package.json           # Backend project metadata and dependencies
├── README.md              # Project documentation
├── vercel.json            # Vercel configuration file for deployment
└── .env                   # Environment variables
```

## Front-End

### Description

The front-end of `dummyImg` is built using Next.js with React and styled using Tailwind CSS. It allows users to specify parameters for generating dummy images and view the results. The website is available in both light and dark mode themes.

### Scripts

- `dev`: Starts the Vite development server.
- `build`: Builds the project for production.
- `lint`: Runs ESLint to check code quality.
- `preview`: Previews the production build locally.
- `format`: Formats code using Prettier.
- `test`: Placeholder for running tests.

### Dependencies

- `axios`: For making HTTP requests.
- `react`, `react-dom`: React library and DOM bindings.
- `react-hot-toast`: For toast notifications.

### Development Tools

- `@vitejs/plugin-react`: Vite plugin for React support.
- `eslint`, `eslint-plugin-react`, `eslint-plugin-react-hooks`, `eslint-plugin-react-refresh`: For linting and code quality.
- `prettier`: Code formatter.
- `tailwindcss`: For utility-first CSS.
- `vite`: Bundler and development server.

## Back-End

### Description

The back-end of `dummyImg` is built using Node.js with Express. It handles image generation based on user parameters and serves the images via custom URLs.

### Scripts

- `start`: Starts the server using Node.js.
- `dev`: Starts the server in development mode with `nodemon`.
- `build`: Placeholder script to build the project (if needed).
- `test`: Placeholder for running tests.

### Dependencies

- `canvas`: For canvas operations (image creation/manipulation).
- `cors`: Middleware to enable CORS.
- `dotenv`: For managing environment variables.
- `express`: Web framework for Node.js.
- `sharp`: High-performance image processing.

### Development Tools

- `nodemon`: Automatically restarts the server during development.

## Getting Started

### Front-End

1. Navigate to the `front-end` directory:
   ```bash
   cd front-end
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

### Back-End

1. Navigate to the `api` directory:
   ```bash
   cd api
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the server:
   ```bash
   npm run dev
   ```

## Deployment

To deploy the project, use Vercel or another preferred hosting service. Ensure that environment variables are properly set up in your deployment environment.

## Website Preview

- **Website**: [https://dummyimg.vercel.app/](https://dummyimg.vercel.app/)
- **Preview Image**: ![Preview](https://raw.githubusercontent.com/dharam-gfx/dummyimg/master/front-end/src/assets/images/preview-dummyImg.jpg)

## Generated Image Link

Here’s an example of a generated image link:

- **Link**: [https://dummyimg.vercel.app/400x100/7c04ec/ffffff/png?text=&fontsize=](https://dummyimg.vercel.app/400x100/7c04ec/ffffff/png?text=&fontsize=)
- **Preview**: ![Generated Image](https://dummyimg.vercel.app/400x100/7c04ec/ffffff/png?text=&fontsize=)

## License

This project is licensed under the MIT License.

---

Feel free to make any additional modifications as needed!