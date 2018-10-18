/**
 * Created by Vladyslav Lyfar on 05.10.2018.
 */
({
    handleCreateNewCardEvent: function(component, event, helper) {
        helper.handleCreateNewCardEvent(component, event);
    },
    handleOnDeleteKanbanCardEvent: function(component, event, helper) {
        helper.removeDeletedCardFromList(component, event);
    },
    handleOnCopyKanbanCardEvent: function(component, event, helper) {
        console.log(event.getParam("CopiedKanbanCard"));
    },
    handleOnMoveKanbanCardEvent: function(component, event, helper) {
        helper.removeCardFromCardList(component, event);
    }
})