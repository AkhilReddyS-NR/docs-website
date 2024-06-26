const glob = require('glob');
const path = require('path');

const { verifyImages, verifyMDX } = require('./utils/verify-mdx-utils');

const main = async () => {
  let filePaths = process.argv.slice(2);

  if (filePaths.length === 0) {
    // if user did not supply paths, default to all
    filePaths = glob.sync(
      `${__dirname}/../src{/content/**/*.mdx,/i18n/content/**/*.mdx,/install/**/*.mdx}`
    );
    // if user supplies a path that is a directory, get all files recursively
  } else if (!path.extname(filePaths[0])) {
    // remove a possible trailing slash
    const dirPath = filePaths[0].endsWith('/')
      ? filePaths[0].slice(0, -1)
      : filePaths[0];

    filePaths = glob.sync(`${__dirname}/../${dirPath}/**/*.mdx`);
  }

  verifyImages(filePaths);
  await verifyMDX(filePaths);
};

main();
