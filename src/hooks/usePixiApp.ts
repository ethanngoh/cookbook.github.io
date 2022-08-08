import { useEffect } from "react";
import { Application } from "pixi.js";

export function usePixiApp(app: Application) {
  useEffect(() => {
    document.body.appendChild(app.view);
  });
}
