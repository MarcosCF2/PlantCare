import { inject, Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { Planta } from "../models/planta.model";
import { HttpClient } from "@angular/common/http";

type FirebasePlanta = Omit<Planta, "id"> & { id?: unknown };

@Injectable({ providedIn: "root" })
export class PlantasService {
  private http = inject(HttpClient);
  private apiUrl = "https://foodfest-111a6-default-rtdb.firebaseio.com/plantas";
  private sufix = ".json";

  getAll(): Observable<Planta[]> {
    return this.http
      .get<Record<string, FirebasePlanta> | null>(this.apiUrl + this.sufix)
      .pipe(
        map((response) => {
          if (!response) {
            return [];
          }
          return Object.entries(response).map(([id, planta]) => {
            const { id: _ignoredId, ...plantaData } = planta;
            return { id, ...plantaData };
          });
        }),
      );
  }

  getById(id: string): Observable<Planta> {
    return this.http
      .get<FirebasePlanta | null>(`${this.apiUrl}/${id}${this.sufix}`)
      .pipe(
        map((response) => {
          if (!response) {
            throw new Error("Planta não encontrada!");
          }
          const { id: _ignoredId, ...plantaData } = response;
          return { id, ...plantaData };
        }),
      );
  }

  create(planta: Omit<Planta, "id">): Observable<Planta> {
    return this.http
      .post<{ name: string }>(this.apiUrl + this.sufix, planta)
      .pipe(
        map((response) => ({
          id: response.name,
          ...planta,
        })),
      );
  }

  update(id: string, planta: Omit<Planta, "id">): Observable<Planta> {
    return this.http
      .put<Omit<Planta, "id">>(`${this.apiUrl}/${id}${this.sufix}`, planta)
      .pipe(
        map((response) => ({
          ...response,
          id,
        })),
      );
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}${this.sufix}`);
  }
}

