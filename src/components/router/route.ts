export class Route {

  path: string;

  constructor(path: string) {
    this.path = path;
  }

  createRoute() {
    window.history.pushState({}, this.path, window.location.origin + this.path);
  }
}