/**
 * Created by Vladyslav Lyfar on 05.10.2018.
 */
({
    handleCreateNewColumnEvent: function(component, event, helper) {
        helper.handleCreateNewColumnEvent(component, event);
    },
    handleOnDeleteKanbanColumnEvent: function(component, event, helper) {
        helper.removeDeletedColumnFromList(component, event);
    },
    handleOnCopyKanbanColumnEvent: function(component, event, helper) {
        helper.insertNewColumnToList(component, event);
    },
    handleOnMoveKanbanColumnEvent: function(component, event, helper) {
        helper.moveColumnToOtherBoard(component, event);
    }
})