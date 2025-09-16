# Kebin Maharjan - Portfolio Website

A modern, responsive portfolio website built with React.js featuring animations, dark/light mode, and admin functionality.

## Features

- **Modern Design**: Clean, professional design with glassmorphism effects
- **Responsive**: Fully mobile-responsive layout
- **Animations**: Smooth animations using Framer Motion
- **Dark/Light Mode**: Toggle between themes
- **Admin Panel**: Manage projects and blog posts
- **Contact Form**: Working contact form with validation
- **Performance Optimized**: Fast loading and SEO-friendly

## Tech Stack

- React.js 18
- Framer Motion (animations)
- React Hook Form (form handling)
- React Hot Toast (notifications)
- Lucide React (icons)
- Tailwind CSS (styling)

## Installation & Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Install additional dependencies**
   ```bash
   npm install tailwindcss postcss autoprefixer
   npx tailwindcss init -p
   ```

4. **Start the development server**
   ```bash
   npm start
   ```

5. **Build for production**
   ```bash
   npm run build
   ```

## Admin Access

- Navigate to `/admin` route
- Default password: `admin123`
- Manage projects and blog posts
- Add, edit, and delete content

## Project Structure

```
src/
├── components/          # React components
│   ├── Navbar.js       # Navigation bar
│   ├── Hero.js         # Hero section
│   ├── About.js        # About section
│   ├── Projects.js     # Projects showcase
│   ├── Resume.js       # Resume/Education
│   ├── Contact.js      # Contact form
│   └── Footer.js       # Footer
├── pages/
│   └── Admin.js        # Admin dashboard
├── hooks/
│   ├── useTheme.js     # Theme management
│   └── useIntersectionObserver.js
├── data/
│   └── portfolio.js    # Portfolio data
└── utils/              # Utility functions
```

## Customization

1. **Update Personal Information**: Edit `src/data/portfolio.js`
2. **Add Projects**: Use admin panel or edit data file
3. **Modify Styling**: Update CSS variables in `src/index.css`
4. **Add New Sections**: Create components and add to `App.js`

## Deployment

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Deploy to hosting service** (Netlify, Vercel, etc.)
   - Upload the `build` folder
   - Configure redirects for SPA routing

## Performance Features

- Lazy loading images
- Intersection Observer for animations
- Optimized bundle size
- SEO meta tags
- Progressive Web App ready

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT License - feel free to use this template for your own portfolio!

## Contact

For questions or support, contact: mhrznkebin@gmail.com