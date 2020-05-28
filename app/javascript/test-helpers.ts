import '@testing-library/jest-dom/extend-expect';
import Adapter from 'enzyme-adapter-react-16';
import { configure } from 'enzyme';

configure({ adapter: new Adapter() });

//
// Throw exceptions on unhandled promise rejections to prevent tests
// from silently failing async.
//
let unhandledRejection = false;
process.on('unhandledRejection', (reason, promise) => {
  console.error('unhandled rejection:', reason || promise); // eslint-disable-line no-console
  unhandledRejection = true;
  throw promise;
});

process.prependListener('exit', (code) => {
  if (unhandledRejection && code === 0) {
    process.exit(1);
  }
});
