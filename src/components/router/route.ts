export class Route {

  navPath: string;

  constructor(path: string) {
    this.navPath = path;
  }

  createRoute() {
    window.history.pushState({}, this.navPath, window.location.origin + this.navPath);
  }
}