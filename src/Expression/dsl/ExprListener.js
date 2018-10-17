// Generated from ./src/Expression/dsl/Expr.g4 by ANTLR 4.6
// jshint ignore: start
var antlr4 = require('antlr4/index');

// This class defines a complete listener for a parse tree produced by ExprParser.
function ExprListener() {
	antlr4.tree.ParseTreeListener.call(this);
	return this;
}

ExprListener.prototype = Object.create(antlr4.tree.ParseTreeListener.prototype);
ExprListener.prototype.constructor = ExprListener;

// Enter a parse tree produced by ExprParser#exec.
ExprListener.prototype.enterExec = function(ctx) {
};

// Exit a parse tree produced by ExprParser#exec.
ExprListener.prototype.exitExec = function(ctx) {
};


// Enter a parse tree produced by ExprParser#expressionSequence.
ExprListener.prototype.enterExpressionSequence = function(ctx) {
};

// Exit a parse tree produced by ExprParser#expressionSequence.
ExprListener.prototype.exitExpressionSequence = function(ctx) {
};


// Enter a parse tree produced by ExprParser#ParenthesizedExpression.
ExprListener.prototype.enterParenthesizedExpression = function(ctx) {
};

// Exit a parse tree produced by ExprParser#ParenthesizedExpression.
ExprListener.prototype.exitParenthesizedExpression = function(ctx) {
};


// Enter a parse tree produced by ExprParser#TernaryExpression.
ExprListener.prototype.enterTernaryExpression = function(ctx) {
};

// Exit a parse tree produced by ExprParser#TernaryExpression.
ExprListener.prototype.exitTernaryExpression = function(ctx) {
};


// Enter a parse tree produced by ExprParser#BinaryExpression.
ExprListener.prototype.enterBinaryExpression = function(ctx) {
};

// Exit a parse tree produced by ExprParser#BinaryExpression.
ExprListener.prototype.exitBinaryExpression = function(ctx) {
};


// Enter a parse tree produced by ExprParser#ObjectLiteralExpression.
ExprListener.prototype.enterObjectLiteralExpression = function(ctx) {
};

// Exit a parse tree produced by ExprParser#ObjectLiteralExpression.
ExprListener.prototype.exitObjectLiteralExpression = function(ctx) {
};


// Enter a parse tree produced by ExprParser#FunctionInvokeExpression.
ExprListener.prototype.enterFunctionInvokeExpression = function(ctx) {
};

// Exit a parse tree produced by ExprParser#FunctionInvokeExpression.
ExprListener.prototype.exitFunctionInvokeExpression = function(ctx) {
};


// Enter a parse tree produced by ExprParser#LiteralExpression.
ExprListener.prototype.enterLiteralExpression = function(ctx) {
};

// Exit a parse tree produced by ExprParser#LiteralExpression.
ExprListener.prototype.exitLiteralExpression = function(ctx) {
};


// Enter a parse tree produced by ExprParser#MemberDotExpression.
ExprListener.prototype.enterMemberDotExpression = function(ctx) {
};

// Exit a parse tree produced by ExprParser#MemberDotExpression.
ExprListener.prototype.exitMemberDotExpression = function(ctx) {
};


// Enter a parse tree produced by ExprParser#UnaryExpression.
ExprListener.prototype.enterUnaryExpression = function(ctx) {
};

// Exit a parse tree produced by ExprParser#UnaryExpression.
ExprListener.prototype.exitUnaryExpression = function(ctx) {
};


// Enter a parse tree produced by ExprParser#InternalExpression.
ExprListener.prototype.enterInternalExpression = function(ctx) {
};

// Exit a parse tree produced by ExprParser#InternalExpression.
ExprListener.prototype.exitInternalExpression = function(ctx) {
};


// Enter a parse tree produced by ExprParser#MemberIndexExpression.
ExprListener.prototype.enterMemberIndexExpression = function(ctx) {
};

// Exit a parse tree produced by ExprParser#MemberIndexExpression.
ExprListener.prototype.exitMemberIndexExpression = function(ctx) {
};


// Enter a parse tree produced by ExprParser#IdentifierExpression.
ExprListener.prototype.enterIdentifierExpression = function(ctx) {
};

// Exit a parse tree produced by ExprParser#IdentifierExpression.
ExprListener.prototype.exitIdentifierExpression = function(ctx) {
};


// Enter a parse tree produced by ExprParser#ObjectPropertyAssignmentExpression.
ExprListener.prototype.enterObjectPropertyAssignmentExpression = function(ctx) {
};

// Exit a parse tree produced by ExprParser#ObjectPropertyAssignmentExpression.
ExprListener.prototype.exitObjectPropertyAssignmentExpression = function(ctx) {
};


// Enter a parse tree produced by ExprParser#PropertyExpressionAssignment.
ExprListener.prototype.enterPropertyExpressionAssignment = function(ctx) {
};

// Exit a parse tree produced by ExprParser#PropertyExpressionAssignment.
ExprListener.prototype.exitPropertyExpressionAssignment = function(ctx) {
};


// Enter a parse tree produced by ExprParser#ComputedPropertyExpressionAssignment.
ExprListener.prototype.enterComputedPropertyExpressionAssignment = function(ctx) {
};

// Exit a parse tree produced by ExprParser#ComputedPropertyExpressionAssignment.
ExprListener.prototype.exitComputedPropertyExpressionAssignment = function(ctx) {
};



exports.ExprListener = ExprListener;