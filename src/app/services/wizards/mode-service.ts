import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModeService {
  private mode: string = "add";

  constructor() { }

  setAddMode(name: string): boolean {
    switch (name) {
      case "add":
      case "edit":
        this.mode = name;
        return true;
      default:
        return false;
    }
  }

  getMode(): string {
    return this.mode;
  }
}
