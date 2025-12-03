import { Multiplication } from './Tree/Multiplication';
import { Division } from './Tree/Division';
import { Addition } from './Tree/Addition';
import { Subtraction } from './Tree/Subtraction';
import { VariableExpression } from './Tree/VariableExpression';
import { NumberConstant } from './Tree/NumberConstant';
import { Variables } from './Tree/Variables';
import { SymbolsCodes } from '../LexicalAnalyzer/SymbolsCodes';
import { LexicalAnalyzer } from '../LexicalAnalyzer/LexicalAnalyzer';
import { TreeNodeBase } from './Tree/TreeNodeBase';
import { SymbolBase } from '../LexicalAnalyzer/Symbols/SymbolBase';
import { BinaryOperation } from './Tree/BinaryOperation';
import { UnaryMinus } from  './Tree/UnaryMinus';
import { ParenthesesExpression } from  './Tree/ParenthesesExpression';


/**
 * Синтаксический анализатор - отвечает за построение синтаксического дерева
 */
export class SyntaxAnalyzer {

    lexicalAnalyzer: LexicalAnalyzer;
    symbol: SymbolBase | null;
   
    

    /**
     * Деревья, которые будут построены (например, для каждой строки исходного кода)
     */
    trees: TreeNodeBase[];

    constructor(lexicalAnalyzer: LexicalAnalyzer) {
        this.lexicalAnalyzer = lexicalAnalyzer;
        this.symbol = null;
        this.trees = [];
     }

    /**
     * Перемещаемся по последовательности "символов" лексического анализатора,
     * получая очередной "символ" ("слово")
     */
    nextSym(): void {
        this.symbol = this.lexicalAnalyzer.nextSym();
    }

    accept(expectedSymbolCode: string): void {
        if (this.symbol === null) {
            throw `${expectedSymbolCode} expected but END OF FILE found!`;
        }

        if (this.symbol.symbolCode === expectedSymbolCode) {
            this.nextSym();
        } else {
            throw `${expectedSymbolCode} expected but ${this.symbol.symbolCode} found!`;
        }
    }

    analyze(): TreeNodeBase[] {
        this.nextSym();

        while (this.symbol !== null) {
            let expression: TreeNodeBase = this.scanExpression();

            this.trees.push(expression);

            // Последняя строка может не заканчиваться переносом на следующую строку.
            if (this.symbol !== null) {
                this.accept(SymbolsCodes.endOfLine);
            }
        }

        return this.trees;
    }

    /**
     * Разбор выражения
     */
    scanExpression(): TreeNodeBase {
        let term: TreeNodeBase = this.scanTerm();
        let operationSymbol: SymbolBase | null = null;

        while (this.symbol !== null && (
            this.symbol.symbolCode === SymbolsCodes.plus ||
            this.symbol.symbolCode === SymbolsCodes.minus
        )) {

            operationSymbol = this.symbol;
            this.nextSym();

            let secondTerm: TreeNodeBase = this.scanTerm();

            switch (operationSymbol.symbolCode) {
                case SymbolsCodes.plus:
                    term = new Addition(operationSymbol, term, secondTerm);
                    break;
                case SymbolsCodes.minus:
                    term = new Subtraction(operationSymbol, term, secondTerm);
                    break;
            }
        }
        
        while (this.symbol !== null && (
            this.symbol.symbolCode === SymbolsCodes.Equals )) {

             const variableSymbolsRegExp = /\w/i; 

              let result = this.lexicalAnalyzer.fileIO.lastCh();

             if ((variableSymbolsRegExp.exec(result[1])!== null)&&((result[2]==" ")||(result[2]=="\n")||(result[2]=="="))){ 

                operationSymbol = this.symbol;
                this.nextSym();
                let secondExpression: TreeNodeBase = this.scanExpression();
                term = new VariableExpression (operationSymbol, term, secondExpression);
             } else
                this.accept(SymbolsCodes.endOfLine);
       }

        return term;
    }

    /**
     * Разбор "слагаемого"
     */
    scanTerm(): TreeNodeBase {
        let multiplier: TreeNodeBase = this.scanMultiplier();
        let operationSymbol: SymbolBase | null = null;

        while (this.symbol !== null && (
            this.symbol.symbolCode === SymbolsCodes.star ||
            this.symbol.symbolCode === SymbolsCodes.slash
        )) {

            operationSymbol = this.symbol;
            this.nextSym();

            let secondTerm: TreeNodeBase = this.scanMultiplier();

            switch (operationSymbol.symbolCode) {
                case SymbolsCodes.star:
                    multiplier = new Multiplication(operationSymbol, multiplier, secondTerm);
                    break;
                case SymbolsCodes.slash:
                    multiplier = new Division(operationSymbol, multiplier, secondTerm);
                    break;
            }
        }


        return multiplier;
    }

    // Унарный минус (в том числе и множественный)

    MultipleUnaryMinus(){
       let unary_minus: SymbolBase;
         
       
           unary_minus =  this.symbol; 
            
           this.nextSym();

            
           if ((this.symbol !== null)&&(this.symbol.stringValue ==  SymbolsCodes.minus)){

            
            return  new UnaryMinus (unary_minus, this.MultipleUnaryMinus() );
            
           }
           else if ((this.symbol !== null)&&(this.symbol.stringValue == "int"))  {
            
              return  new UnaryMinus (unary_minus, this. WritingNumberVariables());
             
           } else if ((this.symbol !== null)&& (this.symbol.stringValue == SymbolsCodes.leftParenthesis)){
              return  new UnaryMinus (unary_minus, this.scanMultiplier());
           } else {
               this.accept(SymbolsCodes.integerConst);
           }
               
          
          
        }  

    WritingNumberVariables  () {
        let char: SymbolBase | null = this.symbol;
        
       
         if (this.symbol.stringValue == SymbolsCodes.integerConst){
          
             this.accept(this.symbol.symbolCode); 
            
             return new NumberConstant(char);  
        
        } else{

          
            this.accept(this.symbol.symbolCode); 
            return new Variables(char);
        }
        
   }

   
    parenthesesExpression(){
     let  multiplier: TreeNodeBase;

           this.nextSym();

           multiplier = new ParenthesesExpression (null, this.scanExpression());
          
           this.accept(SymbolsCodes.rightParenthesis); 
         
                 
   
           return  multiplier;

    }


    /**
     *  Разбор "множителя"
     */
    scanMultiplier(): NumberConstant {
              
       
       
       if ((this.symbol !== null)&&(this.symbol.stringValue ==  SymbolsCodes.minus) ) {

           return this.MultipleUnaryMinus();
             
       } else if ((this.symbol !== null)&&(this.symbol.stringValue ==  SymbolsCodes.leftParenthesis) ) {
        
           
             return  this.parenthesesExpression();
         
              
      }    else { 

        return this.WritingNumberVariables();
       }

       

        
    }
};