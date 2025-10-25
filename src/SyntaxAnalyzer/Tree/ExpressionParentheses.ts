import { TreeNodeBase } from './TreeNodeBase';
import { SymbolBase } from '../../LexicalAnalyzer/Symbols/SymbolBase';

export class ExpressionParentheses extends  TreeNodeBase
  
{ 
    Parentheses : TreeNodeBase;
   
    constructor(symbol: SymbolBase, Parentheses:TreeNodeBase) 
    {
       super(symbol);
          
        this.Parentheses = Parentheses;
       
               
    }
}