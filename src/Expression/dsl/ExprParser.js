// Generated from ./src/Expression/dsl/Expr.g4 by ANTLR 4.6
// jshint ignore: start
var antlr4 = require('antlr4/index');
var ExprListener = require('./ExprListener').ExprListener;
var grammarFileName = "Expr.g4";

var serializedATN = ["\u0003\u0430\ud6d1\u8206\uad2d\u4417\uaef1\u8d80\uaadd",
    "\u0003/}\u0004\u0002\t\u0002\u0004\u0003\t\u0003\u0004\u0004\t\u0004",
    "\u0004\u0005\t\u0005\u0004\u0006\t\u0006\u0003\u0002\u0003\u0002\u0003",
    "\u0002\u0003\u0003\u0003\u0003\u0003\u0003\u0007\u0003\u0013\n\u0003",
    "\f\u0003\u000e\u0003\u0016\u000b\u0003\u0003\u0004\u0003\u0004\u0003",
    "\u0004\u0003\u0004\u0003\u0004\u0003\u0004\u0003\u0004\u0003\u0004\u0003",
    "\u0004\u0003\u0004\u0003\u0004\u0003\u0004\u0003\u0004\u0005\u0004%",
    "\n\u0004\u0003\u0004\u0003\u0004\u0003\u0004\u0003\u0004\u0003\u0004",
    "\u0003\u0004\u0003\u0004\u0003\u0004\u0003\u0004\u0003\u0004\u0003\u0004",
    "\u0003\u0004\u0003\u0004\u0003\u0004\u0003\u0004\u0003\u0004\u0003\u0004",
    "\u0003\u0004\u0003\u0004\u0003\u0004\u0003\u0004\u0003\u0004\u0003\u0004",
    "\u0003\u0004\u0003\u0004\u0003\u0004\u0003\u0004\u0003\u0004\u0003\u0004",
    "\u0003\u0004\u0003\u0004\u0003\u0004\u0003\u0004\u0003\u0004\u0003\u0004",
    "\u0003\u0004\u0003\u0004\u0003\u0004\u0003\u0004\u0003\u0004\u0003\u0004",
    "\u0003\u0004\u0003\u0004\u0003\u0004\u0003\u0004\u0003\u0004\u0003\u0004",
    "\u0003\u0004\u0003\u0004\u0003\u0004\u0003\u0004\u0003\u0004\u0003\u0004",
    "\u0003\u0004\u0007\u0004]\n\u0004\f\u0004\u000e\u0004`\u000b\u0004\u0003",
    "\u0005\u0003\u0005\u0003\u0005\u0003\u0005\u0007\u0005f\n\u0005\f\u0005",
    "\u000e\u0005i\u000b\u0005\u0005\u0005k\n\u0005\u0003\u0005\u0005\u0005",
    "n\n\u0005\u0003\u0005\u0003\u0005\u0003\u0006\u0003\u0006\u0003\u0006",
    "\u0003\u0006\u0003\u0006\u0003\u0006\u0003\u0006\u0003\u0006\u0003\u0006",
    "\u0005\u0006{\n\u0006\u0003\u0006\u0002\u0003\u0006\u0007\u0002\u0004",
    "\u0006\b\n\u0002\b\u0003\u0002\f\u000e\u0003\u0002\u000f\u0010\u0003",
    "\u0002\u0011\u0013\u0003\u0002\u0014\u0017\u0003\u0002\u0018\u0019\u0004",
    "\u0002  ##\u0091\u0002\f\u0003\u0002\u0002\u0002\u0004\u000f\u0003\u0002",
    "\u0002\u0002\u0006$\u0003\u0002\u0002\u0002\ba\u0003\u0002\u0002\u0002",
    "\nz\u0003\u0002\u0002\u0002\f\r\u0005\u0006\u0004\u0002\r\u000e\u0007",
    "\u0002\u0002\u0003\u000e\u0003\u0003\u0002\u0002\u0002\u000f\u0014\u0005",
    "\u0006\u0004\u0002\u0010\u0011\u0007\u0003\u0002\u0002\u0011\u0013\u0005",
    "\u0006\u0004\u0002\u0012\u0010\u0003\u0002\u0002\u0002\u0013\u0016\u0003",
    "\u0002\u0002\u0002\u0014\u0012\u0003\u0002\u0002\u0002\u0014\u0015\u0003",
    "\u0002\u0002\u0002\u0015\u0005\u0003\u0002\u0002\u0002\u0016\u0014\u0003",
    "\u0002\u0002\u0002\u0017\u0018\b\u0004\u0001\u0002\u0018\u0019\u0007",
    "\t\u0002\u0002\u0019%\u0005\u0006\u0004\u0015\u001a\u001b\u0007\n\u0002",
    "\u0002\u001b%\u0005\u0006\u0004\u0014\u001c%\u0007$\u0002\u0002\u001d",
    "%\u0007%\u0002\u0002\u001e%\u0007&\u0002\u0002\u001f%\u0005\b\u0005",
    "\u0002 !\u0007\u0005\u0002\u0002!\"\u0005\u0004\u0003\u0002\"#\u0007",
    "\u0006\u0002\u0002#%\u0003\u0002\u0002\u0002$\u0017\u0003\u0002\u0002",
    "\u0002$\u001a\u0003\u0002\u0002\u0002$\u001c\u0003\u0002\u0002\u0002",
    "$\u001d\u0003\u0002\u0002\u0002$\u001e\u0003\u0002\u0002\u0002$\u001f",
    "\u0003\u0002\u0002\u0002$ \u0003\u0002\u0002\u0002%^\u0003\u0002\u0002",
    "\u0002&\'\f\u0013\u0002\u0002\'(\u0007\u000b\u0002\u0002(]\u0005\u0006",
    "\u0004\u0014)*\f\u0012\u0002\u0002*+\t\u0002\u0002\u0002+]\u0005\u0006",
    "\u0004\u0013,-\f\u0011\u0002\u0002-.\t\u0003\u0002\u0002.]\u0005\u0006",
    "\u0004\u0012/0\f\u0010\u0002\u000201\t\u0004\u0002\u00021]\u0005\u0006",
    "\u0004\u001123\f\u000f\u0002\u000234\t\u0005\u0002\u00024]\u0005\u0006",
    "\u0004\u001056\f\u000e\u0002\u000267\t\u0006\u0002\u00027]\u0005\u0006",
    "\u0004\u000f89\f\r\u0002\u00029:\u0007\u001a\u0002\u0002:]\u0005\u0006",
    "\u0004\u000e;<\f\f\u0002\u0002<=\u0007\u001b\u0002\u0002=]\u0005\u0006",
    "\u0004\r>?\f\u000b\u0002\u0002?@\u0007\u001c\u0002\u0002@]\u0005\u0006",
    "\u0004\fAB\f\n\u0002\u0002BC\u0007\u001d\u0002\u0002C]\u0005\u0006\u0004",
    "\u000bDE\f\t\u0002\u0002EF\u0007\u001e\u0002\u0002F]\u0005\u0006\u0004",
    "\nGH\f\b\u0002\u0002HI\u0007\u001f\u0002\u0002IJ\u0005\u0006\u0004\u0002",
    "JK\u0007 \u0002\u0002KL\u0005\u0006\u0004\tL]\u0003\u0002\u0002\u0002",
    "MN\f\u0018\u0002\u0002NO\u0007\u0004\u0002\u0002OP\u0007*\u0002\u0002",
    "PQ\u0007\u0005\u0002\u0002QR\u0005\u0004\u0003\u0002RS\u0007\u0006\u0002",
    "\u0002S]\u0003\u0002\u0002\u0002TU\f\u0017\u0002\u0002UV\u0007\u0007",
    "\u0002\u0002VW\u0005\u0004\u0003\u0002WX\u0007\b\u0002\u0002X]\u0003",
    "\u0002\u0002\u0002YZ\f\u0016\u0002\u0002Z[\u0007\u0004\u0002\u0002[",
    "]\u0007*\u0002\u0002\\&\u0003\u0002\u0002\u0002\\)\u0003\u0002\u0002",
    "\u0002\\,\u0003\u0002\u0002\u0002\\/\u0003\u0002\u0002\u0002\\2\u0003",
    "\u0002\u0002\u0002\\5\u0003\u0002\u0002\u0002\\8\u0003\u0002\u0002\u0002",
    "\\;\u0003\u0002\u0002\u0002\\>\u0003\u0002\u0002\u0002\\A\u0003\u0002",
    "\u0002\u0002\\D\u0003\u0002\u0002\u0002\\G\u0003\u0002\u0002\u0002\\",
    "M\u0003\u0002\u0002\u0002\\T\u0003\u0002\u0002\u0002\\Y\u0003\u0002",
    "\u0002\u0002]`\u0003\u0002\u0002\u0002^\\\u0003\u0002\u0002\u0002^_",
    "\u0003\u0002\u0002\u0002_\u0007\u0003\u0002\u0002\u0002`^\u0003\u0002",
    "\u0002\u0002aj\u0007!\u0002\u0002bg\u0005\n\u0006\u0002cd\u0007\u0003",
    "\u0002\u0002df\u0005\n\u0006\u0002ec\u0003\u0002\u0002\u0002fi\u0003",
    "\u0002\u0002\u0002ge\u0003\u0002\u0002\u0002gh\u0003\u0002\u0002\u0002",
    "hk\u0003\u0002\u0002\u0002ig\u0003\u0002\u0002\u0002jb\u0003\u0002\u0002",
    "\u0002jk\u0003\u0002\u0002\u0002km\u0003\u0002\u0002\u0002ln\u0007\u0003",
    "\u0002\u0002ml\u0003\u0002\u0002\u0002mn\u0003\u0002\u0002\u0002no\u0003",
    "\u0002\u0002\u0002op\u0007\"\u0002\u0002p\t\u0003\u0002\u0002\u0002",
    "qr\u0007*\u0002\u0002rs\t\u0007\u0002\u0002s{\u0005\u0006\u0004\u0002",
    "tu\u0007\u0007\u0002\u0002uv\u0005\u0006\u0004\u0002vw\u0007\b\u0002",
    "\u0002wx\u0007 \u0002\u0002xy\u0005\u0006\u0004\u0002y{\u0003\u0002",
    "\u0002\u0002zq\u0003\u0002\u0002\u0002zt\u0003\u0002\u0002\u0002{\u000b",
    "\u0003\u0002\u0002\u0002\n\u0014$\\^gjmz"].join("");


