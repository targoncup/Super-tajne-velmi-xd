/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Primary Color System - Based on #00009A
        primary: {
          50: '#f0f0ff',   // rgb(240, 240, 255) - Very light blue
          100: '#e0e0ff',  // rgb(224, 224, 255) - Light blue
          200: '#c7c7ff',  // rgb(199, 199, 255) - Lighter blue
          300: '#a3a3ff',  // rgb(163, 163, 255) - Light blue
          400: '#7a7aff',  // rgb(122, 122, 255) - Medium blue
          500: '#4d4dff',  // rgb(77, 77, 255) - Bright blue
          600: '#00009A',  // rgb(0, 0, 154) - Primary color
          700: '#000080',  // rgb(0, 0, 128) - Navy blue
          800: '#000066',  // rgb(0, 0, 102) - Dark navy
          900: '#00004d',  // rgb(0, 0, 77) - Very dark navy
          950: '#000033',  // rgb(0, 0, 51) - Darkest navy
        },

        // Dark Theme Background Colors
        dark: {
          primary: '#0a0a0f',    // rgb(10, 10, 15) - Main background
          secondary: '#141420',   // rgb(20, 20, 32) - Secondary background
          tertiary: '#1e1e2e',   // rgb(30, 30, 46) - Tertiary background
        },

        // Surface Colors for Components
        surface: {
          primary: '#1a1a2e',     // rgb(26, 26, 46) - Primary surface
          secondary: '#252540',   // rgb(37, 37, 64) - Secondary surface
          tertiary: '#2f2f52',    // rgb(47, 47, 82) - Tertiary surface
          hover: '#363659',       // rgb(54, 54, 89) - Hover state
          active: '#404066',      // rgb(64, 64, 102) - Active state
        },

        // Text Colors with WCAG Compliance
        text: {
          primary: '#ffffff',     // rgb(255, 255, 255) - Primary text (21:1 contrast)
          secondary: '#e2e2e8',   // rgb(226, 226, 232) - Secondary text (16.8:1 contrast)
          tertiary: '#b8b8c7',    // rgb(184, 184, 199) - Tertiary text (9.5:1 contrast)
          muted: '#8a8a9e',       // rgb(138, 138, 158) - Muted text (4.8:1 contrast)
          disabled: '#5a5a6b',    // rgb(90, 90, 107) - Disabled text (3:1 contrast)
        },

        // Accent Colors
        accent: {
          blue: '#3B82F6',        // rgb(59, 130, 246) - Blue accent
          purple: '#8B5CF6',      // rgb(139, 92, 246) - Purple accent
          gold: '#F59E0B',        // rgb(245, 158, 11) - Gold accent
          silver: '#94A3B8',      // rgb(148, 163, 184) - Silver accent
        },

        // Status Colors
        status: {
          success: '#10B981',     // rgb(16, 185, 129) - Success green
          warning: '#F59E0B',     // rgb(245, 158, 11) - Warning amber
          error: '#EF4444',       // rgb(239, 68, 68) - Error red
          info: '#3B82F6',        // rgb(59, 130, 246) - Info blue
        },

        // Border Colors
        border: {
          primary: '#2a2a42',     // rgb(42, 42, 66) - Primary border
          secondary: '#3a3a5c',   // rgb(58, 58, 92) - Secondary border
          tertiary: '#4a4a70',    // rgb(74, 74, 112) - Tertiary border
          focus: '#00009A',       // rgb(0, 0, 154) - Focus border (primary)
          hover: '#5a5a84',       // rgb(90, 90, 132) - Hover border
        },

        // Interactive Element Colors
        interactive: {
          primary: {
            bg: '#00009A',        // rgb(0, 0, 154) - Primary button background
            hover: '#000080',     // rgb(0, 0, 128) - Primary button hover
            active: '#000066',    // rgb(0, 0, 102) - Primary button active
            text: '#ffffff',      // rgb(255, 255, 255) - Primary button text
          },
          secondary: {
            bg: '#252540',        // rgb(37, 37, 64) - Secondary button background
            hover: '#363659',     // rgb(54, 54, 89) - Secondary button hover
            active: '#404066',    // rgb(64, 64, 102) - Secondary button active
            text: '#e2e2e8',      // rgb(226, 226, 232) - Secondary button text
          },
          link: {
            default: '#3B82F6',   // rgb(59, 130, 246) - Link color
            hover: '#60A5FA',     // rgb(96, 165, 250) - Link hover
            visited: '#8B5CF6',   // rgb(139, 92, 246) - Visited link
          },
        },
      },
      
      // Custom opacity values for overlays
      opacity: {
        '15': '0.15',
        '35': '0.35',
        '65': '0.65',
        '85': '0.85',
      },

      // Custom backdrop blur values
      backdropBlur: {
        'xs': '2px',
        'sm': '4px',
        'md': '8px',
        'lg': '12px',
        'xl': '16px',
        '2xl': '24px',
        '3xl': '40px',
      },

      // Custom box shadows with theme colors
      boxShadow: {
        'primary': '0 4px 14px 0 rgba(0, 0, 154, 0.25)',
        'primary-lg': '0 10px 25px -3px rgba(0, 0, 154, 0.35)',
        'accent-blue': '0 4px 14px 0 rgba(59, 130, 246, 0.25)',
        'accent-purple': '0 4px 14px 0 rgba(139, 92, 246, 0.25)',
        'accent-gold': '0 4px 14px 0 rgba(245, 158, 11, 0.25)',
        'dark': '0 4px 14px 0 rgba(0, 0, 0, 0.5)',
        'dark-lg': '0 10px 25px -3px rgba(0, 0, 0, 0.7)',
      },

      // Custom gradients
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #00009A 0%, #000080 100%)',
        'gradient-accent': 'linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%)',
        'gradient-gold': 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
        'gradient-dark': 'linear-gradient(135deg, #0a0a0f 0%, #141420 100%)',
      },
    },
  },
  plugins: [],
};