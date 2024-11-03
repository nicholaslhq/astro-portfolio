# Astro Portfolio

Welcome to the **Astro Portfolio**!

This project is your gateway to building a visually appealing and highly functional personal portfolio website using Astro, a modern static site generator. Designed for creatives and professionals alike, this template empowers you to effectively showcase your work, skills, and experiences in a polished and engaging format.

With its emphasis on speed, responsiveness, and customization, the Astro Portfolio enables you to create a unique online presence that reflects your personal brand. Dive into the features and setup instructions below to start crafting your ideal portfolio!

## 🌟 Features

The Astro Portfolio template comes with a variety of features that make it an excellent choice for showcasing your work:

- **Fast Performance**: Built with Astro, this portfolio is optimized for speed, ensuring quick loading times and an excellent user experience.
- **Responsive Design**: The layout is fully responsive, adapting seamlessly to desktops, tablets, and smartphones.
- **Highly Customizable**: Users can easily modify colors, fonts, menus, social links, and SEO meta tags to create a unique look that reflects their personal brand.
- **SEO Friendly**: The framework is designed with SEO best practices in mind, helping your portfolio rank better in search engine results.
- **Multiple Page Support**: Includes 13+ pre-designed pages that can be customized for various content types such as blogs, portfolios, and contact pages.
- **Integrated Tailwind CSS**: Utilizes Tailwind CSS for styling, allowing for rapid design adjustments and a modern aesthetic.
- **Markdown Support**: Content can be written in Markdown or MDX, making it easy to manage and update your portfolio.
- **Dynamic Components**: Supports the integration of dynamic components using React or other frameworks within Astro pages.

## 🛠️ Technology Stack

This project utilizes the following technologies:

- **Astro**: A modern static site generator that focuses on performance and simplicity.
- **Tailwind CSS**: A utility-first CSS framework for creating custom designs without leaving your HTML.
- **React**: A JavaScript library for building user interfaces (optional for dynamic components).
- **Markdown/MDX**: For writing content in an easy-to-read format.

## ⚙️ Installation and Setup

### Prerequisites

Before starting, make sure you have the following requirements installed:

- Node.js (version 18 or higher)
- pnpm (version 8 or higher)

### Getting Started

To install and run the project locally, follow these steps:

1. Clone this repository:

   ```bash
   git clone https://github.com/nicholaslhq/astro-portfolio
   ```

2. Navigate to the project directory:

   ```bash
   cd astro-portfolio
   ```

3. Install the dependencies:

   ```bash
   pnpm install
   ```

4. Start the development server:

   ```bash
   pnpm run dev
   ```

5. Open your browser and visit `http://localhost:4321` to see your portfolio in action.

6. Config your site
   1. Edit `src/content/profileData.ts` to add your profile data
   2. Edit `astro.config.mjs` to change the site information

### Build and Deploy (Optional)

7. Building for production

   ```bash
   pnpm run build
   ```

8. The production-ready files will be generated in the `dist` directory.

9. Deploy to Vercel:

   To deploy your app, you can use Vercel’s deployment platform. You can either use the [Vercel CLI](https://vercel.com/docs/concepts/cli) or deploy directly through the Vercel dashboard.

By following these steps, you should be able to set up and run the Astro Portfolio locally. If you encounter any issues or have questions, feel free to reach out or consult the provided documentation.

Feel free to adjust these instructions based on your specific setup or additional requirements!

## 🎨 Customization

You can customize your portfolio by editing the following files:

- **src/pages/index.astro**: Modify the main content of your portfolio.
- **src/components/**: Add or change components to fit your design needs.
- **src/styles/**: Update styles using Tailwind CSS to personalize your portfolio's appearance.

### Example Custom Component

You can create custom components like this example `CardTerminal.astro` to showcase information effectively:

```astro
---
// Importing necessary components
import CardTerminal from "../layouts/CardTerminal.astro";
---

<CardTerminal>
  ...
</CardTerminal>
```

## 🔍 Troubleshooting

If you encounter issues while using or setting up the Astro Portfolio, consider the following troubleshooting tips:

1. **Installation Issues**:

   - Ensure that you have `Node.js` (version 18 or later) and `pnpm` (version 8 or higher) installed correctly.
   - If you receive errors during installation, try deleting the `node_modules` folder and the `pnpm-lock.yaml` file, then run `pnpm install` again.

2. **Development Server Not Starting**:

   - Check if another application is using port 4321. You can specify a different port by running:
     ```bash
     pnpm run dev -- --port <new-port-number>
     ```
   - Ensure that all dependencies are installed correctly.

3. **Build Errors**:

   - Review error messages in the terminal; they often provide clues about what went wrong.
   - Ensure that all required files are present and correctly referenced in your code.

4. **Styling Issues**:
   - If styles are not applying as expected, verify that Tailwind CSS is configured correctly in your project.
   - Check for any conflicting styles or classes that may override Tailwind's utility classes.

For additional help or specific issues not covered here, consider opening an issue on GitHub with detailed information about the problem encountered.

## 👨‍💻 Contributions

Contributions are welcome! If there are ideas for enhancements, bug fixes, or new features, please feel free to share them. Here’s how to contribute:

1. **Open an Issue**: If you have a suggestion or have encountered a bug, open an issue in the repository to discuss it.
2. **Submit a Pull Request**: If a fix or feature has been implemented, submit a pull request. Be sure to include a clear description of the changes and any relevant context.

Contributions help improve the project and benefit the entire community. Thank you for your interest in enhancing the Astro Portfolio.

## 📄 License

This project is licensed under the [MIT License](LICENSE). You are free to use, modify, and distribute the code under the terms of this license. For more details, please refer to the [LICENSE](LICENSE) file in the repository.
