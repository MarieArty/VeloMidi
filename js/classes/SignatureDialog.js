import { Signature } from './Signature.js';
import { Alert } from './Alert.js';

export class SignatureDialog {

    #submitAction;
    
    #dialog = null;
    #signature = null;

    constructor(submitAction) {
        this.#submitAction  = submitAction;
        
        $('body').append(
            '<div id="signature-dialog" class="modal" tabindex="-1" role="dialog">'+
                '<div class="modal-dialog" role="document">'+
                    '<div class="modal-content">'+
                        '<div class="modal-header">'+
                        '<h5 class="modal-title">Signature</h5>'+
                        '<button type="button" class="close" aria-label="Close">'+
                            '<span aria-hidden="true">&times;</span>'+
                        '</button>'+
                        '</div>'+
                        '<div class="modal-body">'+
                            '<canvas id="signature"></canvas>'+
                        '</div>'+
                        '<div class="modal-footer">'+
                            '<button type="button" id="dismiss-signature" class="btn btn-secondary">Fermer</button>'+
                            '<button type="button" id="save-signature" class="btn btn-primary">Valider</button>'+
                        '</div>'+
                    '</div>'+
                '</div>'+
            '</div>'
        );

        this.#dialog = $("#signature-dialog");
        this.#dialog.show();

        this.#dialog.find('.close').click(() => this.close());
        this.#dialog.find('#dismiss-signature').click(() => this.close());
        this.#dialog.find('#save-signature').click(() => this.submit());
        
        this.#signature = new Signature($("#signature"));
    }

    submit() {
        if (!(this.#signature.isSigned())) {
            new Alert('Vous devez signer !');
            return;
        }

        this.#submitAction();

        this.close();
    }

    close() {
        this.#dialog.remove();
        this.#dialog = null;
    }
}
