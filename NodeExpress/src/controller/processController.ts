import child_process, {ChildProcessWithoutNullStreams} from "child_process"
import {Subject, BehaviorSubject} from "rxjs";

export enum CallProcessState {
    ok, error, complete
}

export class CallProcess {

    // public stdin: Subject<string> = new Subject();
    public stdout: Subject<string> = new Subject();
    public stderr: Subject<string> = new Subject();
    public state: BehaviorSubject<CallProcessState> = new BehaviorSubject<CallProcessState>(CallProcessState.ok);
    private childProcess: ChildProcessWithoutNullStreams;

    public write(s: string) {
        return new Promise((resolve, reject) => {
            this.childProcess.stdin.write(s, 'utf8', error => {
                if (error) {
                    reject(error);
                } else {
                    resolve();
                }
            });
        });
    }

    public stop() {
        this.childProcess.kill();
    }

    constructor() {
        this.childProcess = child_process.spawn(
            './exec/BaiduPCS-Go-v3.5.6-windows-x64/BaiduPCS-Go.exe',
            ['ll', '--desc', '--time'],
            // {maxBuffer: ''}
        );

        this.childProcess.stdout.setEncoding('utf8');
        this.childProcess.stdout.on('data', data => {
            // console.log(data);
            this.stdout.next(data);
        });
        this.childProcess.stderr.on('data', data => {
            // console.log(data);
            this.stderr.next(data);
        });
        // this.childProcess.stdin.write('\n', 'utf8', error => {
        //     console.log(error);
        // });
        // this.stdin.subscribe(value => {
        //     this.childProcess.stdin.write(value, 'utf8');
        // });
        this.childProcess.on("error", err => {
            console.log('========= error');
            this.state.next(CallProcessState.error);
        });
        this.childProcess.on("disconnect", () => {
            console.log('========= disconnect');
            this.state.next(CallProcessState.complete);
        });
        this.childProcess.on("close", (code, signal) => {
            console.log('========= close');
            this.state.next(CallProcessState.complete);
        });
        this.childProcess.on("exit", (code, signal) => {
            console.log('========= exit');
            this.state.next(CallProcessState.complete);
        });
    }

    public destroy() {
        this.stop();
        this.stdout.complete();
        this.stderr.complete();
        this.state.complete();
    }


}

export function call() {


    const cp = child_process.spawn('../exec/BaiduPCS-Go-v3.5.6-windows-x64/BaiduPCS-Go.exe', {
        argv0: '',
    });

    cp.stdout.on('data', data => {
        console.log(data);
    });
    cp.stderr.on('data', data => {
        console.log(data);
    });
    cp.stdin.write('\n', 'utf-8', error => {
        console.log(error);
    });


}



