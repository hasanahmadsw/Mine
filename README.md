# Hasan Ahmad

A multilingual professional website for Hasan Ahmad, CEO of BlendLab, built with Next.js 15 and React 19.

## Features

- **Multilingual Support**: Fully supports English and Arabic with automatic content adaptation
- **Responsive Design**: Optimized for all screen sizes with a clean, minimalist aesthetic
- **Dark/Light Mode**: Theme switching with next-themes
- **Modern Stack**: Built with Next.js 15, React 19, TypeScript, and Tailwind CSS v4

## Getting Started

### Prerequisites

- Node.js 18.0.0 or later
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/hasanahmadsw/Mine.git
cd Mine

# Install dependencies
npm install
# or
yarn install

# Start the development server
npm run dev
# or
yarn dev
```

The application will be available at [http://localhost:3000](http://localhost:3000).

## Project Structure

```
.
├── app/                  # Next.js App Router structure
│   ├── [lang]/           # Language-specific routes
│   ├── api/              # API routes
│   └── i18n/             # Internationalization configuration
├── components/           # React components
│   ├── sections/         # Page sections
│   └── ui/               # UI components
├── lib/                  # Utility functions and services
├── public/               # Static assets
└── styles/               # Global styles
```

## Internationalization

The website supports both English and Arabic. Language files are located in `app/i18n/locales/`.

To add a new language:
1. Create a new file in the locales directory
2. Add the language code to the supported locales in `app/i18n/settings.ts`

## Deployment

This project is configured for deployment on Vercel:

```bash
npm run build
# or
yarn build
```

## License

All rights reserved. This codebase is proprietary and confidential.

## Contact

Hasan Ahmad - CEO, BlendLab
hasanahmad@blendlab.com
