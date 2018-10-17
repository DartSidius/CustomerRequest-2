/**
 * Created by Vladyslav Lyfar on 05.10.2018.
 */
({
    handleCreateNewCardEvent: function(component, event, helper) {
        helper.handleCreateNewCardEvent(component, event);
    },
    handleOnDeleteKanbanCardEvent: function(component, event, helper) {
        helper.removeDeletedCardFromList(component, event);
    }
})