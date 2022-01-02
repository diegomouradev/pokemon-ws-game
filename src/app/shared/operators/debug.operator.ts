import { Observable } from "rxjs";
import { tap } from "rxjs/operators";

export enum RxJsLoggingLevel {
    TRACE,
    DEBUG,
    INFO,
    ERROR
}

let rxJsLoggingLevel = RxJsLoggingLevel.INFO;
export const setRxJsLoggingLevel = (level: RxJsLoggingLevel) => {
    rxJsLoggingLevel = level;
}

export const debug = (level: number, message: string) => 
(source: Observable<any>) => source.pipe(
    tap( val => {
        if(level >= rxJsLoggingLevel) {
            console.log( `${message}:`,val);
        }
    })
)