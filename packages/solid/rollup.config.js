import { terser } from 'rollup-plugin-terser';
import withSolid from 'rollup-preset-solid';
import packageJSON from './package.json' assert { type: 'json' };

export default withSolid({
  input: './src/index.ts',
  output: {
    file: packageJSON.module,
    format: 'esm',
    sourcemap: true 
  },
  plugins: [
    terser()
  ]
});
