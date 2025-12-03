
import fs from 'fs';

export class FileIO {
    charPointer: number;
    text: string;

    constructor(fileName) {
        this.charPointer = 0;
        this.text = fs.readFileSync(fileName, 'utf-8');
    }

    nextCh() {
        return this.charPointer < this.text.length ?
            this.text[this.charPointer++]:
            null;
    }

    lastCh(){
         let myChar = [];       
  
         let char=" "; 
         let i = 1;
         
        while (((char==" ")||(char=="="))&&(i<this.charPointer)){
           i++; 
           char=this.text[this.charPointer-i];
         } 

         myChar[1] =char; 
         char = " ";

         while ((char==" ")&&(i<this.charPointer)){
           i++; 
           char=this.text[this.charPointer-i];
         }
         myChar[2] =char; 


        return myChar; 
   }
  
}