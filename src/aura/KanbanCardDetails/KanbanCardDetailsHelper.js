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

    uploadFilesToDropbox: function(component, event) {
        let file = event.getSource().get("v.files")[0];
        let fileName = file.name.length < 80 ? file.name : file.name.substring(0, 79);
        let fileReader = new FileReader();
        let self = this;

        fileReader.readAsDataURL(file);
        fileReader.onload = function() {
            let encodedFile = fileReader.result;
            let base64 = 'base64,';
            let start = encodedFile.indexOf(base64) + base64.length;
            encodedFile = encodedFile.substring(start);

            let action = component.get("c.checkAuthorization");
            self.executeAction(component, action).then(
                $A.getCallback((response) => {
                    let isAuth = response;
                    if(!isAuth) {
                        self.goToAuthorizationPage();
                    } else {
                        let action = component.get("c.saveKanbanCardFileToDropbox");
                        action.setParams({
                            "kanbanCardId": component.get("v.kanbanCard").Id,
                            "fileName": fileName,
                            "base64File": encodedFile
                        });
                        return self.executeAction(component, action);
                    }
                })
            )
                .then(
                    $A.getCallback((response) => {
                        console.log(response);
                        if(response !== null) {
                            let kanbanCardFiles = component.get("v.kanbanCardFiles");
                            kanbanCardFiles.push(response);
                            component.set("v.kanbanCardFiles", kanbanCardFiles);
                            self.showSuccessToast("File has been added successfully!");
                        }
                    })
                )
                .catch(
                    $A.getCallback((error) => {
                        alert('An error occurred : ' + error.message);
                    })
                )
        };
        fileReader.onerror = function(error) {
            console.log('Error: ', error);
        };
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

    deleteKanbanFileFromList: function(component, event) {
        let kanbanFiles = component.get("v.kanbanCardFiles");
        let kanbanFileToDelete = event.getParam("KanbanFileToDelete");
        let indexToDelete = kanbanFiles.indexOf(kanbanFileToDelete);
        kanbanFiles.splice(indexToDelete, 1);
        component.set("v.kanbanCardFiles", kanbanFiles);
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
    },

    showSuccessToast: function(message) {
        const toastEvent = $A.get("e.force:showToast");
        toastEvent.setParams({
            "title": "Success!",
            "type": "success",
            "message": message
        });
        toastEvent.fire();
    },

    goToAuthorizationPage: function() {
        location.assign("https://www.dropbox.com/oauth2/authorize?client_id=fzjme6a3fotawvs&response_type=code&redirect_uri=https://cunning-goat-l5flx3-dev-ed.lightning.force.com/c/DropboxAPICallback.app");
    },

    executeAction: function(component, action, callback) {
        return new Promise((resolve, reject) => {
            action.setCallback(this, (response) => {
                let state = response.getState();
                if(state === "SUCCESS") {
                    let result = response.getReturnValue();
                    resolve(result);
                } else if(state === "ERROR") {
                    let errors = response.getError();
                    if(errors) {
                        if(errors[0] && errors[0].message) {
                            reject(Error("Error message: " + errors[0].message));
                        }
                    } else{
                        reject(Error("Unknown error"));
                    }
                }
            });
            $A.enqueueAction(action);
        });
    }
})