var atn = new antlr4.atn.ATNDeserializer().deserialize(serializedATN);

var decisionsToDFA = atn.decisionToState.map( function(ds, index) { return new antlr4.dfa.DFA(ds, index); });

var sharedContextCache = new antlr4.PredictionContextCache();

var literalNames = [ null, "','", "'.'", "'('", "')'", "'['", "']'", "'~'", 
                     "'!'", "'in'", "'*'", "'/'", "'%'", "'+'", "'-'", "'<<'", 
                     "'>>'", "'>>>'", "'<'", "'>'", "'<='", "'>='", "'=='", 
                     "'!='", "'&'", "'^'", "'|'", "'&&'", "'||'", "'?'", 
                     "':'", "'{'", "'}'", "'='", null, null, null, "'false'", 
                     "'true'", "'null'", null, null, null, null, "';'" ];

var symbolicNames = [ null, null, null, null, null, null, null, null, null, 
                      null, null, null, null, null, null, null, null, null, 
                      null, null, null, null, null, null, null, null, null, 
                      null, null, null, null, null, null, null, "GLOBAL_OBJECT", 
                      "CONTEXT_OBJECT", "VALUE", "FALSE", "TRUE", "NULL", 
                      "ID", "STRING", "NUMBER", "WS", "SEMI", "NEWLINE" ];

var ruleNames =  [ "exec", "expressionSequence", "singleExpression", "objectLiteral", 
                   "propertyAssignment" ];

function ExprParser (input) {
	antlr4.Parser.call(this, input);
    this._interp = new antlr4.atn.ParserATNSimulator(this, atn, decisionsToDFA, sharedContextCache);
    this.ruleNames = ruleNames;
    this.literalNames = literalNames;
    this.symbolicNames = symbolicNames;
    return this;
}

