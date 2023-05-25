import { readdir } from 'node:fs/promises';

const path = process.argv[process.argv.length - 1];
const clearPath = path.lastIndexOf('/') == path.length - 1 ? path.slice(0, path.lastIndexOf('/')) : path;
const tree = {
  "files": [],
  "dirs": [clearPath],
};
const openDir = async (path, tree) => {
  try {
    const entities = await readdir(path);
    const dirs = [];
    const files = [];
    entities.forEach((entity) => entity.includes('.') ? files.push(entity) : dirs.push(entity));
    for (const file of files) {
      tree.files.push(`${path}/${file}`);
    }
    for (const dir of dirs) {
      tree.dirs.push(`${path}/${dir}`);
      await openDir(`${path}/${dir}`, tree);
    }
  } catch (error) {
    console.error(error.message);
  }
}

await openDir(clearPath, tree);
console.log(tree);