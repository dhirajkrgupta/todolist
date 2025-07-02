import  { useEffect, useRef } from 'react'
import './../index.css'
import { Effect } from './effect';
import { createPortal } from 'react-dom';

const Canvas = () => {
    const canvasRef=useRef(null);

    useEffect(()=>{
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const effect = new Effect(canvas,ctx);
        

        function animate() {
        requestAnimationFrame(animate);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        effect.handleParticles();
        }
        animate();

        return () => {
        cancelAnimationFrame(animate);
        effect.destroy(); 
  };

    },[])

  return (
    createPortal(<canvas ref={canvasRef} id='canvas1' className='bg-[linear-gradient(135deg,#2c2a4a,#3b3868)] '></canvas>,document.body)
  )
}

export default Canvas
