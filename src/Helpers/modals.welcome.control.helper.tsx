export class ModalWelcomeControlHelper {
    private modalWelcomeCallBack : any = null;
    private modalOnBoardingCallBack : any = null;

    setWellcomeCallBack(callback: any) {
        this.modalWelcomeCallBack = callback;
    }

    setOnBoardingCallBack(callback: any) {
        this.modalOnBoardingCallBack = callback;
    }

    private controlModal(show: boolean, modal: string) {

        switch(modal) {
            case 'welcome':
                if(this.modalWelcomeCallBack){
                    this.modalWelcomeCallBack(show);
                }
                break;
            case 'onboarding':
                if(this.modalOnBoardingCallBack){
                    this.modalOnBoardingCallBack(show);
                }
                break;
            case 'select-user':
                break;
        }

    }

    showModal(modal: string){
        this.controlModal(true, modal);
    }

    hideModal(modal: string){
        this.controlModal(false, modal);
    }
}