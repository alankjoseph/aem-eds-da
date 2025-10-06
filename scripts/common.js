export function getSectionPath(path) {

  const pathStr = String(path);

  // Split the path into directory levels
  const directories = pathStr.split('/').filter(Boolean);

  // Concatenate the first two directory levels with slashes
  const sectionPath = `/${directories[0]}`

  // Return category path
  return sectionPath;
}

export function getSubSectionPath(path) {

  const pathStr = String(path);

  // Split the path into directory levels
  const directories = pathStr.split('/').filter(Boolean);

  // Concatenate the first two directory levels with slashes
  const subSectionPath = `/${directories[0]}/${directories[1]}`;

  // Return category path
  return subSectionPath;
}