import React, { useEffect, useRef } from "react";

export const CanvasIllustrations = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = 400;

    const papers = [];
    const numPapers = 12;

    const drawStar = (ctx, x, y, r, alpha) => {
      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.fillStyle = "rgba(100,100,100,0.8)"; // subtle gray
      ctx.beginPath();

      for (let i = 0; i < 5; i++) {
        const radius = i === 0 || i === 2 ? r * 1.2 : r; // top/bottom larger
        const angle = (i * 2 * Math.PI) / 5 - Math.PI / 2;
        const sx = x + radius * Math.cos(angle);
        const sy = y + radius * Math.sin(angle);
        ctx.lineTo(sx, sy);

        const nextAngle = angle + Math.PI / 5;
        ctx.lineTo(
          x + (radius / 2) * Math.cos(nextAngle),
          y + (radius / 2) * Math.sin(nextAngle)
        );
      }

      ctx.closePath();
      ctx.fill();
      ctx.restore();
    };

    const drawNote = (ctx, paper) => {
      ctx.globalAlpha = 1;
      const { x, y, width, height } = paper;

      // Paper background
      ctx.fillStyle = "#fff";
      ctx.strokeStyle = "#c7d2fe"; // light indigo border
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.roundRect(x, y, width, height, 4);
      ctx.fill();
      ctx.stroke();

      // Notebook lines
      ctx.strokeStyle = "rgba(200,200,200,0.6)";
      ctx.lineWidth = 0.8;
      const lineSpacing = 6;
      for (let i = lineSpacing; i < height - 4; i += lineSpacing) {
        ctx.beginPath();
        ctx.moveTo(x + 3, y + i);
        ctx.lineTo(x + width - 3, y + i);
        ctx.stroke();
      }

      // Tiny text
      ctx.fillStyle = "rgba(0,0,0,0.2)";
      ctx.font = "6px Arial";
      ctx.fillText("AI Resume", x + 3, y + 10);
      ctx.fillText("Experience", x + 3, y + 18);
      ctx.fillText("Skills", x + 3, y + 26);

      // Star top-right
      const star = paper.star;
      star.alpha += star.delta;
      if (star.alpha > 1 || star.alpha < 0.3) star.delta *= -1;

      drawStar(ctx, x + width - 6, y + 6, 3.5, star.alpha);
    };

    // Initialize papers along edges/corners
    for (let i = 0; i < numPapers; i++) {
      const edge = Math.floor(Math.random() * 4);
      let x, y;

      switch (edge) {
        case 0: // top
          x = 20 + Math.random() * (canvas.width - 60);
          y = 10 + Math.random() * 30;
          break;
        case 1: // right
          x = canvas.width - 50 - Math.random() * 30;
          y = 50 + Math.random() * (canvas.height - 100);
          break;
        case 2: // bottom
          x = 20 + Math.random() * (canvas.width - 60);
          y = canvas.height - 60 - Math.random() * 30;
          break;
        case 3: // left
          x = 10 + Math.random() * 30;
          y = 50 + Math.random() * (canvas.height - 100);
          break;
      }

      papers.push({
        x,
        y,
        width: 40,
        height: 50,
        star: {
          alpha: 0.5 + Math.random() * 0.5,
          delta: 0.01 + Math.random() * 0.01,
        },
      });
    }

    let frame;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      papers.forEach((paper) => drawNote(ctx, paper));
      frame = requestAnimationFrame(draw);
    };

    draw();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = 400;
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas ref={canvasRef} className="w-full h-full pointer-events-none" />
  );
};
