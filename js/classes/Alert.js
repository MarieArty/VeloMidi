export class Alert {

    #dialog = null;

    constructor(message) {
        
        $('body').append(
            '<div id="alert" class="modal" tabindex="-1" role="dialog">'+
                '<div class="modal-dialog" role="document">'+
                    '<div class="modal-content">'+
                        '<div class="modal-header">'+
                        '<h5 class="modal-title">Erreur</h5>'+
                        '<button type="button" class="close" aria-label="Close">'+
                            '<span aria-hidden="true">&times;</span>'+
                        '</button>'+
                        '</div>'+
                        '<div class="modal-body">'+
                            '<p>'+message+'</p>'+
                        '</div>'+
                        '<div class="modal-footer">'+
                            '<button type="button" id="close-alert" class="btn btn-secondary">OK</button>'+
                        '</div>'+
                    '</div>'+
                '</div>'+
            '</div>'
        );

        this.#dialog = $("#alert");
        this.#dialog.show();

        this.#dialog.find('.close').click(() => this.close());
        this.#dialog.find('#close-alert').click(() => this.close());
    }

    close() {
        this.#dialog.remove();
        this.#dialog = null;
    }
}
