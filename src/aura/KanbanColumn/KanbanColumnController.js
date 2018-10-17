/**
 * Created by Vladyslav Lyfar on 08.10.2018.
 */
({
    doInit: function(component, event, helper) {
        helper.doInit(component);
    },
    renameKanbanColumn: function(component, event, helper) {
        helper.saveKanbanColumn(component);
    },
    handleUpdateKanbanColumnBoardEvent: function(component, event, helper) {
        helper.handleUpdateKanbanColumnBoardEvent(component, event);
    },
    showRenameForm: function(component, event, helper) {
        helper.showRenameForm(component);
    },
    selectAction: function(component, event, helper) {
        helper.selectAction(component, event);
    },
    handleCopyKanbanColumnEvent: function(component, event, helper) {
        helper.copyKanbanColumn(component, event);
    },
    handleMoveAllKanbanCardsEvent: function(component, event, helper) {
        helper.moveAllKanbanCardsToOtherColumn(component, event);
    }
})