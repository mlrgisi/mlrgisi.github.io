export enum EngineStatus {
    Init = 1,
    Ready = 2,
    Busy = 3,
    Error = 4,
}

const ENGINE_PATH = '/texparser/swiftlatexpdftex.js';

export class CompileResult {
    pdf?: Uint8Array;
    status: number;
    log: string;

    constructor() {
        this.pdf = undefined;
        this.status = -254;
        this.log = 'No log';
    }
}

export class PdfTeXEngine {
    latexWorker?: Worker;
    latexWorkerStatus: EngineStatus;

    constructor() {
        this.latexWorker = undefined;
        this.latexWorkerStatus = EngineStatus.Init;
    }

    async loadEngine(): Promise<void> {
        if (this.latexWorker !== undefined) {
            throw new Error('Other instance is running, abort()');
        }
        this.latexWorkerStatus = EngineStatus.Init;

        return new Promise<void>((resolve, reject) => {
            this.latexWorker = new Worker(ENGINE_PATH);

            this.latexWorker.onmessage = (ev: MessageEvent) => {
                const data = ev.data;
                const cmd = data['result'];
                if (cmd === 'ok') {
                    this.latexWorkerStatus = EngineStatus.Ready;
                    resolve();
                } else {
                    this.latexWorkerStatus = EngineStatus.Error;
                    reject();
                }
            };
        }).then(() => {
            if (this.latexWorker) {
                this.latexWorker.onmessage = (_) => {};
                this.latexWorker.onerror = (_) => {};
            }
        });
    }

    isReady(): boolean {
        return this.latexWorkerStatus === EngineStatus.Ready;
    }

    checkEngineStatus() {
        if (!this.isReady()) {
            throw Error('Engine is still spinning or not ready yet!');
        }
    }

    async compileLaTeX(): Promise<CompileResult> {
        this.checkEngineStatus();
        this.latexWorkerStatus = EngineStatus.Busy;
        const start_compile_time = performance.now();

        const res = await new Promise<CompileResult>((resolve, _) => {
            if (!this.latexWorker) return;
            
            this.latexWorker.onmessage = (ev: MessageEvent) => {
                const data = ev.data;
                const cmd = data['cmd'];
                if (cmd !== "compile") return;

                const result = data['result'];
                const log = data['log'];
                const status = data['status'];

                this.latexWorkerStatus = EngineStatus.Ready;
                console.log('Engine compilation finish ' + (performance.now() - start_compile_time));

                const nice_report = new CompileResult();
                nice_report.status = status;
                nice_report.log = log;

                if (result === 'ok') {
                    const pdf = new Uint8Array(data['pdf']);
                    nice_report.pdf = pdf;
                }

                resolve(nice_report);
            };

            this.latexWorker.postMessage({ 'cmd': 'compilelatex' });
            console.log('Engine compilation start');
        });

        if (this.latexWorker) {
            this.latexWorker.onmessage = (_) => {};
        }
        return res;
    }

    setEngineMainFile(filename: string) {
        this.checkEngineStatus();
        if (this.latexWorker !== undefined) {
            this.latexWorker.postMessage({ 'cmd': 'setmainfile', 'url': filename });
        }
    }

    writeMemFSFile(filename: string, srccode: Uint8Array | string) {
        this.checkEngineStatus();
        if (this.latexWorker !== undefined) {
            this.latexWorker.postMessage({ 'cmd': 'writefile', 'url': filename, 'src': srccode });
        }
    }

    makeMemFSFolder(folder: string) {
        this.checkEngineStatus();
        if (this.latexWorker !== undefined) {
            if (folder === '' || folder === '/') {
                return;
            }
            this.latexWorker.postMessage({ 'cmd': 'mkdir', 'url': folder });
        }
    }

    flushCache() {
        this.checkEngineStatus();
        if (this.latexWorker !== undefined) {
            this.latexWorker.postMessage({ 'cmd': 'flushcache' });
        }
    }

    setTexliveEndpoint(url: string) {
        if (this.latexWorker !== undefined) {
            this.latexWorker.postMessage({ 'cmd': 'settexliveurl', 'url': url });
            this.latexWorker = undefined;
        }
    }

    closeWorker() {
        if (this.latexWorker !== undefined) {
            this.latexWorker.postMessage({ 'cmd': 'grace' });
            this.latexWorker = undefined;
        }
    }
}
