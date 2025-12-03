import { SymbolBase } from '../../LexicalAnalyzer/Symbols/SymbolBase';
import { TreeNodeBase } from './TreeNodeBase';

export class Variables extends TreeNodeBase
{
    constructor(symbol: SymbolBase)
    {
        super(symbol);
    }
}