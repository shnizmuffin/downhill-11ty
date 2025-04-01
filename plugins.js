// Eleventy
import { EleventyRenderPlugin } from '@11ty/eleventy';
import { InputPathToUrlTransformPlugin } from "@11ty/eleventy";
import EleventyVitePlugin from "@11ty/eleventy-plugin-vite";
import rss from '@11ty/eleventy-plugin-rss';
import syntaxHighlight from '@11ty/eleventy-plugin-syntaxhighlight';
import webc from '@11ty/eleventy-plugin-webc';
import { eleventyImagePlugin } from '@11ty/eleventy-img';
import { eleventyImageTransformPlugin } from '@11ty/eleventy-img';
// Custom transforms
// import { htmlConfig } from './plugins/html-config.js';
// import { cssConfig } from './plugins/css-config.js';
// import { jsConfig } from './plugins/js-config.js';

// custom
// import { markdownLib } from './plugins/markdown.js';
// import { drafts } from './plugins/drafts.js';

export default {
  EleventyRenderPlugin,
  InputPathToUrlTransformPlugin,
  EleventyVitePlugin,
  rss,
  syntaxHighlight,
  webc,
  eleventyImagePlugin,
  eleventyImageTransformPlugin
};
