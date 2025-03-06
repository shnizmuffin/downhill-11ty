import path from 'path';
import urlFilter from '../../node_modules/@11ty/eleventy/src/Filters/Url.js';

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
  if (pathPrefix !== undefined) {
    // Fall back on original url filter if pathPrefix is set.
    return urlFilter(url, pathPrefix);
  }

  // Look up the url of the current rendering page, which is accessible via
  // `this`.
  // 


  
  // this line needs work
  const currentDir = globalThis.page ? globalThis.page.url : pageUrl;
  
  
  const filteredUrl = urlFilter(url, '/');

  // Make sure the index.html is expressed.
  const indexUrl = indexify(filteredUrl);

  // Check that the url doesn't specify a protocol.
  const u = new URL(indexUrl, 'make-relative://');
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
    path.relative(currentDir, u.pathname)
      ? path.relative(currentDir, u.pathname) + '/'
      : './'
  }`;
  const happyPath = relativePath.replace(/\\/g, '/');
  return happyPath;
}
