# Daze Perfumes - Luxury Perfume Brand Website

A modern, elegant website for Daze Perfumes, a luxury brand specializing in gourmand and Chinese-inspired fragrances.

## 🎨 Features

- **Elegant Design**: Sophisticated luxury aesthetic with custom color palette
- **Responsive Layout**: Fully responsive design that works on all devices
- **Modern Animations**: Smooth animations using Framer Motion
- **Supabase Integration**: Backend integration for user profiles and product management
- **TypeScript**: Full type safety throughout the application
- **Tailwind CSS**: Custom styling with luxury-focused design system

## 🚀 Tech Stack

- **Next.js 14**: React framework with App Router
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first CSS framework
- **Framer Motion**: Animation library
- **Supabase**: Backend as a Service
- **Lucide React**: Icon library
- **Custom Fonts**: Playfair Display, Inter, and Dancing Script

## 🎨 Design System

### Colors
- **Daze Gold**: `#D4AF37` - Primary brand color
- **Daze Cream**: `#F5F5DC` - Light accent
- **Daze Rose**: `#E8B4B8` - Soft pink
- **Daze Jade**: `#4A7C59` - Chinese-inspired green
- **Daze Charcoal**: `#2C2C2C` - Text color
- **Daze Silk**: `#F8F6F0` - Background color
- **Daze Bronze**: `#CD7F32` - Secondary gold
- **Daze Amber**: `#FFBF00` - Accent gold

### Typography
- **Serif**: Playfair Display - Headings
- **Sans**: Inter - Body text
- **Cursive**: Dancing Script - Brand elements

## 📁 Project Structure

```
daze-perfumes/
├── app/
│   ├── globals.css          # Global styles and Tailwind imports
│   ├── layout.tsx           # Root layout component
│   └── page.tsx            # Homepage
├── components/
│   ├── Header.tsx          # Navigation header
│   ├── Hero.tsx            # Hero section
│   ├── FeaturedProducts.tsx # Product showcase
│   └── Footer.tsx          # Footer component
├── lib/
│   └── supabase.ts         # Supabase client configuration
├── package.json            # Dependencies and scripts
├── tailwind.config.js      # Tailwind configuration
├── tsconfig.json           # TypeScript configuration
└── README.md              # Project documentation
```

## 🛠️ Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Supabase account (for backend)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd daze-perfumes
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

   # reCAPTCHA v3
   NEXT_PUBLIC_RECAPTCHA_SITE_KEY=your_recaptcha_v3_site_key
   RECAPTCHA_SECRET_KEY=your_recaptcha_v3_secret_key
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🗄️ Database Schema

The project includes TypeScript types for the following Supabase tables:

### Profiles Table
- `id` (uuid, primary key)
- `user_id` (uuid, not null)
- `email` (text, nullable)
- `full_name` (text, nullable)
- `created_at` (timestamp with time zone, not null)
- `updated_at` (timestamp with time zone, not null)

### Products Table
- `id` (uuid, primary key)
- `name` (text, not null)
- `description` (text, not null)
- `price` (numeric, not null)
- `image_url` (text, not null)
- `category` (text, not null)
- `notes` (text array, not null)
- `created_at` (timestamp with time zone, not null)
- `updated_at` (timestamp with time zone, not null)

## 🎯 Key Features

### Homepage
- **Hero Section**: Stunning animated hero with brand messaging
- **Featured Products**: Showcase of luxury fragrances
- **Responsive Navigation**: Mobile-friendly navigation
- **Elegant Footer**: Complete site information

### Design Highlights
- **Luxury Aesthetic**: Sophisticated color palette and typography
- **Smooth Animations**: Framer Motion animations for enhanced UX
- **Custom Components**: Reusable components with consistent styling
- **Accessibility**: Proper semantic HTML and ARIA labels

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Other Platforms
The project can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- DigitalOcean App Platform

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🎨 Brand Story

Daze Perfumes represents the fusion of gourmand luxury with Chinese-inspired elegance. Each fragrance tells a story, combining the rich traditions of Chinese perfumery with modern gourmand sensibilities. The brand emphasizes:

- **Artisanal Craftsmanship**: Hand-crafted fragrances
- **Luxury Ingredients**: Premium materials and oils
- **Timeless Elegance**: Classic sophistication with modern appeal
- **Cultural Fusion**: East meets West in fragrance

---

Built with ❤️ for luxury perfumery 