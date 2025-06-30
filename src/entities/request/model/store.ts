import { makeAutoObservable, runInAction } from 'mobx';

import { CATEGORIES, type Request } from './../../../shared/types/request';

const STORAGE_KEY = 'requests';

class RequestStore {
  id: string | null = null;
  title: string = '';
  description: string = '';
  category: string = CATEGORIES[0];
  error: string = '';
  requests: Request[] = [];
  isEditing: boolean = false;

  constructor() {
    makeAutoObservable(this);
    this.loadFromLocalStorage();
  }

  setTitle(title: string) {
    this.title = title;
  }

  setDescription(desc: string) {
    this.description = desc;
  }

  setCategory(category: string) {
    this.category = category;
  }

  setError(error: string) {
    this.error = error;
  }

  reset() {
    this.title = '';
    this.description = '';
    this.category = CATEGORIES[0];
    this.error = '';
  }

  get isValid() {
    return this.title.trim() !== '' && this.description.trim() !== '';
  }

  fillCurrentRequest(req: Request) {
    this.title = req.title;
    this.description = req.description;
    this.category = req.category;
  }

  setIsEditing(isEditing: boolean) {
    this.isEditing = isEditing;
  }

  addRequest() {
    const newRequest: Request = {
      title: this.title.trim(),
      description: this.description.trim(),
      category: this.category,
      id: String(Math.random()),
      createdAt: new Date().toISOString(),
    };
    this.requests.push(newRequest);
    this.saveToLocalStorage();
  }

  removeRequest(id: string) {
    this.requests = this.requests.filter((r) => r.id !== id);
    this.saveToLocalStorage();
  }

  updateRequest(id: string) {
    const req = this.requests.find((r) => r.id === id);
    if (req) {
      Object.assign(req, {
        title: this.title.trim(),
        description: this.description.trim(),
        category: this.category,
      });
      this.saveToLocalStorage();
    }
  }

  private saveToLocalStorage() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.requests));
    } catch (e) {
      console.error('Ошибка при сохранении в localStorage:', e);
    }
  }

  getRequestById(id: string) {
    return this.requests.find((r) => r.id === id);
  }

  private loadFromLocalStorage() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed: Request[] = JSON.parse(stored);
        runInAction(() => {
          this.requests = parsed;
        });
      }
    } catch (e) {
      console.error('Ошибка при загрузке из localStorage:', e);
    }
  }
}

export const requestStore = new RequestStore();
