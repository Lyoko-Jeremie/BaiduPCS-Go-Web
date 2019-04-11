import child_process, {ChildProcessWithoutNullStreams} from "child_process"
import {Subject} from "rxjs";

export class CallProcess {

    // public stdin: Subject<string> = new Subject();
    public stdout: Subject<string> = new Subject();
    public stderr: Subject<string> = new Subject();
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
            ['help'],
        );

        this.childProcess.stdout.setEncoding('utf8');
        this.childProcess.stdout.on('data', data => {
            console.log(data);
            this.stdout.next(data);
        });
        this.childProcess.stderr.on('data', data => {
            console.log(data);
            this.stderr.next(data);
        });
        // this.childProcess.stdin.write('\n', 'utf8', error => {
        //     console.log(error);
        // });
        // this.stdin.subscribe(value => {
        //     this.childProcess.stdin.write(value, 'utf8');
        // });
        this.childProcess.on("exit", (code, signal) => {
            this.stdout.complete();
            this.stderr.complete();
        });
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



