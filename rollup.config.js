import babel from 'rollup-plugin-babel'
import commonjs from 'rollup-plugin-commonjs'
import external from 'rollup-plugin-peer-deps-external'
import postcss from 'rollup-plugin-postcss'
import resolve from 'rollup-plugin-node-resolve'
import url from 'rollup-plugin-url'

import pkg from './package.json'

console.log(pkg.main);

export default {
  input: 'src/index.js',
  output: [
    {
      file: pkg.main,
      format: 'cjs',
      sourcemap: true
    },
    {
      file: pkg.module,
      format: 'es',
      sourcemap: true
    }
  ],
  plugins: [
    external(),
    postcss({
      modules: true
    }),
    url(),
    babel({
      exclude: 'node_modules/**',
      babelrc: false,
      presets: [['env', { modules: false }], 'react', 'es2015-rollup', 'stage-0'],
      plugins: ['external-helpers','transform-flow-strip-types'],
      runtimeHelpers: true
    }),
    resolve(),
    commonjs({
      namedExports: {
        // left-hand side can be an absolute path, a path
        // relative to the current directory, or the name
        // of a module in node_modules
        'node_modules/react/index.js': ['Component', 'PureComponent', 'Fragment', 'Children', 'createElement'],
        'node_modules/draftjs-utils/lib/draftjs-utils.js': ['changeDepth','handleNewLine','blockRenderMap','getCustomStyleMap','extractInlineStyle','getSelectedBlock','getSelectedBlocksType','getSelectionInlineStyle','toggleCustomInlineStyle','getSelectionCustomInlineStyle','getBlockBeforeSelectedBlock','isListBlock','setBlockData','getSelectedBlocksMetadata','getEntityRange','getSelectionText','getSelectionEntity'],
      }
    })
  ]
}