# IndyRadio 📻

<div align="center">

**Empowering Independent Radio Stations Across the Nation**

A web platform connecting donors with vulnerable publicly funded radio stations facing federal funding challenges.

[View Demo](https://cwiza.github.io/indyradio) · [Report Bug](https://github.com/cwiza/indyradio/issues) · [Request Feature](https://github.com/cwiza/indyradio/issues)

</div>

---

## 🎯 Mission

IndyRadio addresses the critical funding gap facing NPR and community radio stations across America. With federal funding under threat, many stations—especially those serving rural communities and underserved areas—face potential closure. Our platform makes it easy for passionate supporters to discover and contribute to stations that need help most.

## ✨ Key Features

### 📍 Interactive Station Map
- **Visual US Map**: SVG-based geographic visualization showing station locations
- **Risk Level Indicators**: Color-coded markers (Critical, High, Moderate, Low) based on federal funding dependency
- **Real-time Statistics**: Live tracking of at-risk stations, average federal funding percentages, and emergency funding needs
- **Filter Options**: View all stations or filter by risk level and federal dependency
- **Hover Details**: Quick station information on marker hover

### 🎯 Smart Matching System
- **5-Question Questionnaire**: Personalized matching based on donor priorities:
  - Support focus (local news, rural communities, emergency services, cultural programming)
  - Geographic preferences (local, rural nationwide, conservative states)
  - Contribution style (monthly, one-time, emergency, volunteering)
  - Impact goals (save stations, expand coverage, improve quality, investigative journalism)
  - Budget preferences
- **Match Score Algorithm**: Calculates compatibility percentage between donor preferences and station needs
- **Detailed Recommendations**: Explains why each station matches your profile

### 📊 Comprehensive Station Data
- **Financial Transparency**: 
  - Total budget breakdown
  - Federal, state, local, and donation funding sources
  - Federal funding percentage
  - Emergency funding requirements
- **Impact Information**:
  - Number of weekly listeners
  - Geographic coverage area
  - Political lean of service area
  - Station type (university, community, NPR affiliate)
- **Critical Needs**: Specific funding requirements and their purposes
- **Programs**: List of key shows and services

### 💳 Integrated Donation System
- **Flexible Giving Options**:
  - One-time or monthly donations
  - Quick-select amounts ($25, $50, $100, $250+)
  - Custom donation amounts
- **Impact Preview**: See exactly how your donation will help before contributing
- **Secure Payment**: Built-in payment form (ready for Stripe/PayPal integration)

### 🔍 Advanced Filtering
- **Risk Level Sorting**: Critical, High, Moderate risk stations
- **Federal Dependency**: View stations most vulnerable to funding cuts
- **Geographic Search**: Filter by state or region
- **Station Type**: University, community, or NPR affiliate

## 🛠️ Tech Stack

### Frontend
- **React 17** - Component-based UI library
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - High-quality accessible components
- **Radix UI** - Unstyled, accessible component primitives
- **Lucide React** - Beautiful icon library

### UI Components
- Dialogs, Modals, Sheets
- Cards, Badges, Buttons
- Forms with validation
- Progress bars and tabs
- Interactive radio groups
- Responsive carousels

### State Management
- React Hooks (useState, useEffect)
- Component-level state management
- Props drilling for data flow

### Styling
- Custom color schemes
- Responsive design (mobile, tablet, desktop)
- Dark mode support infrastructure
- Animation utilities

## 📦 Installation

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager

### Setup

1. **Clone the repository**
```bash
git clone https://github.com/cwiza/indyradio.git
cd indyradio
```

2. **Install dependencies**
```bash
npm install
```

3. **Start development server**
```bash
npm start
```

The app will open at `http://localhost:3000`

### Build for Production
```bash
npm run build
```

Builds the app for production to the `build` folder.

### Deploy to GitHub Pages
```bash
npm run deploy
```

## 🚀 Usage Guide

### For Donors

1. **Explore the Map**: Start on the homepage to see stations across the country
2. **Take the Questionnaire**: Click "Find Stations to Support" and answer 5 questions
3. **Review Recommendations**: Get personalized station matches with compatibility scores
4. **Learn About Stations**: Click any station to view detailed information
5. **Make a Donation**: Choose your amount and contribution frequency
6. **Track Impact**: See exactly how your support helps

### For Advocates

1. **Share Station Details**: Use direct links to share specific stations
2. **Filter by Need**: Focus on critical or high-risk stations
3. **Educate Others**: Use impact statistics and station stories
4. **Organize Support**: Coordinate group donations or fundraising events

## 📁 Project Structure

```
indyradio/
├── App.tsx                      # Main application component with routing
├── components/
│   ├── ui/                      # shadcn/ui component library
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── dialog.tsx
│   │   ├── form.tsx
│   │   └── ... (40+ components)
│   └── figma/
│       └── ImageWithFallback.tsx
├── lib/
│   └── station-data.ts          # Station database and matching algorithm
├── styles/
│   └── globals.css              # Global styles and Tailwind config
├── imports/
│   └── svg-y92g1u4lo4.ts       # SVG path imports
├── public/
│   ├── index.html
│   └── manifest.json
├── docs/
│   └── screenshots/             # Application screenshots
├── design-ideas-attendant/      # Future feature planning
├── package.json
├── tsconfig.json
├── tailwind.config.js
└── README.md
```

## 📊 Data Model

### Station Interface
```typescript
interface Station {
  id: string;
  name: string;
  frequency: string;
  location: string;
  state: string;
  riskLevel: 'critical' | 'high' | 'moderate' | 'low';
  listeners: string;
  federalFunding: number;
  description: string;
  funding: {
    total: string;
    federal: string;
    state: string;
    local: string;
    donations: string;
  };
  impact: string;
  needs: string[];
  programs: string[];
  emergencyFunding: string;
  coordinates: { x: number; y: number };
  politicalLean: 'liberal' | 'moderate' | 'conservative';
  stationType: 'university' | 'community' | 'npr_affiliate';
}
```

## 🎨 Design System

### Color Palette
- **Primary**: Red (#DC2626) - Action and urgency
- **Risk Indicators**:
  - Critical: Red (#EF4444)
  - High: Orange (#F97316)
  - Moderate: Yellow (#EAB308)
  - Low: Green (#22C55E)
- **Accents**: Blue (#3B82F6) for information
- **Neutrals**: Gray scale for text and backgrounds

### Typography
- Headers: Bold, clear hierarchy
- Body: Readable, accessible font sizes
- Labels: Semantic, descriptive

### Design Resources
- [Figma Design](https://sweat-rinse-25569166.figma.site/)

## 🤝 Contributing

We welcome contributions! Here's how to get started:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/AmazingFeature
   ```
3. **Make your changes**
   - Follow existing code style
   - Add comments for complex logic
   - Update tests if applicable
4. **Commit your changes**
   ```bash
   git commit -m 'Add some AmazingFeature'
   ```
5. **Push to your branch**
   ```bash
   git push origin feature/AmazingFeature
   ```
6. **Open a Pull Request**

### Development Guidelines
- Use TypeScript for type safety
- Follow React best practices
- Keep components small and focused
- Write descriptive commit messages
- Test changes across screen sizes

## 📝 Roadmap

### Phase 1 (Current) ✅
- ✅ Interactive station map with SVG US geography
- ✅ Questionnaire-based matching system
- ✅ Station database with 15+ real stations
- ✅ Donation interface with flexible options
- ✅ Risk level categorization
- ✅ Responsive design

### Phase 2 (In Progress) 🚧
- [ ] Backend API integration
- [ ] Real payment processing (Stripe/PayPal)
- [ ] User authentication system
- [ ] Donation tracking dashboard
- [ ] Email notifications

### Phase 3 (Planned) 📋
- [ ] Station admin portal
- [ ] Impact reporting and analytics
- [ ] Social sharing features
- [ ] Mobile app (React Native)
- [ ] Recurring donation management
- [ ] Advanced search filters

### Future Enhancements 🔮
- [ ] Multi-language support
- [ ] Station network visualization
- [ ] Donor community features
- [ ] Grant matching tools
- [ ] Emergency alert system

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👤 Author

**Chip Baker**
- GitHub: [@cwiza](https://github.com/cwiza)
- Email: chip@indyradio.com
- Website: [indyradio.com](https://indyradio.com)

## 🙏 Acknowledgments

- Built with React and TypeScript
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- Icons from [Lucide](https://lucide.dev/)
- Design inspiration from [Figma](https://sweat-rinse-25569166.figma.site/)
- Supporting publicly funded radio stations nationwide
- Thanks to the NPR community for inspiration

## 📞 Support

If you encounter issues or have questions:
- Open an [issue](https://github.com/cwiza/indyradio/issues)
- Email: chip@indyradio.com
- Check existing [discussions](https://github.com/cwiza/indyradio/discussions)

## 📈 Statistics

- **15+ Stations** in the database
- **5 States** represented
- **Multiple Risk Levels** tracked
- **$8.2M+** in emergency funding needs identified

---

<div align="center">

**Made with ❤️ for public radio**

[⬆ back to top](#indyradio-)

</div>
