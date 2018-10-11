/**
 * Created by Vladyslav Lyfar on 05.10.2018.
 */
({
    showKanbanCardDetails: function(component, event, helper) {
        helper.showKanbanCardDetails(component);
    },
    handleCreateNewCardEvent: function(component, event, helper) {
        helper.handleCreateNewCardEvent(component, event);
    },
    selectAction: function(component, event, helper) {
        helper.selectAction(component, event);
    },
    handleUpdateKanbanCardColumnEvent: function(component, event, helper) {
        helper.handleUpdateKanbanCardColumnEvent(component, event);
    },
    handleCopyKanbanCardEvent: function(component, event, helper) {
        helper.handleCopyKanbanCardEvent(component, event);
    }
})