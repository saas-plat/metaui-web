import antlr4 from 'antlr4';
import {
  ErrorListener
} from 'antlr4/error/ErrorListener';

import {
  ExprLexer
} from './dsl/ExprLexer';
import {
  ExprParser
} from './dsl/ExprParser';
import ExprExecutor from './dsl/ExprExecutor';
import log from '../log';

const cache = new Map();

class ExprErrorListener extends ErrorListener {
  error;
  reset() {
    this.error = false;
  }
  syntaxError(recognizer, offendingSymbol, line, column, msg) {
    if (global.__DEV__) {
      log("line " + line + ":" + column + " " + msg);
    }
    this.error = true;
  }
}

const errorHandler = new ExprErrorListener();

export default class Expression {
  str;

  constructor(str) {
    this.str = str;
    if (typeof str === 'string' && !!str) {
      // constString 暂时词法冲突
      const txt = str.trim();
      if (txt.startsWith('=')){
        this.str = txt.substr(1);
        return;
      }
      if (cache.has(str)) {
        this.tree = cache.get(str);
      } else {
        errorHandler.reset();
        const chars = new antlr4.InputStream(str);
        const lexer = new ExprLexer(chars);
        lexer.removeErrorListeners();
        lexer.addErrorListener(errorHandler);
        const tokens = new antlr4.CommonTokenStream(lexer);
        const parser = new ExprParser(tokens);
        // parser._errHandler = new ExceptionErrorStrategy();
        parser.removeErrorListeners();
        parser.addErrorListener(errorHandler);
        parser.buildParseTrees = true;
        let tree = parser.exec();
        if (errorHandler.error) {
          tree = null;
        }
        this.tree = tree;
        cache.set(str, tree);
      }
    }
  }

  toString() {
    return this.str;
  }

  exec(scope) {
    if (this.tree) {
      const executor = new ExprExecutor(scope);
      antlr4.tree.ParseTreeWalker.DEFAULT.walk(executor, this.tree);
      return executor.result;
    } else {
      return this.str;
    }
  }
}
