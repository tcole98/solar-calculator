import merge from 'deepmerge';

const overwriteMerge = (destinationArray, sourceArray) => sourceArray;

export function mergeObjects(parent_object, child_object_to_add) {
  // update object state data with new data, while keeping untouched old data, overwrite array
  return merge(parent_object, child_object_to_add, { arrayMerge: overwriteMerge })
}

export const generateQueryString = (query) => {
  let query_string = '?';
  Object.keys(query).map(query_key => {
    let string_term = query_key + '=' + query[query_key] + '&';
    query_string = query_string.concat(string_term)
  });

  return query_string.slice(0, -1);
};