import { ExpressionParentheses } from './ExpressionParentheses';
import { SymbolBase } from '../../LexicalAnalyzer/Symbols/SymbolBase';
import { TreeNodeBase } from './TreeNodeBase';

export class ParenthesesExpression extends ExpressionParentheses
{
    constructor(symbol:SymbolBase, Parentheses:TreeNodeBase)
    {
        super(symbol, Parentheses);
    }
}