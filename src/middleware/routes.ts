import { Request, Response, NextFunction } from "express";

export const listRoutes = (req: Request, res: Response, next: NextFunction) => {
  const routes: { method: string; path: string }[] = [];
  const protocol = req.protocol;
  const host = req.get("host");
  const baseUrl = "/api";

  req.app._router.stack.forEach((middleware: any) => {
    if (middleware.route) {
      // Routes registered directly on the app
      const { path } = middleware.route;
      const method = Object.keys(middleware.route.methods)[0].toUpperCase();
      routes.push({ method, path: `${protocol}://${host}${baseUrl}${path}` });
    } else if (middleware.name === "router") {
      // Router middleware
      middleware.handle.stack.forEach((handler: any) => {
        const route = handler.route;
        if (route) {
          const method = Object.keys(route.methods)[0].toUpperCase();
          routes.push({
            method,
            path: `${protocol}://${host}${route.path}`,
          });
        }
      });
    }
  });

  let html = "<h1>API Routes</h1><ul>";
  routes.forEach((route) => {
    html += `<li>${route.method} <a href="${route.path}">${route.path}</a></li>`;
  });
  html += "</ul>";

  res.send(html);
};
