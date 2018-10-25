/**
 * Created by Vladyslav Lyfar on 11.10.2018.
 */
({
    getCardFiles: function(component) {
        let kanbanCardFiles = component.get("v.kanbanCard").KanbanFiles__r || [];
        component.set("v.kanbanCardFiles", kanbanCardFiles);
    },
    showDescriptionForm: function(component) {
        let isDescriptionFormOpened = component.get("v.isDescriptionFormOpened");
        isDescriptionFormOpened = !isDescriptionFormOpened;
        component.set("v.isDescriptionFormOpened", isDescriptionFormOpened);
    },
    showDateTimeForm: function(component) {
        let isDateTimeFormOpened = component.get("v.isDateTimeFormOpened");
        isDateTimeFormOpened = !isDateTimeFormOpened;
        component.set("v.isDateTimeFormOpened", isDateTimeFormOpened);
    },
    showAttachFileForm: function(component) {
        let isAttachFileFormOpened = component.get("v.isAttachFileFormOpened");
        isAttachFileFormOpened = !isAttachFileFormOpened;
        component.set("v.isAttachFileFormOpened", isAttachFileFormOpened);
    },
    selectFileExchangeService: function(component, event) {
        const fileService = component.find("selectFileService").get("v.value");
        if(fileService) {
            component.set("v.isFileInputFieldDisabled", false);
        }
        switch(fileService) {
            case "Dropbox":
                this.uploadFileToRemoteStorageMethod = this.uploadFilesToDropbox;
                break;
        }
    },
    uploadFileToRemoteStorageMethod: function(component,event) {

    },
    deleteAttachment: function(component, event) {
        console.log("deleted");
    },
    uploadFilesToDropbox: function(component, event) {
        let file = event.getSource().get("v.files")[0];
        let fileReader = new FileReader();
        let self = this;
        fileReader.readAsDataURL(file);
        fileReader.onload = function() {
            let encodedFile = fileReader.result;
            self.saveAttachment(component, encodedFile);
        };
        fileReader.onerror = function(error) {
            console.log('Error: ', error);
        };
    },
    saveAttachment: function(component, encodedFile) {
        let action = component.get("c.saveKanbanCardFileToDropbox");
        action.setParams({
            "base64File": encodedFile
        });
        action.setCallback(this, (response) => {
            let state = response.getState();
            if(state === "SUCCESS") {
                console.log(response.getReturnValue());
            } else {
                console.log(state);
            }
        });

        $A.enqueueAction(action);
    },
    saveKanbanCard: function(component) {
        let action = component.get("c.updateKanbanCard");
        action.setParams({
            "kanbanCard": component.get("v.kanbanCard")
        });
        action.setCallback(this, (response) => {
            let state = response.getState();
            if(state === "SUCCESS") {
                component.set("v.kanbanCard", response.getReturnValue());
            }
        });

        $A.enqueueAction(action);
    },
    handleUpdateKanbanCardColumnEvent: function(component, event) {
        let action = component.get("c.updateKanbanCard");
        let newKanbanColumnId = event.getParam("NewKanbanCardColumnId");
        let kanbanCard = component.get("v.kanbanCard");
        kanbanCard.KanbanColumn__c = newKanbanColumnId;
        action.setParams({
            "kanbanCard": kanbanCard
        });
        action.setCallback(this, (response) => {
            let state = response.getState();
            if(state === "SUCCESS") {
                component.set("v.kanbanCard", response.getReturnValue());
            }
        });

        $A.enqueueAction(action);
    },
    togglePopover: function(component) {
        let customPopover = component.find("customPopover");
        $A.util.toggleClass(customPopover, "is-show");
    }
})