import { SymbolBase } from '../../LexicalAnalyzer/Symbols/SymbolBase';
import { TreeNodeBase } from './TreeNodeBase';
import { UnaryMinusTreeNodeBase } from './UnaryMinusTreeNodeBase';
import {SymbolsCodes} from '../../LexicalAnalyzer/SymbolsCodes';


export class UnaryMinus extends UnaryMinusTreeNodeBase 

   
{
     constructor(symbol: SymbolBase, right:  TreeNodeBase)
    {
        super(symbol,right);
        
}
}