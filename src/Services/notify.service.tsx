interface NotifyOptions {
    duration: number;
    position: string;
}

interface Notify{
    message: string;
    type: string;
    options: NotifyOptions;
}

export class NotifyService {

    private static errorOptions = {
        duration: 2000,
        position: 'top-right'
    }

    private static normalOptions = {
        duration: 2000,
        position: 'top-right'
    }

    static send(message: string, type: string, params: any = {}) {
        const broadCastChannel = new BroadcastChannel('toast');

        switch(type) {
            case 'error':
               const notify : Notify = {
                     message,
                     type,
                     options: this.errorOptions
                }
                broadCastChannel.postMessage(notify);
                break;
            case 'chat':
                const notifyNormal : Notify = {
                    message: params,
                    type,
                    options: this.normalOptions
                }
                broadCastChannel.postMessage(notifyNormal);
                break;
        }

        broadCastChannel.close();
    }

}