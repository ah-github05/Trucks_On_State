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
- **React 18** with TypeScript
- **Vite** - Lightning-fast build tool
- **Wouter** - Lightweight client-side routing
- **TailwindCSS** - Utility-first styling
- **shadcn/ui** - Beautifully designed components
- **Tanstack Query** - Powerful data fetching and caching
- **Radix UI** - Accessible component primitives
- **Framer Motion** - Animation library

### Backend
- **Express.js** - Node.js web framework
- **TypeScript** - Type-safe development
- **In-Memory Storage** - Fast data access with seeded cart data
- **Drizzle ORM** - Type-safe SQL query builder (configured for future PostgreSQL integration)

### Deployment
- **Vercel** - Serverless deployment platform
- **Vercel Analytics** - User analytics
- **Vercel SpeedInsights** - Performance monitoring

## 📁 Project Structure

```
Trucks_On_State/
├── api/                    # Vercel serverless functions
│   └── index.ts           # Main API handler
├── client/                # Frontend React application
│   ├── public/           # Static assets (images)
│   ├── src/
│   │   ├── components/   # Reusable UI components
│   │   ├── lib/          # Utility functions
│   │   ├── pages/        # Page components
│   │   └── main.tsx      # Application entry point
│   └── index.html
├── server/               # Backend Express application
│   ├── index.ts         # Server entry point
│   ├── routes.ts        # API route definitions
│   ├── storage.ts       # Data storage implementation
│   └── vite.ts          # Vite dev server configuration
├── shared/              # Shared TypeScript types/schemas
│   └── schema.ts        # Food cart data schema
├── dist/                # Production build output
│   ├── public/         # Frontend static files
│   └── index.js        # Compiled server
└── vercel.json         # Vercel deployment configuration
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
- Backend server runs on port 5000
- API routes are available at `/api/*`

### Building for Production

```bash
npm run build
```

This command:
1. Builds the React frontend with Vite → `dist/public/`
2. Bundles the Express server with esbuild → `dist/index.js`

### Running Production Build Locally

```bash
npm start
```

## 📡 API Documentation

### Base URL
- Development: `http://localhost:5000/api`
- Production: `https://your-domain.vercel.app/api`

### Endpoints

#### Get All Food Trucks
```http
GET /api/food-carts
```

**Response:**
```json
[
  {
    "id": 1,
    "slug": "roost",
    "name": "The Roost Fried Chicken",
    "description": "Crispy fried chicken with spicy dry rubs",
    "image": "/roost_pic.jpg",
    "category": "american",
    "location": "state-street-library-mall",
    "locationDisplayName": "State Street & Library Mall",
    "businessLinks": {
      "website": "https://www.theroostfriedchicken.com",
      "instagram": "...",
      "facebook": "..."
    },
    "menu": [...],
    "schedule": {...}
  }
]
```

#### Get Food Truck by Slug
```http
GET /api/food-carts/:slug
```

**Parameters:**
- `slug` (string) - Unique identifier for the food cart

**Response:** Single food cart object or 404 if not found

#### Search Food Trucks
```http
GET /api/food-carts/search/:query
```

**Parameters:**
- `query` (string) - Search term to match against cart name, description, or category

#### Filter by Category
```http
GET /api/food-carts/category/:category
```

**Parameters:**
- `category` (string) - Category to filter by (e.g., "american", "asian", "mexican")
- Use "all" to return all carts

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

### Environment Variables
Currently, the application doesn't require environment variables for basic operation. Future PostgreSQL integration will require:

```env
DATABASE_URL=your_postgresql_connection_string
```

### Vercel Configuration
The `vercel.json` file configures serverless deployment:
- API routes are handled by `api/index.ts`
- Static assets served from `dist/public`
- Client-side routing supported via rewrites

## 📝 Adding New Food Trucks

To add a new food cart, edit `server/storage.ts`:

```typescript
{
  slug: "unique-cart-slug",
  name: "Truck Name",
  description: "Brief description",
  image: "/cart-image.jpg", // Place image in client/public/
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

### Current Deployment Strategy
- Each time a commit is sent to the remote repo, npm run build occurs. Rather than have API endpoints set up, doing this overwrites and republishes a static json file called carts.json. This file is then used to load the webiste. 
- By doing this, frontpage loading times are optomized for speed. However, this reqiures that any updates must be pushed to the repo and a vercel redeploy must trigger in order to reflect the changes on the live site.

### Code Style
- TypeScript for type safety
- ESLint configuration included
- Semantic CSS class names
- Component-based architecture

## 📧 Contact

For questions, suggestions, or to add your food cart to the platform:
- Project Maintainer: Ariav Hayempour
- GitHub: [@ariavhayempour](https://github.com/ariavhayempour)