ExprParser.prototype = Object.create(antlr4.Parser.prototype);
ExprParser.prototype.constructor = ExprParser;

Object.defineProperty(ExprParser.prototype, "atn", {
	get : function() {
		return atn;
	}
});

ExprParser.EOF = antlr4.Token.EOF;
ExprParser.T__0 = 1;
ExprParser.T__1 = 2;
ExprParser.T__2 = 3;
ExprParser.T__3 = 4;
ExprParser.T__4 = 5;
ExprParser.T__5 = 6;
ExprParser.T__6 = 7;
ExprParser.T__7 = 8;
ExprParser.T__8 = 9;
ExprParser.T__9 = 10;
ExprParser.T__10 = 11;
ExprParser.T__11 = 12;
ExprParser.T__12 = 13;
ExprParser.T__13 = 14;
ExprParser.T__14 = 15;
ExprParser.T__15 = 16;
ExprParser.T__16 = 17;
ExprParser.T__17 = 18;
ExprParser.T__18 = 19;
ExprParser.T__19 = 20;
ExprParser.T__20 = 21;
ExprParser.T__21 = 22;
ExprParser.T__22 = 23;
ExprParser.T__23 = 24;
ExprParser.T__24 = 25;
ExprParser.T__25 = 26;
ExprParser.T__26 = 27;
ExprParser.T__27 = 28;
ExprParser.T__28 = 29;
ExprParser.T__29 = 30;
ExprParser.T__30 = 31;
ExprParser.T__31 = 32;
ExprParser.T__32 = 33;
ExprParser.GLOBAL_OBJECT = 34;
ExprParser.CONTEXT_OBJECT = 35;
ExprParser.VALUE = 36;
ExprParser.FALSE = 37;
ExprParser.TRUE = 38;
ExprParser.NULL = 39;
ExprParser.ID = 40;
ExprParser.STRING = 41;
ExprParser.NUMBER = 42;
ExprParser.WS = 43;
ExprParser.SEMI = 44;
ExprParser.NEWLINE = 45;

ExprParser.RULE_exec = 0;
ExprParser.RULE_expressionSequence = 1;
ExprParser.RULE_singleExpression = 2;
ExprParser.RULE_objectLiteral = 3;
ExprParser.RULE_propertyAssignment = 4;

function ExecContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = ExprParser.RULE_exec;
    return this;
}

ExecContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
ExecContext.prototype.constructor = ExecContext;

ExecContext.prototype.singleExpression = function() {
    return this.getTypedRuleContext(SingleExpressionContext,0);
};

ExecContext.prototype.EOF = function() {
    return this.getToken(ExprParser.EOF, 0);
};

ExecContext.prototype.enterRule = function(listener) {
    if(listener instanceof ExprListener ) {
        listener.enterExec(this);
	}
};

ExecContext.prototype.exitRule = function(listener) {
    if(listener instanceof ExprListener ) {
        listener.exitExec(this);
	}
};




ExprParser.ExecContext = ExecContext;

ExprParser.prototype.exec = function() {

    var localctx = new ExecContext(this, this._ctx, this.state);
    this.enterRule(localctx, 0, ExprParser.RULE_exec);
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 10;
        this.singleExpression(0);
        this.state = 11;
        this.match(ExprParser.EOF);
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};

function ExpressionSequenceContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = ExprParser.RULE_expressionSequence;
    return this;
}

ExpressionSequenceContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
ExpressionSequenceContext.prototype.constructor = ExpressionSequenceContext;

ExpressionSequenceContext.prototype.singleExpression = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(SingleExpressionContext);
    } else {
        return this.getTypedRuleContext(SingleExpressionContext,i);
    }
};

ExpressionSequenceContext.prototype.enterRule = function(listener) {
    if(listener instanceof ExprListener ) {
        listener.enterExpressionSequence(this);
	}
};

ExpressionSequenceContext.prototype.exitRule = function(listener) {
    if(listener instanceof ExprListener ) {
        listener.exitExpressionSequence(this);
	}
};




ExprParser.ExpressionSequenceContext = ExpressionSequenceContext;

ExprParser.prototype.expressionSequence = function() {

    var localctx = new ExpressionSequenceContext(this, this._ctx, this.state);
    this.enterRule(localctx, 2, ExprParser.RULE_expressionSequence);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 13;
        this.singleExpression(0);
        this.state = 18;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        while(_la===ExprParser.T__0) {
            this.state = 14;
            this.match(ExprParser.T__0);
            this.state = 15;
            this.singleExpression(0);
            this.state = 20;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
        }
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};

function SingleExpressionContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = ExprParser.RULE_singleExpression;
    return this;
}

SingleExpressionContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
SingleExpressionContext.prototype.constructor = SingleExpressionContext;


 
SingleExpressionContext.prototype.copyFrom = function(ctx) {
    antlr4.ParserRuleContext.prototype.copyFrom.call(this, ctx);
};

function ParenthesizedExpressionContext(parser, ctx) {
	SingleExpressionContext.call(this, parser);
    SingleExpressionContext.prototype.copyFrom.call(this, ctx);
    return this;
}

ParenthesizedExpressionContext.prototype = Object.create(SingleExpressionContext.prototype);
ParenthesizedExpressionContext.prototype.constructor = ParenthesizedExpressionContext;

ExprParser.ParenthesizedExpressionContext = ParenthesizedExpressionContext;

ParenthesizedExpressionContext.prototype.expressionSequence = function() {
    return this.getTypedRuleContext(ExpressionSequenceContext,0);
};
ParenthesizedExpressionContext.prototype.enterRule = function(listener) {
    if(listener instanceof ExprListener ) {
        listener.enterParenthesizedExpression(this);
	}
};

ParenthesizedExpressionContext.prototype.exitRule = function(listener) {
    if(listener instanceof ExprListener ) {
        listener.exitParenthesizedExpression(this);
	}
};


function TernaryExpressionContext(parser, ctx) {
	SingleExpressionContext.call(this, parser);
    SingleExpressionContext.prototype.copyFrom.call(this, ctx);
    return this;
}

TernaryExpressionContext.prototype = Object.create(SingleExpressionContext.prototype);
TernaryExpressionContext.prototype.constructor = TernaryExpressionContext;

