// .vitepress/theme/index.js
import DefaultTheme from 'vitepress/theme'
import Theme from "vitepress/theme";
import './custom.css'
import "vitepress-markdown-timeline/dist/theme/index.css";

//export default DefaultTheme

export default {
    ...Theme,
    enhanceApp(ctx) {
      Theme.enhanceApp(ctx);
    },
  };