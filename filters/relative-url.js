import path from 'path';
import urlFilter from '../../node_modules/@11ty/eleventy/src/Filters/Url.js';
import { stringify } from 'querystring';

const indexify = (url) => {
  return url.replace(/(\/[^.]*)$/, '$1');
};

/**
 * Just `{{ '/something' | url }}` will return the relative path to
 * `/something/index.html`.
 *
 * `{{ '/something.with.dots' | url }}` will return the relative path to
 * `/something.with.dots`.
 *
 
 * @param {string} url the URL to transform
 * @param {string} [pathPrefix] optional path prefix to force an absolute URL
 * @returns {string} resulting URL
 */

export default function (url, pageUrl, pathPrefix = undefined) {
  // console.log('url: ' + url);
  // console.log('pageUrl: ' + pageUrl);

  if (pathPrefix !== undefined) {
    // Fall back on original url filter if pathPrefix is set.
    return urlFilter(url, pathPrefix);
  }
  // Look up the url of the current rendering page, which is accessible via
  // `this`.
  const currentDir = pageUrl ? pageUrl : this.ctx.page.url;
  // console.log('currentDir: ' + currentDir);

  const filteredUrl = urlFilter(url, '/');
  // console.log('filteredUrl: ' + filteredUrl);

  // Make sure the index.html is expressed.
  const indexUrl = indexify(filteredUrl);
  // console.log('indexUrl: ' + indexUrl);

  // Check that the url doesn't specify a protocol.
  const u = new URL(indexUrl, 'make-relative://');
  // console.log('u: ' + u);

  if (u.protocol !== 'make-relative:') {
    // It has a protocol, so just return the filtered URL output.
    return filteredUrl;
  }

  // Return the relative path, or `index.html` if it's the same as the current
  // page's directory.
  /**
   * @param {string} element string matching the regular expression against
   * @returns {string} newly formatted path with forward slashes
   *
   */
  const relativePath = `${
    path.relative(currentDir, u.pathname) || 'index.html'
  }`;
  // console.log('relativePath: ' + relativePath);

  const happyPath = relativePath.replace(/\\/g, '/');
  // console.log('happyPath: ' + happyPath,'\n');
  return happyPath;
}
