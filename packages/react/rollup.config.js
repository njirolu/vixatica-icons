import resolve from '@rollup/plugin-node-resolve';
import typescript from 'rollup-plugin-typescript2';
import { terser } from 'rollup-plugin-terser';
import babel from '@rollup/plugin-babel';
import packageJSON from './package.json' assert { type: 'json' };

export default {
  input: './src/index.ts',
  output: {
    file: packageJSON.module,
    format: 'esm',
    sourcemap: true
  },
  plugins: [
    resolve({
      extensions: ['.tsx', '.ts']
    }),
    babel({
      extensions: ['.ts', '.tsx'],
      presets: ['@babel/preset-react', '@babel/preset-env', '@babel/preset-typescript'] ,
      babelHelpers: 'bundled',
      ignore: [/node_modules/]
    }),
    typescript(),
    terser()
  ],
  external: ['react', 'react-dom']
};
