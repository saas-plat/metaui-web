// 简单表达式语法
// 语法参照 https://github.com/antlr/grammars-v4/blob/master/javascript

grammar Expr;

exec
   : singleExpression EOF           // 支持js表达式
   //| constString EOF                 // 支持便捷的无引号的字符串常量，以=开头
   ;

/*constString
  : '=' (CONST)?                                                        # ConstStringExpression
  ;

CONST
  : ~ [\r\n]
  ;*/

expressionSequence
 : singleExpression ( ',' singleExpression )*
 ;

singleExpression
   : singleExpression '.' ID '(' expressionSequence ')'                 # FunctionInvokeExpression
   | singleExpression '[' expressionSequence ']'                        # MemberIndexExpression
   | singleExpression '.' ID                                            # MemberDotExpression

   | '~' singleExpression                                                   # UnaryExpression
   | '!' singleExpression                                                   # UnaryExpression

   | singleExpression 'in' singleExpression                                 # BinaryExpression
   | singleExpression ( '*' | '/' | '%' ) singleExpression                  # BinaryExpression
   | singleExpression ( '+' | '-' ) singleExpression                        # BinaryExpression
   | singleExpression ( '<<' | '>>' | '>>>' ) singleExpression              # BinaryExpression
   | singleExpression ( '<' | '>' | '<=' | '>=' ) singleExpression          # BinaryExpression
   | singleExpression ( '==' | '!=' /*| '===' | '!=='*/ ) singleExpression   # BinaryExpression
   | singleExpression '&' singleExpression                                  # BinaryExpression
   | singleExpression '^' singleExpression                                  # BinaryExpression
   | singleExpression '|' singleExpression                                  # BinaryExpression
   | singleExpression '&&' singleExpression                                 # BinaryExpression
   | singleExpression '||' singleExpression                                 # BinaryExpression
   | singleExpression '?' singleExpression ':' singleExpression             # TernaryExpression
   | GLOBAL_OBJECT                                                          # InternalExpression
   | CONTEXT_OBJECT                                                         # IdentifierExpression
   | VALUE                                                                  # LiteralExpression
   | objectLiteral                                                          # ObjectLiteralExpression
   | '(' expressionSequence ')'                                             # ParenthesizedExpression
   ;

objectLiteral
  : '{' (propertyAssignment (',' propertyAssignment)*)? ','? '}'    # ObjectPropertyAssignmentExpression
  ;

propertyAssignment
  : ID (':' |'=') singleExpression                                  # PropertyExpressionAssignment
  | '[' singleExpression ']' ':' singleExpression                   # ComputedPropertyExpressionAssignment
  ;

GLOBAL_OBJECT
  : 'now'    // 当前日期时间
  | 'Math'   // 数学公式
  | 'Date'   // 日期（Date.Today...）
  ;

// 变量必须$开头
CONTEXT_OBJECT: '$' ID;


VALUE
 : SPACE? STRING SPACE?
 | SPACE? NUMBER SPACE?
 | SPACE? TRUE SPACE?
 | SPACE? FALSE SPACE?
 | SPACE? NULL SPACE?
 ;

FALSE: 'false';
TRUE: 'true';
NULL: 'null';

// This should be last
ID: [a-zA-Z] [a-zA-Z0-9_]*;

// 字符串
STRING
   : '"' (ESC | ~ ["\\\r\n])* '"'               // 双引号
   | '\'' (ESCSingle | ~ [\'\\\r\n])* '\''      // 单引号
   ;

fragment ESC
   : '\\' (["\\/bfnrt] | UNICODE)
   ;
fragment ESCSingle
   : '\\' ([\'\\/bfnrt] | UNICODE)
   ;
fragment UNICODE
   : 'u' HEX HEX HEX HEX
   ;
fragment HEX
   : [0-9a-fA-F]
   ;
NUMBER
   : '-'? INT '.' [0-9] + EXP?
   | '-'? INT EXP
   | '-'? INT
   ;
fragment INT
   : '0'
   | [1-9] [0-9]*
   ;
// no leading zeros
fragment EXP
   : [Ee] [+\-]? INT
   ;
fragment SPACE: (' ')*;
// \- since - means "range" inside [...]
WS: [ \t\n\r] + -> skip;
SEMI: ';' -> skip;
NEWLINE: '\n'+;
