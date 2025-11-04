# Referral & Credit System

A modern, responsive frontend for a referral and credit system digital product platform built with Next.js 14, TypeScript, Tailwind CSS, Zustand, and Framer Motion.

## 🌟 Features

- **User Authentication**: Registration, login, and logout with form validation
- **Referral System**: Generate unique referral codes and share referral links
- **Credit System**: Earn credits from referrals and apply them to purchases
- **Dashboard**: Track referral metrics, earnings, and user activity
- **Product Catalog**: Browse and purchase digital products with credit integration
- **Responsive Design**: Mobile-first design that works seamlessly across all devices
- **Animations**: Smooth transitions and micro-interactions with Framer Motion
- **Accessibility**: WCAG AA compliant with proper semantic HTML and ARIA attributes

## 🛠 Technology Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS (no UI kits)
- **State Management**: Zustand
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Validation**: Client-side form validation
- **Development**: ESLint, Prettier

## 📁 Project Structure

```
referral-credit-system/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── (auth)/            # Auth route group (login, register)
│   │   ├── dashboard/         # Protected dashboard route
│   │   ├── products/          # Product listing and purchase
│   │   ├── globals.css        # Global styles and Tailwind
│   │   ├── layout.tsx         # Root layout with providers
│   │   └── page.tsx           # Landing page
│   ├── components/            # Reusable UI components
│   │   ├── ui/               # Basic UI primitives (Button, Input, Card, Modal)
│   │   ├── forms/            # Form components (Login, Register)
│   │   ├── layout/           # Layout components (AppShell, AuthLayout)
│   │   ├── features/         # Feature-specific components
│   │   └── providers/        # React providers
│   ├── stores/               # Zustand state management
│   │   ├── authStore.ts      # User authentication state
│   │   ├── referralStore.ts  # Referral data and metrics
│   │   ├── productStore.ts   # Product catalog and purchases
│   │   └── uiStore.ts        # UI state (loading, modals, notifications)
│   ├── hooks/                # Custom React hooks
│   ├── utils/                # Utility functions
│   │   ├── cn.ts            # Class name merging utility
│   │   └── validation.ts    # Form validation functions
│   ├── types/                # TypeScript type definitions
│   └── constants/            # App constants and configuration
├── public/                   # Static assets
├── .env.local               # Environment variables
├── package.json
├── tailwind.config.js
├── next.config.js
├── tsconfig.json
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd referral-credit-system
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

4. Configure your environment variables in `.env.local`:
```env
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME="Referral Credit System"
```

5. Run the development server:
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🎯 Core Features

### Authentication System

- **Registration**: User signup with email validation and optional referral code support
- **Login**: Secure user authentication with form validation
- **Referral Integration**: Support for `?r=CODE` parameter in registration URLs
- **Session Management**: Persistent authentication state using Zustand

### Referral Dashboard

- **Metrics Display**: Real-time tracking of:
  - Total referred users
  - Converted users (who made purchases)
  - Total credits earned
  - Conversion rates
- **Referral Tools**:
  - Unique referral code display
  - Copy-to-clipboard functionality
  - Social media sharing integration
  - Referral link preview

### Product System

- **Product Catalog**: Browse digital products with categories and search
- **Purchase Flow**: Complete checkout experience with credit application
- **Credit Integration**: Apply earned credits for discounts on purchases
- **Purchase History**: Track all purchases and credit usage

## 🏗 Architecture

### State Management (Zustand)

The application uses four main stores:

1. **authStore**: User authentication and session management
2. **referralStore**: Referral data, metrics, and sharing functionality
3. **productStore**: Product catalog and purchase management
4. **uiStore**: Global UI state (loading, modals, notifications)

### Component Architecture

- **UI Primitives**: Reusable components (Button, Input, Card, Modal)
- **Layout Components**: AppShell, AuthLayout for consistent structure
- **Feature Components**: Business logic components (MetricsCard, ReferralLink, etc.)
- **Form Components**: Authentication forms with validation

### Validation Strategy

- **Client-side validation**: Real-time form validation with error feedback
- **Email validation**: RFC 5322 compliant email format checking
- **Password requirements**: Minimum 8 characters, uppercase, lowercase, numbers
- **Referral code validation**: Alphanumeric codes 6-12 characters

## 🎨 UI/UX Design

### Design System

- **Color Palette**: Semantic colors with CSS custom properties
- **Typography Scale**: Consistent text sizing from xs to 3xl
- **Spacing System**: Tailwind's 4px base unit for consistent spacing
- **Component Variants**: Multiple button styles (primary, secondary, outline, ghost)

### Responsive Design

- **Mobile First**: Progressive enhancement for larger screens
- **Breakpoints**: sm (640px), md (768px), lg (1024px), xl (1280px)
- **Adaptive Layouts**: Grid systems that adapt from 1-4 columns
- **Mobile Navigation**: Collapsible menu for smaller screens

### Animations

- **Page Transitions**: Smooth fade and slide animations between routes
- **Micro-interactions**: Button hover states, form focus animations
- **Loading States**: Skeleton screens and spinners
- **Toast Notifications**: Slide-in animations for user feedback

## ♿ Accessibility

### Semantic HTML
- Proper heading hierarchy (h1-h6)
- Form labels associated with inputs
- Button elements for interactive actions
- Navigation landmarks (header, main, footer)

### ARIA Implementation
- Form error announcements
- Modal dialog roles and properties
- Loading state announcements
- Focus management for dynamic content

### Keyboard Navigation
- Tab order follows logical sequence
- Skip links for main content
- Keyboard shortcuts for common actions
- Focus indicators clearly visible

### Color & Contrast
- WCAG AA compliant color contrast (4.5:1 minimum)
- Color not used as sole indicator of state
- High contrast mode support

## 🔧 Development

### Code Style

- **TypeScript**: Strict mode with comprehensive type coverage
- **ESLint**: Next.js recommended configuration
- **Prettier**: Consistent code formatting
- **File Naming**: PascalCase for components, camelCase for utilities

### Component Patterns

- **Composition**: Small, reusable components
- **Props Interface**: Comprehensive TypeScript interfaces
- **Error Boundaries**: Graceful error handling
- **Loading States**: Proper loading and error states

### State Management Patterns

- **Zustand**: Lightweight state management with actions
- **Selectors**: Efficient state access with memoized selectors
- **Actions**: Centralized state mutations
- **Persistence**: Selected state persistence across sessions

## 📝 Environment Variables

### Required Variables

```env
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME="Referral Credit System"
```

### Optional Variables

```env
# For development
NEXT_PUBLIC_DEV_MODE=true
NEXT_PUBLIC_DEBUG_API=false

