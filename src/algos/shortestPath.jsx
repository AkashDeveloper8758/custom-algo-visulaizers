import { Button } from '@mui/material';
import {useState} from 'react'
import Sketch from 'react-p5';
import { BlockItem } from '../components/block';


export default function ShortestPath() {
    let [sx,sy] = [null,null]
let [ex,ey] = [null,null]
    const setup = (p5, canvasParentRef) => {
        // use parent to render the canvas in this ref
        // (without that p5 will render the canvas outside of your component)
        p5.createCanvas(500, 500).parent(canvasParentRef);
      };
    
      const draw = (p5) => {
        p5.background(100);
      
        if(p5.mouseIsPressed){
            console.log('on mouse pressed')
            if(sx == null){
              sx = p5.mouseX
              sy = p5.mouseY
              p5.ellipse(sx,sy,20,20)
            }else{
              ex = p5.mouseX
              ey = p5.mouseY
              p5.ellipse(ex,ey,20,20)
              p5.fill(10)
            }
          }
          if(sx != null && ex != null){
            sx += sx > ex ? -2 : 2
            sy += sy > ey ? -2 : 2
            p5.ellipse(sx,sy,20,20)
            
          }
      };

  return (
    <div className="p-8 flex-col items-center ">
   
    <Sketch setup={setup} draw={draw} />
  </div>
  )
}
