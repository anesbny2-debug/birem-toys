# Birem Toys - E-Commerce Platform

A modern, fully-featured e-commerce platform for a toy store in Algeria. Built with Next.js 15, TypeScript, Tailwind CSS, PostgreSQL, and Prisma ORM.

## 🎨 Features

### Customer Features
- 🌍 **Multi-language Support** (Arabic, French, English) with RTL support
- 📱 **Fully Responsive Design** (Mobile, Tablet, Desktop)
- 🛒 **Shopping Cart** with persistent storage
- ⭐ **Product Reviews & Ratings**
- 💝 **Wishlist/Favorites System**
- 🔍 **Advanced Product Search & Filtering**
- 📊 **Product Recommendations**
- 🏷️ **Discount Codes & Coupons**
- 🌟 **Best Sellers & New Arrivals**
- 📧 **Newsletter Subscription**
- 🌙 **Dark/Light Mode**
- ⚡ **Progressive Web App (PWA)**

### Admin Features
- 🔐 **Secure Authentication** with NextAuth
- 📦 **Product Management** (CRUD operations)
- 🖼️ **Image Upload** via Cloudinary
- 📂 **Category Management**
- 💰 **Pricing & Discount Management**
- 📊 **Sales Analytics Dashboard**
- 👥 **Visitor Analytics**
- 📈 **Sales Statistics**
- 📧 **Email Campaign Management**
- 🏷️ **Coupon Management**
- 📰 **Banner/Promotion Management**
- 📝 **Page Content Management** (FAQ, Terms, Privacy)
- 📋 **Order Management**
- 🔔 **Inventory Alerts**

### Technical Features
- 🚀 **Next.js 15** with App Router
- 📘 **TypeScript** for type safety
- 🎨 **Tailwind CSS** with custom theme
- 🗄️ **PostgreSQL** database
- 📚 **Prisma ORM** for database management
- 🔐 **NextAuth.js** for authentication
- 🖼️ **Cloudinary** for image management
- 📱 **Mobile-first approach**
- ⚡ **Image optimization** with Next.js Image
- 🔍 **SEO optimization** with next-seo
- 📊 **Analytics tracking**
- 🎯 **Server-side rendering** for better SEO

## 📋 Project Structure

```
birem-toys/
├── src/
│   ├── app/                    # Next.js app router pages
│   │   ├── (public)/          # Public routes
│   │   ├── (admin)/           # Admin dashboard routes
│   │   └── api/               # API routes
│   ├── components/            # Reusable React components
│   │   ├── Header/
│   │   ├── Footer/
│   │   ├── ProductCard/
│   │   ├── Cart/
│   │   └── Admin/
│   ├── lib/                   # Utility libraries
│   │   ├── auth.ts           # NextAuth configuration
│   │   ├── prisma.ts         # Prisma client
│   │   └── cloudinary.ts     # Cloudinary setup
│   ├── utils/                # Helper functions
│   ├── types/                # TypeScript type definitions
│   └── styles/               # Global styles
├── prisma/
│   └── schema.prisma          # Database schema
├── public/                     # Static files
├── .env.example                # Environment variables template
├── next.config.js             # Next.js configuration
├── tailwind.config.js         # Tailwind CSS configuration
├── tsconfig.json              # TypeScript configuration
└── package.json               # Dependencies
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- PostgreSQL 12+
- Cloudinary account (for image uploads)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/birem-toys.git
cd birem-toys
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
```bash
cp .env.example .env.local
```

Edit `.env.local` with your configuration:
```env
DATABASE_URL="postgresql://user:password@localhost:5432/birem_toys"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-generated-secret"
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="your-cloud-name"
CLOUDINARY_API_KEY="your-api-key"
CLOUDINARY_API_SECRET="your-api-secret"
NEXT_PUBLIC_STORE_PHONE="+213 XXX XXX XXX"
NEXT_PUBLIC_STORE_WHATSAPP="+213 XXX XXX XXX"
NEXT_PUBLIC_STORE_EMAIL="info@biremtoys.dz"
```

4. **Generate NextAuth secret**
```bash
openssl rand -base64 32
```

5. **Set up the database**
```bash
npm run prisma:migrate
```

6. **Generate Prisma client**
```bash
npm run prisma:generate
```

7. **Seed the database (optional)**
```bash
node scripts/seed.js
```

8. **Run the development server**
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📚 API Documentation

### Products
- `GET /api/products` - Get all products with pagination and filtering
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (admin)
- `PUT /api/products/:id` - Update product (admin)
- `DELETE /api/products/:id` - Delete product (admin)

### Categories
- `GET /api/categories` - Get all categories
- `POST /api/categories` - Create category (admin)
- `PUT /api/categories/:id` - Update category (admin)
- `DELETE /api/categories/:id` - Delete category (admin)

### Orders
- `GET /api/orders` - Get orders (admin)
- `GET /api/orders/:id` - Get order details
- `POST /api/orders` - Create order
- `PUT /api/orders/:id` - Update order status (admin)

### Reviews
- `GET /api/reviews/:productId` - Get product reviews
- `POST /api/reviews` - Submit review

### Cart
- `GET /api/cart` - Get cart
- `POST /api/cart/items` - Add to cart
- `PUT /api/cart/items/:id` - Update cart item
- `DELETE /api/cart/items/:id` - Remove from cart

## 🎨 Customization

### Colors
Edit `tailwind.config.js` to change the brand colors:
- Primary Orange: `#f97316`
- Secondary Blue: `#3b82f6`
- White: `#ffffff`

### Store Information
Update in admin dashboard or `.env.local`:
- Store name
- Phone number
- WhatsApp number
- Email address
- Address

## 📦 Database Schema

### Main Tables
- `users` - Admin users
- `categories` - Product categories
- `products` - Products with multilingual support
- `product_images` - Product images
- `reviews` - Customer reviews
- `wishlists` - Customer wishlists
- `carts` - Shopping carts
- `orders` - Customer orders
- `coupons` - Discount codes
- `banners` - Homepage banners
- `settings` - Store settings
- `newsletter_subscriptions` - Newsletter subscribers
- `page_contents` - Static pages
- `analytics` - Visitor analytics

## 🔐 Security

- Passwords hashed with bcryptjs
- CSRF protection with NextAuth
- Environment variables for sensitive data
- SQL injection prevention with Prisma
- XSS protection with Next.js
- Rate limiting on API routes (implement as needed)

## ⚡ Performance

- Image optimization with Next.js Image
- Lazy loading for images
- Code splitting with Next.js
- Caching strategies
- Database query optimization
- CDN for static assets (Cloudinary)

## 🌍 SEO

- Meta tags with next-seo
- XML sitemap
- robots.txt
- Canonical URLs
- Schema markup
- Mobile-friendly design
- Fast page load times

## 📱 PWA Features

- Offline support
- Install as app
- Web manifest
- Service workers

## 🚢 Deployment

### Vercel (Recommended)

```bash
npm install -g vercel
vercel
```

### Docker

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## 📄 License

MIT License - Feel free to use this project for personal or commercial purposes.

## 🤝 Support

For issues and questions, please open an issue on GitHub.

## 🎯 Roadmap

- [ ] Payment gateway integration (Stripe, PayPal)
- [ ] Multiple currency support
- [ ] Affiliate program
- [ ] Advanced inventory management
- [ ] Customer account system
- [ ] Order tracking with SMS
- [ ] Inventory sync with external systems
- [ ] Multi-store support
- [ ] Advanced reporting

---

**Built with ❤️ for Birem Toys**