ExprParser.TernaryExpressionContext = TernaryExpressionContext;

TernaryExpressionContext.prototype.singleExpression = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(SingleExpressionContext);
    } else {
        return this.getTypedRuleContext(SingleExpressionContext,i);
    }
};
TernaryExpressionContext.prototype.enterRule = function(listener) {
    if(listener instanceof ExprListener ) {
        listener.enterTernaryExpression(this);
	}
};

TernaryExpressionContext.prototype.exitRule = function(listener) {
    if(listener instanceof ExprListener ) {
        listener.exitTernaryExpression(this);
	}
};


function BinaryExpressionContext(parser, ctx) {
	SingleExpressionContext.call(this, parser);
    SingleExpressionContext.prototype.copyFrom.call(this, ctx);
    return this;
}

BinaryExpressionContext.prototype = Object.create(SingleExpressionContext.prototype);
BinaryExpressionContext.prototype.constructor = BinaryExpressionContext;

ExprParser.BinaryExpressionContext = BinaryExpressionContext;

BinaryExpressionContext.prototype.singleExpression = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(SingleExpressionContext);
    } else {
        return this.getTypedRuleContext(SingleExpressionContext,i);
    }
};
BinaryExpressionContext.prototype.enterRule = function(listener) {
    if(listener instanceof ExprListener ) {
        listener.enterBinaryExpression(this);
	}
};

BinaryExpressionContext.prototype.exitRule = function(listener) {
    if(listener instanceof ExprListener ) {
        listener.exitBinaryExpression(this);
	}
};


function ObjectLiteralExpressionContext(parser, ctx) {
	SingleExpressionContext.call(this, parser);
    SingleExpressionContext.prototype.copyFrom.call(this, ctx);
    return this;
}

ObjectLiteralExpressionContext.prototype = Object.create(SingleExpressionContext.prototype);
ObjectLiteralExpressionContext.prototype.constructor = ObjectLiteralExpressionContext;

ExprParser.ObjectLiteralExpressionContext = ObjectLiteralExpressionContext;

ObjectLiteralExpressionContext.prototype.objectLiteral = function() {
    return this.getTypedRuleContext(ObjectLiteralContext,0);
};
ObjectLiteralExpressionContext.prototype.enterRule = function(listener) {
    if(listener instanceof ExprListener ) {
        listener.enterObjectLiteralExpression(this);
	}
};

ObjectLiteralExpressionContext.prototype.exitRule = function(listener) {
    if(listener instanceof ExprListener ) {
        listener.exitObjectLiteralExpression(this);
	}
};


function FunctionInvokeExpressionContext(parser, ctx) {
	SingleExpressionContext.call(this, parser);
    SingleExpressionContext.prototype.copyFrom.call(this, ctx);
    return this;
}

FunctionInvokeExpressionContext.prototype = Object.create(SingleExpressionContext.prototype);
FunctionInvokeExpressionContext.prototype.constructor = FunctionInvokeExpressionContext;

ExprParser.FunctionInvokeExpressionContext = FunctionInvokeExpressionContext;

FunctionInvokeExpressionContext.prototype.singleExpression = function() {
    return this.getTypedRuleContext(SingleExpressionContext,0);
};

FunctionInvokeExpressionContext.prototype.ID = function() {
    return this.getToken(ExprParser.ID, 0);
};

FunctionInvokeExpressionContext.prototype.expressionSequence = function() {
    return this.getTypedRuleContext(ExpressionSequenceContext,0);
};
FunctionInvokeExpressionContext.prototype.enterRule = function(listener) {
    if(listener instanceof ExprListener ) {
        listener.enterFunctionInvokeExpression(this);
	}
};

FunctionInvokeExpressionContext.prototype.exitRule = function(listener) {
    if(listener instanceof ExprListener ) {
        listener.exitFunctionInvokeExpression(this);
	}
};


function LiteralExpressionContext(parser, ctx) {
	SingleExpressionContext.call(this, parser);
    SingleExpressionContext.prototype.copyFrom.call(this, ctx);
    return this;
}

LiteralExpressionContext.prototype = Object.create(SingleExpressionContext.prototype);
LiteralExpressionContext.prototype.constructor = LiteralExpressionContext;

ExprParser.LiteralExpressionContext = LiteralExpressionContext;

LiteralExpressionContext.prototype.VALUE = function() {
    return this.getToken(ExprParser.VALUE, 0);
};
LiteralExpressionContext.prototype.enterRule = function(listener) {
    if(listener instanceof ExprListener ) {
        listener.enterLiteralExpression(this);
	}
};

LiteralExpressionContext.prototype.exitRule = function(listener) {
    if(listener instanceof ExprListener ) {
        listener.exitLiteralExpression(this);
	}
};


function MemberDotExpressionContext(parser, ctx) {
	SingleExpressionContext.call(this, parser);
    SingleExpressionContext.prototype.copyFrom.call(this, ctx);
    return this;
}

MemberDotExpressionContext.prototype = Object.create(SingleExpressionContext.prototype);
MemberDotExpressionContext.prototype.constructor = MemberDotExpressionContext;

ExprParser.MemberDotExpressionContext = MemberDotExpressionContext;

MemberDotExpressionContext.prototype.singleExpression = function() {
    return this.getTypedRuleContext(SingleExpressionContext,0);
};

MemberDotExpressionContext.prototype.ID = function() {
    return this.getToken(ExprParser.ID, 0);
};
MemberDotExpressionContext.prototype.enterRule = function(listener) {
    if(listener instanceof ExprListener ) {
        listener.enterMemberDotExpression(this);
	}
};

MemberDotExpressionContext.prototype.exitRule = function(listener) {
    if(listener instanceof ExprListener ) {
        listener.exitMemberDotExpression(this);
	}
};


function UnaryExpressionContext(parser, ctx) {
	SingleExpressionContext.call(this, parser);
    SingleExpressionContext.prototype.copyFrom.call(this, ctx);
    return this;
}

UnaryExpressionContext.prototype = Object.create(SingleExpressionContext.prototype);
UnaryExpressionContext.prototype.constructor = UnaryExpressionContext;

ExprParser.UnaryExpressionContext = UnaryExpressionContext;

