/**
 * Created by Vladyslav Lyfar on 08.10.2018.
 */
({
    doInit: function(component, event, helper) {
        helper.getCardFiles(component);
    },
    showDescriptionForm: function(component, event, helper) {
        helper.showDescriptionForm(component);
    },
    showDateTimeForm: function(component, event, helper) {
        helper.showDateTimeForm(component);
    },
    showAttachFileForm: function(component, event, helper) {
        helper.showAttachFileForm(component);
    },
    saveKanbanCard: function(component, event, helper) {
        helper.saveKanbanCard(component);
    },
    handleUpdateKanbanCardColumnEvent: function(component, event, helper) {
        helper.handleUpdateKanbanCardColumnEvent(component, event);
    },
    togglePopover: function(component, event, helper) {
        helper.togglePopover(component, event);
    },
    selectFileExchangeService: function(component, event, helper) {
        helper.selectFileExchangeService(component, event);
    },
    uploadFileToRemoteStorageMethod: function(component, event, helper) {
        helper.uploadFileToRemoteStorageMethod(component, event);
    },
    handleOnDeleteKanbanFileEvent: function(component, event, helper) {
        helper.deleteKanbanFileFromList(component, event);
    }
})