# For production
NEXT_PUBLIC_API_URL=https://your-api.com
NEXT_PUBLIC_SENTRY_DSN=your-sentry-dsn
```

## 🧪 Testing

### Manual Testing

1. **Authentication Flow**
   - User registration with and without referral codes
   - Login/logout functionality
   - Session persistence

2. **Referral System**
   - Generate and share referral links
   - Track referral attribution
   - Credit earning mechanism

3. **Product Purchase**
   - Browse and filter products
   - Complete purchase with credits
   - Verify purchase history

4. **Responsive Design**
   - Mobile layout (320px+)
   - Tablet layout (768px+)
   - Desktop layout (1024px+)

5. **Accessibility**
   - Keyboard navigation
   - Screen reader compatibility
   - Color contrast validation

## 🚀 Deployment

### Build Configuration

```bash
# Build for production
npm run build

# Start production server
npm start
```

### Environment Setup

- **Development**: `.env.local`
- **Staging**: `.env.staging`
- **Production**: `.env.production`

### Platform Compatibility

- **Vercel**: Recommended for Next.js applications
- **Netlify**: Static hosting support
- **AWS**: Server deployment with Docker
- **Docker**: Container support available

## 🔄 Key Logic Patterns

### Authentication Flow

1. User registers/logs in → Store user data in Zustand
2. Navigate to protected routes → Layout checks authentication
3. API calls → Include auth token in headers
4. Session expires → Redirect to login

### Referral Attribution

1. User clicks referral link → Extract code from URL parameter
2. User registers → Store referral code in user data
3. User makes first purchase → Award credits to referrer
4. Update referral metrics → Real-time dashboard updates

### Credit System

1. Referral conversion → Calculate credits earned
2. Purchase initiated → Show available credits
3. Credits applied → Reduce purchase amount
4. Purchase complete → Update credit balance

## 🤝 Contributing

### Development Workflow

1. Fork the repository
2. Create feature branch: `git checkout -b feature-name`
3. Make changes with comprehensive testing
4. Commit changes: `git commit -m "Add feature"`
5. Push to branch: `git push origin feature-name`
6. Submit pull request

### Code Review Guidelines

- TypeScript strict mode compliance
- Component prop interface documentation
- Store action documentation
- Accessibility compliance
- Mobile responsiveness

### Issue Reporting

1. Bug reports with steps to reproduce
2. Feature requests with use cases
3. Performance issues with metrics
4. Accessibility concerns

## 📊 Performance Optimization

### Code Splitting
- Route-based splitting with Next.js
- Component-level lazy loading
- Dynamic imports for large libraries

### Bundle Optimization
- Tree shaking for unused dependencies
- Bundle analysis with webpack-bundle-analyzer
- Image optimization with Next.js Image component

### Runtime Performance
- React.memo for expensive components
- useMemo and useCallback for computations
- Debounced search and validation
- Virtualization for long lists

## 🐛 Troubleshooting

### Common Issues

1. **Build Errors**: Ensure all components using hooks have 'use client' directive
2. **State Persistence**: Check localStorage availability and permissions
3. **Animation Performance**: Reduce complex animations on lower-end devices
4. **Responsive Layout**: Verify Tailwind configuration and viewport meta tag

### Debug Mode

Enable debug mode for development:

```env
NEXT_PUBLIC_DEBUG=true
```

This will enable additional logging and error details.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Next.js team for the excellent framework
- Tailwind CSS for utility-first CSS
- Zustand for simple state management
- Framer Motion for beautiful animations
- Lucide React for consistent iconography