UnaryExpressionContext.prototype.singleExpression = function() {
    return this.getTypedRuleContext(SingleExpressionContext,0);
};
UnaryExpressionContext.prototype.enterRule = function(listener) {
    if(listener instanceof ExprListener ) {
        listener.enterUnaryExpression(this);
	}
};

UnaryExpressionContext.prototype.exitRule = function(listener) {
    if(listener instanceof ExprListener ) {
        listener.exitUnaryExpression(this);
	}
};


function InternalExpressionContext(parser, ctx) {
	SingleExpressionContext.call(this, parser);
    SingleExpressionContext.prototype.copyFrom.call(this, ctx);
    return this;
}

InternalExpressionContext.prototype = Object.create(SingleExpressionContext.prototype);
InternalExpressionContext.prototype.constructor = InternalExpressionContext;

ExprParser.InternalExpressionContext = InternalExpressionContext;

InternalExpressionContext.prototype.GLOBAL_OBJECT = function() {
    return this.getToken(ExprParser.GLOBAL_OBJECT, 0);
};
InternalExpressionContext.prototype.enterRule = function(listener) {
    if(listener instanceof ExprListener ) {
        listener.enterInternalExpression(this);
	}
};

InternalExpressionContext.prototype.exitRule = function(listener) {
    if(listener instanceof ExprListener ) {
        listener.exitInternalExpression(this);
	}
};


function MemberIndexExpressionContext(parser, ctx) {
	SingleExpressionContext.call(this, parser);
    SingleExpressionContext.prototype.copyFrom.call(this, ctx);
    return this;
}

MemberIndexExpressionContext.prototype = Object.create(SingleExpressionContext.prototype);
MemberIndexExpressionContext.prototype.constructor = MemberIndexExpressionContext;

ExprParser.MemberIndexExpressionContext = MemberIndexExpressionContext;

MemberIndexExpressionContext.prototype.singleExpression = function() {
    return this.getTypedRuleContext(SingleExpressionContext,0);
};

MemberIndexExpressionContext.prototype.expressionSequence = function() {
    return this.getTypedRuleContext(ExpressionSequenceContext,0);
};
MemberIndexExpressionContext.prototype.enterRule = function(listener) {
    if(listener instanceof ExprListener ) {
        listener.enterMemberIndexExpression(this);
	}
};

MemberIndexExpressionContext.prototype.exitRule = function(listener) {
    if(listener instanceof ExprListener ) {
        listener.exitMemberIndexExpression(this);
	}
};


function IdentifierExpressionContext(parser, ctx) {
	SingleExpressionContext.call(this, parser);
    SingleExpressionContext.prototype.copyFrom.call(this, ctx);
    return this;
}

IdentifierExpressionContext.prototype = Object.create(SingleExpressionContext.prototype);
IdentifierExpressionContext.prototype.constructor = IdentifierExpressionContext;

ExprParser.IdentifierExpressionContext = IdentifierExpressionContext;

IdentifierExpressionContext.prototype.CONTEXT_OBJECT = function() {
    return this.getToken(ExprParser.CONTEXT_OBJECT, 0);
};
IdentifierExpressionContext.prototype.enterRule = function(listener) {
    if(listener instanceof ExprListener ) {
        listener.enterIdentifierExpression(this);
	}
};

IdentifierExpressionContext.prototype.exitRule = function(listener) {
    if(listener instanceof ExprListener ) {
        listener.exitIdentifierExpression(this);
	}
};



