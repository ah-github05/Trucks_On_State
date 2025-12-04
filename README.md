# Capital City Food Carts 🚚

A centralized web application for discovering and exploring food carts throughout Madison, Wisconsin, with a focus on the State Street and Library Mall area.

## 🌟 Features

- **Browse Food Trucks**: View all available food carts in the Madison area
- **Search & Filter**: Search by name or description, filter by cuisine category and location
- **Detailed Information**: Access complete menus, pricing, schedules, and contact information
- **Real-Time Status**: See which carts are currently open
- **Mobile Responsive**: Seamless experience across all devices
- **Performance Tracking**: Integrated Vercel Analytics and SpeedInsights

## 🛠️ Tech Stack

### Frontend
- **React 19** with TypeScript
- **Vite** - Lightning-fast build tool
- **Wouter** - Lightweight client-side routing
- **TailwindCSS** - Utility-first styling
- **shadcn/ui** - Beautifully designed components
- **Radix UI** - Accessible component primitives
- **Framer Motion** - Animation library

### Backend (Development Only)
- **Express.js** - Node.js web framework for local development
- **TypeScript** - Type-safe development
- **Static JSON Export** - Production uses pre-generated `carts.json` file

### Deployment
- **Vercel** - Serverless deployment platform
- **Vercel Analytics** - User analytics
- **Vercel SpeedInsights** - Performance monitoring

## 📁 Project Structure

```
Capital_City_Food_Carts/
├── attached_assets/      # Source images (for processing/archival)
├── client/              # Frontend React application
│   ├── public/          # Static assets (images, carts.json)
│   ├── src/
│   │   ├── components/  # Reusable UI components
│   │   │   └── ui/      # shadcn/ui components
│   │   ├── hooks/       # Custom React hooks
│   │   ├── lib/         # Utility functions
│   │   ├── pages/       # Page components
│   │   ├── App.tsx      # Main app component
│   │   └── main.tsx     # Application entry point
│   └── index.html
├── server/              # Development server (not deployed)
│   ├── index.ts         # Server entry point
│   ├── routes.ts        # API route definitions (dev only)
│   ├── storage.ts       # Food cart data source
│   └── vite.ts          # Vite dev server configuration
├── scripts/             # Build and utility scripts
│   ├── export-carts.ts  # Exports storage.ts to carts.json
│   └── crop-image.py    # Image preprocessing script
├── shared/              # Shared TypeScript types/schemas
│   └── schema.ts        # Food cart data schema
├── dist/                # Production build output
│   └── public/          # Static files deployed to Vercel
│       ├── assets/      # Vite-bundled JS/CSS
│       ├── carts.json   # Generated cart data
│       └── *.jpg        # Cart images
└── vercel.json          # Vercel deployment configuration
```

## 🚀 Getting Started

### Prerequisites

- Node.js 20.x or later
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/ariavhayempour/Trucks_On_State.git
   cd Trucks_On_State
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

### Development

Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5000`

- Frontend hot module replacement (HMR) is enabled via Vite
- Backend Express server runs on port 5000 for development
- API routes available at `/api/*` (development only)

### Building for Production

```bash
npm run build
```

This command:
1. Exports cart data from `storage.ts` to `carts.json`
2. Builds the React frontend with Vite → `dist/public/`
3. Bundles the Express server with esbuild → `dist/index.js` (not used in production)

### Running Production Build Locally

```bash
npm start
```

Note: This runs the Express server locally. In production on Vercel, only static files are served.

## 🎨 Design System

### Color Scheme
- **Primary**: Red-maroon (`hsl(0 80% 45%)`)
- **Accent**: Yellow buttons and highlights
- **Text**: Dark gray on white backgrounds
- **Theme**: Red-maroon and white throughout

### Components
The application uses shadcn/ui components with custom Tailwind styling:
- Cards for cart listings
- Dialogs for detailed views
- Buttons with consistent styling
- Responsive navigation
- Accessible form controls

## 🔧 Configuration

### Vercel Configuration
The `vercel.json` file configures static site deployment:
- Static assets served from `dist/public`
- Client-side routing supported via rewrites
- No serverless functions used

## 📝 Adding New Food Carts

To add a new food cart:

1. Add the cart's image to `client/public/` (e.g., `new-cart.jpg`)
2. Edit `server/storage.ts` and add a new cart object:

```typescript
{
  slug: "unique-cart-slug",
  name: "Cart Name",
  description: "Brief description",
  image: "/cart-image.jpg",
  category: "cuisine-category",
  location: "location-slug",
  locationDisplayName: "Display Name",
  businessLinks: {
    website: "https://...",
    instagram: "https://...",
    facebook: "https://..."
  },
  menu: [
    { name: "Item Name", price: "$X.XX", description: "..." }
  ],
  schedule: {
    "Monday": "Hours or 'Closed'",
    // ... other days
  }
}
```

3. Run `npm run build` to regenerate `carts.json`
4. Commit and push to trigger Vercel deployment

## 🚢 Deployment

### Deploying to Vercel

1. **Connect your repository to Vercel**
   - Import project from GitHub
   - Vercel will auto-detect the configuration

2. **Build settings** (auto-configured via `vercel.json`)
   - Build Command: `npm run build`
   - Output Directory: `dist/public`

3. **Deploy**
   ```bash
   git push origin main
   ```
   Vercel will automatically deploy on push to main branch.


### Manual Deployment
```bash
vercel --prod
```

### Deployment Architecture

**Static Export Strategy:**
- Production uses a fully static site (no serverless functions)
- `npm run build` generates `carts.json` from `server/storage.ts`
- Vercel serves pre-built static files from `dist/public/`
- Client fetches `/carts.json` directly (no API calls)

**Benefits:**
- Lightning-fast page loads (no API latency)
- Lower hosting costs (no serverless compute)
- Better caching and CDN distribution
- Improved reliability

**Trade-off:**
- Updates require rebuild and redeployment
- No real-time data updates
- Manual process for content changes

## 📧 Contact

For questions, suggestions, or to add your food cart to the platform:
- Project Maintainer: Ariav Hayempour
- GitHub: [@ariavhayempour](https://github.com/ariavhayempour)
