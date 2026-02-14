# Valentine's Day Universe - Customization Guide

## 🌟 Quick Start

This romantic web experience is fully customizable! Here's how to personalize it:

## 📝 Personalize the Memories

Edit `/src/app/screens/GalaxyScreen.tsx` to add your own memories:

```typescript
const memories: Memory[] = [
  {
    id: 1,
    title: "Your Memory Title",
    description: "2-3 sentences about this special moment...",
    x: 30,        // Position X (0-100)
    y: 25,        // Position Y (0-100)
    hasAudio: true,  // Optional: shows audio button
    image: "placeholder"  // Optional: shows image placeholder
  },
  // Add more memories...
];
```

### Memory Properties:
- **id**: Unique number for each memory
- **title**: Short, emotional title (3-5 words)
- **description**: Heartfelt description (2-3 sentences)
- **x, y**: Star position on screen (0-100, center is 50,50)
- **hasAudio**: (Optional) Set to `true` to show audio message button
- **image**: (Optional) Set to `"placeholder"` to show image area

## 💝 Change Your Partner's Name

The default name is "Sarah". You can either:
1. **In the app**: Click all stars, then edit the name before proceeding
2. **In code**: Change line 97 in `/src/app/screens/GalaxyScreen.tsx`:
   ```typescript
   return localStorage.getItem('partnerName') || 'YourPartnerName';
   ```

## 🎨 Customize Colors

Edit `/src/styles/theme.css` to change the color palette:

```css
:root {
  --midnight: #0a0e27;      /* Deep background */
  --pink: #ff6b9d;          /* Primary pink */
  --gold: #ffd700;          /* Gold highlights */
  /* Adjust these to your preference */
}
```

## ✨ Adjust Animations

- **Star animation speed**: In `/src/app/components/Starfield.tsx`, change the `density` prop
- **Particle effects**: In `/src/app/components/FloatingParticles.tsx`, adjust particle count (line 24)
- **Button animations**: In `/src/app/components/Button.tsx`, modify `whileHover` and `whileTap` values

## 📱 Fonts

The experience uses:
- **Headings**: Cormorant Garamond (serif)
- **Body**: Inter (sans-serif)

To change fonts, edit `/src/styles/fonts.css` and update the imports, then modify the CSS variables in `/src/styles/theme.css`.

## 🎵 Background Music (Optional)

The music toggle button is present but not connected. To add music:
1. Add an audio file to your project
2. Edit `/src/app/components/MusicToggle.tsx`
3. Add an `<audio>` element and control it with the state

## 💬 Final Message

Customize the final romantic message in `/src/app/screens/FinalScreen.tsx` (lines 73-87).

## 🎯 Tips for Best Experience

- Keep memory descriptions 2-3 sentences for readability
- Space out star positions to avoid overlap
- Use 4-8 memories for optimal experience
- Test on both desktop and mobile
- The experience is fully responsive!

## 🚀 Deployment

This is a static web app - deploy it anywhere:
- Netlify
- Vercel
- GitHub Pages
- Any static hosting service

---

Made with ❤️ for Valentine's Day