ExprParser.prototype.singleExpression = function(_p) {
	if(_p===undefined) {
	    _p = 0;
	}
    var _parentctx = this._ctx;
    var _parentState = this.state;
    var localctx = new SingleExpressionContext(this, this._ctx, _parentState);
    var _prevctx = localctx;
    var _startState = 4;
    this.enterRecursionRule(localctx, 4, ExprParser.RULE_singleExpression, _p);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 34;
        this._errHandler.sync(this);
        switch(this._input.LA(1)) {
        case ExprParser.T__6:
            localctx = new UnaryExpressionContext(this, localctx);
            this._ctx = localctx;
            _prevctx = localctx;

            this.state = 22;
            this.match(ExprParser.T__6);
            this.state = 23;
            this.singleExpression(19);
            break;
        case ExprParser.T__7:
            localctx = new UnaryExpressionContext(this, localctx);
            this._ctx = localctx;
            _prevctx = localctx;
            this.state = 24;
            this.match(ExprParser.T__7);
            this.state = 25;
            this.singleExpression(18);
            break;
        case ExprParser.GLOBAL_OBJECT:
            localctx = new InternalExpressionContext(this, localctx);
            this._ctx = localctx;
            _prevctx = localctx;
            this.state = 26;
            this.match(ExprParser.GLOBAL_OBJECT);
            break;
        case ExprParser.CONTEXT_OBJECT:
            localctx = new IdentifierExpressionContext(this, localctx);
            this._ctx = localctx;
            _prevctx = localctx;
            this.state = 27;
            this.match(ExprParser.CONTEXT_OBJECT);
            break;
        case ExprParser.VALUE:
            localctx = new LiteralExpressionContext(this, localctx);
            this._ctx = localctx;
            _prevctx = localctx;
            this.state = 28;
            this.match(ExprParser.VALUE);
            break;
        case ExprParser.T__30:
            localctx = new ObjectLiteralExpressionContext(this, localctx);
            this._ctx = localctx;
            _prevctx = localctx;
            this.state = 29;
            this.objectLiteral();
            break;
        case ExprParser.T__2:
            localctx = new ParenthesizedExpressionContext(this, localctx);
            this._ctx = localctx;
            _prevctx = localctx;
            this.state = 30;
            this.match(ExprParser.T__2);
            this.state = 31;
            this.expressionSequence();
            this.state = 32;
            this.match(ExprParser.T__3);
            break;
        default:
            throw new antlr4.error.NoViableAltException(this);
        }
        this._ctx.stop = this._input.LT(-1);
        this.state = 92;
        this._errHandler.sync(this);
        var _alt = this._interp.adaptivePredict(this._input,3,this._ctx)
        while(_alt!=2 && _alt!=antlr4.atn.ATN.INVALID_ALT_NUMBER) {
            if(_alt===1) {
                if(this._parseListeners!==null) {
                    this.triggerExitRuleEvent();
                }
                _prevctx = localctx;
                this.state = 90;
                this._errHandler.sync(this);
                var la_ = this._interp.adaptivePredict(this._input,2,this._ctx);
                switch(la_) {
                case 1:
                    localctx = new BinaryExpressionContext(this, new SingleExpressionContext(this, _parentctx, _parentState));
                    this.pushNewRecursionContext(localctx, _startState, ExprParser.RULE_singleExpression);
                    this.state = 36;
                    if (!( this.precpred(this._ctx, 17))) {
                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 17)");
                    }
                    this.state = 37;
                    this.match(ExprParser.T__8);
                    this.state = 38;
                    this.singleExpression(18);
                    break;

                case 2:
                    localctx = new BinaryExpressionContext(this, new SingleExpressionContext(this, _parentctx, _parentState));
                    this.pushNewRecursionContext(localctx, _startState, ExprParser.RULE_singleExpression);
                    this.state = 39;
                    if (!( this.precpred(this._ctx, 16))) {
                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 16)");
                    }
                    this.state = 40;
                    _la = this._input.LA(1);
                    if(!((((_la) & ~0x1f) == 0 && ((1 << _la) & ((1 << ExprParser.T__9) | (1 << ExprParser.T__10) | (1 << ExprParser.T__11))) !== 0))) {
                    this._errHandler.recoverInline(this);
                    }
                    else {
                    	this._errHandler.reportMatch(this);
                        this.consume();
                    }
                    this.state = 41;
                    this.singleExpression(17);
                    break;

                case 3:
                    localctx = new BinaryExpressionContext(this, new SingleExpressionContext(this, _parentctx, _parentState));
                    this.pushNewRecursionContext(localctx, _startState, ExprParser.RULE_singleExpression);
                    this.state = 42;
                    if (!( this.precpred(this._ctx, 15))) {
                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 15)");
                    }
                    this.state = 43;
                    _la = this._input.LA(1);
                    if(!(_la===ExprParser.T__12 || _la===ExprParser.T__13)) {
                    this._errHandler.recoverInline(this);
                    }
                    else {
                    	this._errHandler.reportMatch(this);
                        this.consume();
                    }
                    this.state = 44;
                    this.singleExpression(16);
                    break;

                case 4:
                    localctx = new BinaryExpressionContext(this, new SingleExpressionContext(this, _parentctx, _parentState));
                    this.pushNewRecursionContext(localctx, _startState, ExprParser.RULE_singleExpression);
                    this.state = 45;
                    if (!( this.precpred(this._ctx, 14))) {
                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 14)");
                    }
                    this.state = 46;
                    _la = this._input.LA(1);
                    if(!((((_la) & ~0x1f) == 0 && ((1 << _la) & ((1 << ExprParser.T__14) | (1 << ExprParser.T__15) | (1 << ExprParser.T__16))) !== 0))) {
                    this._errHandler.recoverInline(this);
                    }
                    else {
                    	this._errHandler.reportMatch(this);
                        this.consume();
                    }
                    this.state = 47;
                    this.singleExpression(15);
                    break;

                case 5:
                    localctx = new BinaryExpressionContext(this, new SingleExpressionContext(this, _parentctx, _parentState));
                    this.pushNewRecursionContext(localctx, _startState, ExprParser.RULE_singleExpression);
                    this.state = 48;
                    if (!( this.precpred(this._ctx, 13))) {
                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 13)");
                    }
                    this.state = 49;
                    _la = this._input.LA(1);
                    if(!((((_la) & ~0x1f) == 0 && ((1 << _la) & ((1 << ExprParser.T__17) | (1 << ExprParser.T__18) | (1 << ExprParser.T__19) | (1 << ExprParser.T__20))) !== 0))) {
                    this._errHandler.recoverInline(this);
                    }
                    else {
                    	this._errHandler.reportMatch(this);
                        this.consume();
                    }
                    this.state = 50;
                    this.singleExpression(14);
                    break;

                case 6:
                    localctx = new BinaryExpressionContext(this, new SingleExpressionContext(this, _parentctx, _parentState));
                    this.pushNewRecursionContext(localctx, _startState, ExprParser.RULE_singleExpression);
                    this.state = 51;
                    if (!( this.precpred(this._ctx, 12))) {
                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 12)");
                    }
                    this.state = 52;
                    _la = this._input.LA(1);
                    if(!(_la===ExprParser.T__21 || _la===ExprParser.T__22)) {
                    this._errHandler.recoverInline(this);
                    }
                    else {
                    	this._errHandler.reportMatch(this);
                        this.consume();
                    }
                    this.state = 53;
                    this.singleExpression(13);
                    break;

                case 7:
                    localctx = new BinaryExpressionContext(this, new SingleExpressionContext(this, _parentctx, _parentState));
                    this.pushNewRecursionContext(localctx, _startState, ExprParser.RULE_singleExpression);
                    this.state = 54;
                    if (!( this.precpred(this._ctx, 11))) {
                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 11)");
                    }
                    this.state = 55;
                    this.match(ExprParser.T__23);
                    this.state = 56;
                    this.singleExpression(12);
                    break;

                case 8:
                    localctx = new BinaryExpressionContext(this, new SingleExpressionContext(this, _parentctx, _parentState));
                    this.pushNewRecursionContext(localctx, _startState, ExprParser.RULE_singleExpression);
                    this.state = 57;
                    if (!( this.precpred(this._ctx, 10))) {
                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 10)");
                    }
                    this.state = 58;
                    this.match(ExprParser.T__24);
                    this.state = 59;
                    this.singleExpression(11);
                    break;

                case 9:
                    localctx = new BinaryExpressionContext(this, new SingleExpressionContext(this, _parentctx, _parentState));
                    this.pushNewRecursionContext(localctx, _startState, ExprParser.RULE_singleExpression);
                    this.state = 60;
                    if (!( this.precpred(this._ctx, 9))) {
                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 9)");
                    }
                    this.state = 61;
                    this.match(ExprParser.T__25);
                    this.state = 62;
                    this.singleExpression(10);
                    break;

                case 10:
                    localctx = new BinaryExpressionContext(this, new SingleExpressionContext(this, _parentctx, _parentState));
                    this.pushNewRecursionContext(localctx, _startState, ExprParser.RULE_singleExpression);
                    this.state = 63;
                    if (!( this.precpred(this._ctx, 8))) {
                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 8)");
                    }
                    this.state = 64;
                    this.match(ExprParser.T__26);
                    this.state = 65;
                    this.singleExpression(9);
                    break;

                case 11:
                    localctx = new BinaryExpressionContext(this, new SingleExpressionContext(this, _parentctx, _parentState));
                    this.pushNewRecursionContext(localctx, _startState, ExprParser.RULE_singleExpression);
                    this.state = 66;
                    if (!( this.precpred(this._ctx, 7))) {
                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 7)");
                    }
                    this.state = 67;
                    this.match(ExprParser.T__27);
                    this.state = 68;
                    this.singleExpression(8);
                    break;

                case 12:
                    localctx = new TernaryExpressionContext(this, new SingleExpressionContext(this, _parentctx, _parentState));
                    this.pushNewRecursionContext(localctx, _startState, ExprParser.RULE_singleExpression);
                    this.state = 69;
                    if (!( this.precpred(this._ctx, 6))) {
                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 6)");
                    }
                    this.state = 70;
                    this.match(ExprParser.T__28);
                    this.state = 71;
                    this.singleExpression(0);
                    this.state = 72;
                    this.match(ExprParser.T__29);
                    this.state = 73;
                    this.singleExpression(7);
                    break;

                case 13:
                    localctx = new FunctionInvokeExpressionContext(this, new SingleExpressionContext(this, _parentctx, _parentState));
                    this.pushNewRecursionContext(localctx, _startState, ExprParser.RULE_singleExpression);
                    this.state = 75;
                    if (!( this.precpred(this._ctx, 22))) {
                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 22)");
                    }
                    this.state = 76;
                    this.match(ExprParser.T__1);
                    this.state = 77;
                    this.match(ExprParser.ID);
                    this.state = 78;
                    this.match(ExprParser.T__2);
                    this.state = 79;
                    this.expressionSequence();
                    this.state = 80;
                    this.match(ExprParser.T__3);
                    break;

                case 14:
                    localctx = new MemberIndexExpressionContext(this, new SingleExpressionContext(this, _parentctx, _parentState));
                    this.pushNewRecursionContext(localctx, _startState, ExprParser.RULE_singleExpression);
                    this.state = 82;
                    if (!( this.precpred(this._ctx, 21))) {
                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 21)");
                    }
                    this.state = 83;
                    this.match(ExprParser.T__4);
                    this.state = 84;
                    this.expressionSequence();
                    this.state = 85;
                    this.match(ExprParser.T__5);
                    break;

                case 15:
                    localctx = new MemberDotExpressionContext(this, new SingleExpressionContext(this, _parentctx, _parentState));
                    this.pushNewRecursionContext(localctx, _startState, ExprParser.RULE_singleExpression);
                    this.state = 87;
                    if (!( this.precpred(this._ctx, 20))) {
                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 20)");
                    }
                    this.state = 88;
                    this.match(ExprParser.T__1);
                    this.state = 89;
                    this.match(ExprParser.ID);
                    break;

                } 
            }
            this.state = 94;
            this._errHandler.sync(this);
            _alt = this._interp.adaptivePredict(this._input,3,this._ctx);
        }

    } catch( error) {
        if(error instanceof antlr4.error.RecognitionException) {
	        localctx.exception = error;
	        this._errHandler.reportError(this, error);
	        this._errHandler.recover(this, error);
	    } else {
	    	throw error;
	    }
    } finally {
        this.unrollRecursionContexts(_parentctx)
    }
    return localctx;
};

function ObjectLiteralContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = ExprParser.RULE_objectLiteral;
    return this;
}

ObjectLiteralContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
ObjectLiteralContext.prototype.constructor = ObjectLiteralContext;


 
ObjectLiteralContext.prototype.copyFrom = function(ctx) {
    antlr4.ParserRuleContext.prototype.copyFrom.call(this, ctx);
};


function ObjectPropertyAssignmentExpressionContext(parser, ctx) {
	ObjectLiteralContext.call(this, parser);
    ObjectLiteralContext.prototype.copyFrom.call(this, ctx);
    return this;
}

ObjectPropertyAssignmentExpressionContext.prototype = Object.create(ObjectLiteralContext.prototype);
ObjectPropertyAssignmentExpressionContext.prototype.constructor = ObjectPropertyAssignmentExpressionContext;

ExprParser.ObjectPropertyAssignmentExpressionContext = ObjectPropertyAssignmentExpressionContext;

ObjectPropertyAssignmentExpressionContext.prototype.propertyAssignment = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(PropertyAssignmentContext);
    } else {
        return this.getTypedRuleContext(PropertyAssignmentContext,i);
    }
};
ObjectPropertyAssignmentExpressionContext.prototype.enterRule = function(listener) {
    if(listener instanceof ExprListener ) {
        listener.enterObjectPropertyAssignmentExpression(this);
	}
};

ObjectPropertyAssignmentExpressionContext.prototype.exitRule = function(listener) {
    if(listener instanceof ExprListener ) {
        listener.exitObjectPropertyAssignmentExpression(this);
	}
};



ExprParser.ObjectLiteralContext = ObjectLiteralContext;

ExprParser.prototype.objectLiteral = function() {

    var localctx = new ObjectLiteralContext(this, this._ctx, this.state);
    this.enterRule(localctx, 6, ExprParser.RULE_objectLiteral);
    var _la = 0; // Token type
    try {
        localctx = new ObjectPropertyAssignmentExpressionContext(this, localctx);
        this.enterOuterAlt(localctx, 1);
        this.state = 95;
        this.match(ExprParser.T__30);
        this.state = 104;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        if(_la===ExprParser.T__4 || _la===ExprParser.ID) {
            this.state = 96;
            this.propertyAssignment();
            this.state = 101;
            this._errHandler.sync(this);
            var _alt = this._interp.adaptivePredict(this._input,4,this._ctx)
            while(_alt!=2 && _alt!=antlr4.atn.ATN.INVALID_ALT_NUMBER) {
                if(_alt===1) {
                    this.state = 97;
                    this.match(ExprParser.T__0);
                    this.state = 98;
                    this.propertyAssignment(); 
                }
                this.state = 103;
                this._errHandler.sync(this);
                _alt = this._interp.adaptivePredict(this._input,4,this._ctx);
            }

        }

        this.state = 107;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        if(_la===ExprParser.T__0) {
            this.state = 106;
            this.match(ExprParser.T__0);
        }

        this.state = 109;
        this.match(ExprParser.T__31);
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};

function PropertyAssignmentContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = ExprParser.RULE_propertyAssignment;
    return this;
}

PropertyAssignmentContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
PropertyAssignmentContext.prototype.constructor = PropertyAssignmentContext;


 
PropertyAssignmentContext.prototype.copyFrom = function(ctx) {
    antlr4.ParserRuleContext.prototype.copyFrom.call(this, ctx);
};


function PropertyExpressionAssignmentContext(parser, ctx) {
	PropertyAssignmentContext.call(this, parser);
    PropertyAssignmentContext.prototype.copyFrom.call(this, ctx);
    return this;
}

PropertyExpressionAssignmentContext.prototype = Object.create(PropertyAssignmentContext.prototype);
PropertyExpressionAssignmentContext.prototype.constructor = PropertyExpressionAssignmentContext;

ExprParser.PropertyExpressionAssignmentContext = PropertyExpressionAssignmentContext;

PropertyExpressionAssignmentContext.prototype.ID = function() {
    return this.getToken(ExprParser.ID, 0);
};

PropertyExpressionAssignmentContext.prototype.singleExpression = function() {
    return this.getTypedRuleContext(SingleExpressionContext,0);
};
PropertyExpressionAssignmentContext.prototype.enterRule = function(listener) {
    if(listener instanceof ExprListener ) {
        listener.enterPropertyExpressionAssignment(this);
	}
};

PropertyExpressionAssignmentContext.prototype.exitRule = function(listener) {
    if(listener instanceof ExprListener ) {
        listener.exitPropertyExpressionAssignment(this);
	}
};


function ComputedPropertyExpressionAssignmentContext(parser, ctx) {
	PropertyAssignmentContext.call(this, parser);
    PropertyAssignmentContext.prototype.copyFrom.call(this, ctx);
    return this;
}

ComputedPropertyExpressionAssignmentContext.prototype = Object.create(PropertyAssignmentContext.prototype);
ComputedPropertyExpressionAssignmentContext.prototype.constructor = ComputedPropertyExpressionAssignmentContext;

ExprParser.ComputedPropertyExpressionAssignmentContext = ComputedPropertyExpressionAssignmentContext;

ComputedPropertyExpressionAssignmentContext.prototype.singleExpression = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(SingleExpressionContext);
    } else {
        return this.getTypedRuleContext(SingleExpressionContext,i);
    }
};
ComputedPropertyExpressionAssignmentContext.prototype.enterRule = function(listener) {
    if(listener instanceof ExprListener ) {
        listener.enterComputedPropertyExpressionAssignment(this);
	}
};

ComputedPropertyExpressionAssignmentContext.prototype.exitRule = function(listener) {
    if(listener instanceof ExprListener ) {
        listener.exitComputedPropertyExpressionAssignment(this);
	}
};



ExprParser.PropertyAssignmentContext = PropertyAssignmentContext;

ExprParser.prototype.propertyAssignment = function() {

    var localctx = new PropertyAssignmentContext(this, this._ctx, this.state);
    this.enterRule(localctx, 8, ExprParser.RULE_propertyAssignment);
    var _la = 0; // Token type
    try {
        this.state = 120;
        this._errHandler.sync(this);
        switch(this._input.LA(1)) {
        case ExprParser.ID:
            localctx = new PropertyExpressionAssignmentContext(this, localctx);
            this.enterOuterAlt(localctx, 1);
            this.state = 111;
            this.match(ExprParser.ID);
            this.state = 112;
            _la = this._input.LA(1);
            if(!(_la===ExprParser.T__29 || _la===ExprParser.T__32)) {
            this._errHandler.recoverInline(this);
            }
            else {
            	this._errHandler.reportMatch(this);
                this.consume();
            }
            this.state = 113;
            this.singleExpression(0);
            break;
        case ExprParser.T__4:
            localctx = new ComputedPropertyExpressionAssignmentContext(this, localctx);
            this.enterOuterAlt(localctx, 2);
            this.state = 114;
            this.match(ExprParser.T__4);
            this.state = 115;
            this.singleExpression(0);
            this.state = 116;
            this.match(ExprParser.T__5);
            this.state = 117;
            this.match(ExprParser.T__29);
            this.state = 118;
            this.singleExpression(0);
            break;
        default:
            throw new antlr4.error.NoViableAltException(this);
        }
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};


ExprParser.prototype.sempred = function(localctx, ruleIndex, predIndex) {
	switch(ruleIndex) {
	case 2:
			return this.singleExpression_sempred(localctx, predIndex);
    default:
        throw "No predicate with index:" + ruleIndex;
   }
};

ExprParser.prototype.singleExpression_sempred = function(localctx, predIndex) {
	switch(predIndex) {
		case 0:
			return this.precpred(this._ctx, 17);
		case 1:
			return this.precpred(this._ctx, 16);
		case 2:
			return this.precpred(this._ctx, 15);
		case 3:
			return this.precpred(this._ctx, 14);
		case 4:
			return this.precpred(this._ctx, 13);
		case 5:
			return this.precpred(this._ctx, 12);
		case 6:
			return this.precpred(this._ctx, 11);
		case 7:
			return this.precpred(this._ctx, 10);
		case 8:
			return this.precpred(this._ctx, 9);
		case 9:
			return this.precpred(this._ctx, 8);
		case 10:
			return this.precpred(this._ctx, 7);
		case 11:
			return this.precpred(this._ctx, 6);
		case 12:
			return this.precpred(this._ctx, 22);
		case 13:
			return this.precpred(this._ctx, 21);
		case 14:
			return this.precpred(this._ctx, 20);
		default:
			throw "No predicate with index:" + predIndex;
	}
};


exports.ExprParser = ExprParser;
