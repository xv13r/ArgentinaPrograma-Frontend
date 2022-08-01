import { Injectable } from "@angular/core";
import { Router } from '@angular/router';
import { Session } from "../models/session.model";

const KEY = 'app-jwt';

@Injectable()
export class SessionService {

  private localStorageService;
  private currentSession: Session | null;

  constructor(private router: Router) {
    this.localStorageService = localStorage;
    this.currentSession = this.loadSessionData();
  }

  setCurrentSession(session: Session): void {
    this.currentSession = session;
    this.localStorageService.setItem(KEY, JSON.stringify(session));
  }

  loadSessionData(): Session | null {
    var session = this.localStorageService.getItem(KEY);
    if (session){
      return JSON.parse(session) as Session;
    }
    else{
      return null;
    }
  }

  getCurrentSession(): Session | null{
    return this.currentSession;
  }

  removeCurrentSession(): void {
    this.localStorageService.removeItem(KEY);
    this.currentSession = null;
  }

  getCurrentToken(): String | null{
    var session = this.getCurrentSession();
    if (session && session.accessToken){
      return session.accessToken;
    }
    else{
      return null;
    }
  };
}