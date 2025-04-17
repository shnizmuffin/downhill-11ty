export default function (collectionApi) {
  // get unsorted items
  const all = collectionApi.getAll();
  let nav = [];
  // Take what we need
  all.forEach((item) => {
    nav.push({
      id: item.data.eleventyNavigation.key ?? '_root',
      url: item.data.eleventyNavigation.url ?? item.url,
      title:
        item.data.eleventyNavigation.title ??
        item.data.meta.title ??
        item.data.title,
      excerpt:
        item.data.eleventyNavigation.excerpt ?? item.data.meta.description,
      parent: item.data.eleventyNavigation.parent,
      order: item.data.eleventyNavigation.order,
      external: item.data.eleventyNavigation.url ? true : false,
      eleventyNavigation: item.data.eleventyNavigation,
    });
  });

  // This function recurses through the nav array by finding any pages that declare _root as their parent, and then the parent of their children, until the filter returns 0.

  // const nest = (data, parent = '_index', link = 'parent') =>
  //   data
  //     .filter((item) => item[link] === parent)
  //     .map((item) => ({ ...item, children: nest(data, item.id) }));

  /* I attempted to improve performance/make the nesting functionality a bit more readable 
     https://jsperf.app/macecu (46% faster)
  */
  function nestIterative(data, parent = '_index', link = 'parent') {
    const map = {}; // Map to store items by their ID
    const result = []; // Array to hold the root items

    // Create the map and initialize children arrays
    for (const item of data) {
      map[item.id] = { ...item, children: [] };
    }

    // Build the nested structure
    for (const item of data) {
      if (item[link] === parent) {
        result.push(map[item.id]); // Root items
      } else if (map[item[link]]) {
        map[item[link]].children.push(map[item.id]); // Add as child
      }
    }

    return result;
  }
  return nestIterative(nav);
}
