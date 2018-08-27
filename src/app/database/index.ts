import { Observable, BehaviorSubject } from "rxjs";
import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { tap } from "rxjs/operators";

export class Resource {
    id: string;
}

@Injectable()
export class Database<T extends Resource> {
    store: Observable<T[]>
    private _store: BehaviorSubject<T[]>;
    private baseUrl: string;
    private dataStore: {
        store: T[]
    };

    constructor(private http: HttpClient) {

        this.dataStore = { store: [] };
        this._store = <BehaviorSubject<T[]>>new BehaviorSubject([]);
        this.store = this._store.asObservable();
    }

    loadAll(db: string = 'navbar'): Observable<T[]> {
        this.http.get<T[]>(`api/${db}`)
            .pipe(tap(db => console.log(db)))
            .subscribe(data => {
                this.dataStore.store = data;
                this._store.next(Object.assign({}, this.dataStore).store);
            }, error => console.log('Could not load store.'));
        return this.store;
    }

    load(id: number | string) {
        this.http.get(`${this.baseUrl}/${id}`).subscribe((data: T) => {
            let notFound = true;
            this.dataStore.store.forEach((item: T, index: number) => {
                if (item.id === data.id) {
                    this.dataStore.store[index] = data;
                    notFound = false;
                }
            });

            if (notFound) {
                this.dataStore.store.push(data);
            }
            this._store.next(Object.assign({}, this.dataStore).store);
        }, error => console.log(`Could not load store.`));
        return this.store;
    }

    create(db: string = 'navbar', data: T[]) {
        this.http.post(`api/${db}`, JSON.stringify(data)).subscribe((data: T) => {
            this.dataStore.store.push(data);
            this._store.next(Object.assign({}, this.dataStore).store);
        }, error => console.log(`Could not create store.`));
        return this.store;
    }

    update(db: string = 'navbar', data: T) {
        this.http.put(`api/${db}/${data.id}`, JSON.stringify(data))
            .subscribe((data: T) => {
                this.dataStore.store.forEach((t, i) => {
                    if (t.id === data.id) { this.dataStore.store[i] = data; }
                });

                this._store.next(Object.assign({}, this.dataStore).store);
            }, error => console.log(`Could not update store.`));
        return this.store;
    }

    remove(db: string = 'navbar', storeId: number | string) {
        this.http.delete(`api/${db}/${storeId}`).subscribe(response => {
            this.dataStore.store.forEach((t, i) => {
                if (t.id === storeId) { this.dataStore.store.splice(i, 1); }
            });

            this._store.next(Object.assign({}, this.dataStore).store);
        }, error => console.log(`Could not delete store.`));
        return this.store;
    }
}
