import { SymbolBase } from '../../LexicalAnalyzer/Symbols/SymbolBase';
import { TreeNodeBase } from './TreeNodeBase';
import {SymbolsCodes} from '../../LexicalAnalyzer/SymbolsCodes';

export class UnaryMinusTreeNodeBase extends TreeNodeBase
{
    unary_minus: SymbolsCodes;

    right: TreeNodeBase;

    constructor(symbol: SymbolBase, right: TreeNodeBase)
    {
        super(symbol);
        this.right = right;
    }
}